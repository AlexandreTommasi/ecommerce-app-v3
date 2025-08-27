-- Dados iniciais para Pool 3 E-commerce
IF NOT EXISTS (SELECT * FROM produtos)
BEGIN
    INSERT INTO produtos (nome, categoria, preco, estoque) VALUES 
    ('MacBook Pro M3', 'Informática', 18999.90, 5),
    ('iPhone 15 Pro Max', 'Eletrônicos', 9499.90, 12),
    ('iPad Pro 12.9"', 'Eletrônicos', 10999.90, 8),
    ('AirPods Pro 2', 'Eletrônicos', 2299.90, 25),
    ('Cadeira Herman Miller', 'Móveis', 8999.90, 3),
    ('Monitor Dell UltraSharp 32"', 'Informática', 4599.90, 10),
    ('Teclado Keychron Q1', 'Informática', 1299.90, 15),
    ('Mouse MX Master 3S', 'Informática', 649.90, 30),
    ('PlayStation 5', 'Eletrônicos', 4499.90, 7),
    ('Xbox Series X', 'Eletrônicos', 4299.90, 6),
    ('Nintendo Switch OLED', 'Eletrônicos', 2599.90, 10),
    ('Kindle Oasis', 'Eletrônicos', 1499.90, 20);
    
    PRINT 'Produtos iniciais inseridos para Pool 3';
END
GO