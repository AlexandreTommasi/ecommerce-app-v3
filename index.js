const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configuração do banco
const dbConfig = {
    server: process.env.DATABASE_SERVER,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
    options: { encrypt: true, trustServerCertificate: false }
};

let pool;

// Conectar ao banco
async function connectDB() {
    try {
        pool = await sql.connect(dbConfig);
        console.log('✅ Conectado ao Azure SQL Database');
        return true;
    } catch (err) {
        console.error('❌ Erro de conexão:', err.message);
        return false;
    }
}

// Rotas
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/status', async (req, res) => {
    const isConnected = pool && pool.connected;
    res.json({ 
        status: 'online',
        app: 'E-commerce v3',
        pool: 'expandev-pool-3',
        database: isConnected ? 'conectado' : 'desconectado',
        timestamp: new Date()
    });
});

app.get('/api/produtos', async (req, res) => {
    try {
        if (!pool || !pool.connected) {
            await connectDB();
        }
        const result = await pool.request().query('SELECT * FROM produtos ORDER BY nome');
        res.json(result.recordset);
    } catch (err) {
        console.error('Erro:', err);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

app.post('/api/produtos', async (req, res) => {
    try {
        const { nome, preco, estoque, categoria } = req.body;
        if (!pool || !pool.connected) {
            await connectDB();
        }
        const result = await pool.request()
            .input('nome', sql.NVarChar, nome)
            .input('preco', sql.Decimal(10, 2), preco)
            .input('estoque', sql.Int, estoque)
            .input('categoria', sql.NVarChar, categoria)
            .query('INSERT INTO produtos (nome, preco, estoque, categoria) OUTPUT INSERTED.* VALUES (@nome, @preco, @estoque, @categoria)');
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Erro:', err);
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
        console.log(`📦 Pool: expandev-pool-3`);
    });
});