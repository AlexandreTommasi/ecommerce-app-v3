-- Criar tabela de produtos para Pool 3
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='produtos' AND xtype='U')
BEGIN
    CREATE TABLE produtos (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nome NVARCHAR(200) NOT NULL,
        categoria NVARCHAR(100),
        preco DECIMAL(10, 2) NOT NULL,
        estoque INT NOT NULL DEFAULT 0,
        criado_em DATETIME DEFAULT GETDATE(),
        atualizado_em DATETIME DEFAULT GETDATE()
    );
    PRINT 'Tabela produtos criada para Pool 3';
END
GO

-- Criar índices para performance
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_produtos_nome')
    CREATE INDEX idx_produtos_nome ON produtos(nome);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_produtos_categoria')
    CREATE INDEX idx_produtos_categoria ON produtos(categoria);
GO