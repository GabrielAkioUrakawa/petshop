CREATE TABLE grafica (
    id VARCHAR PRIMARY KEY,
    nome VARCHAR UNIQUE
);

CREATE TABLE livro (
    isbn VARCHAR PRIMARY KEY,
    titulo VARCHAR NOT NULL,
    data_publicacao DATE
);

CREATE TABLE imprime (
    lisbn VARCHAR NOT NULL,
    grafica_id VARCHAR NOT NULL,
    nro_copias INTEGER,
    data_entrega DATE,
    PRIMARY KEY (lisbn, grafica_id),
    CONSTRAINT fk_livro FOREIGN KEY (lisbn) REFERENCES livro(isbn) ON DELETE CASCADE,
    CONSTRAINT fk_grafica FOREIGN KEY (grafica_id) REFERENCES grafica(id) ON DELETE CASCADE
);

INSERT INTO grafica (id, nome) VALUES
    ('g1', 'Gráfica Sol'),
    ('g2', 'Gráfica PrintMais'),
    ('g3', 'Gráfica Rápida');

INSERT INTO livro (isbn, titulo, data_publicacao) VALUES
    ('978-85-7522-123-4', 'Como Programar em SQL', '2021-05-10'),
    ('978-85-7522-456-7', 'NestJS para Iniciantes', '2023-03-22'),
    ('978-85-7522-789-0', 'Docker Simplificado', '2022-11-15');

INSERT INTO imprime (lisbn, grafica_id, nro_copias, data_entrega) VALUES
    ('978-85-7522-123-4', 'g1', 1000, '2023-07-21'),
    ('978-85-7522-456-7', 'g2', 500, '2023-09-10'),
    ('978-85-7522-789-0', 'g3', 750, '2023-10-05');