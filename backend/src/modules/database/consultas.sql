-- ==========================================
-- CONSULTAS SQL - PETSHOP
-- ==========================================

-- ==========================================
-- CONSULTA 1: Produtos com Estoque Baixo
-- ==========================================
-- Objetivo: Mostrar quais produtos estão com o estoque abaixo da quantidade mínima definida,
--           incluindo o nome do fornecedor e a categoria de cada produto.
-- Nota: Requer os campos QTDE_MINIMA, FORN_CNPJ e CATEGORIA na tabela PRODUTO

SELECT
    P.ID_PRODUTO,
    P.DESCRICAO AS NOME_PRODUTO,
    P.CATEGORIA,
    F.NOME AS NOME_FORNECEDOR
FROM
    PRODUTO AS P
    JOIN FORNECEDOR AS F ON P.FORN_CNPJ = F.CNPJ
WHERE
    P.QTDE_ESTOQUE < P.QTDE_MINIMA;


-- ==========================================
-- CONSULTA 2: Serviços por Fornecedor
-- ==========================================
-- Objetivo: Listar os serviços que utilizam produtos de um determinado fornecedor,
--           mostrando o nome do fornecedor, o nome do produto e o tipo de serviço
--           em que o produto foi consumido.
-- Nota: Requer a tabela COMPRA_INCLUI para relacionar SERVICO e PRODUTO

SELECT
    F.NOME AS NOME_FORNECEDOR,
    P.DESCRICAO AS NOME_PRODUTO,
    S.TIPO AS TIPO_SERVICO,
    S.DATA_HORA
FROM
    FORNECEDOR F
    JOIN PRODUTO P ON F.CNPJ = P.FORN_CNPJ
    JOIN COMPRA_INCLUI CI ON P.ID_PRODUTO = CI.ID_PRODUTO
    JOIN SERVICO S ON CI.SERVICO_CPF = S.SERVICO_CPF
WHERE
    F.NOME = 'nome_do_fornecedor_específico';


-- ==========================================
-- CONSULTA 3: Funcionários Mais Ativos
-- ==========================================
-- Objetivo: Mostrar os funcionários que mais realizaram serviços, exibindo o nome do funcionário,
--           a especialidade e a quantidade total de serviços executados, em ordem decrescente.
-- Nota: Versão adaptada sem a tabela REALIZA (usando a estrutura atual)

SELECT
    P.NOME AS FUNCIONARIO_NOME,
    F.ESPECIALIDADE,
    COUNT(S.CLIENTE_CPF) AS TOTAL_SERVICOS
FROM
    FUNCIONARIO F
    JOIN PESSOA P ON F.CPF = P.CPF
    JOIN SERVICO S ON F.CPF = S.FUNCIONARIO_CPF
GROUP BY
    P.NOME, F.ESPECIALIDADE
ORDER BY
    TOTAL_SERVICOS DESC;

-- Versão original (requer tabela REALIZA):
/*
SELECT
    P.NOME AS FUNCIONARIO_NOME,
    F.ESPECIALIDADE,
    COUNT(R.SERVICO) AS TOTAL_SERVICOS
FROM
    FUNCIONARIO F
    JOIN PESSOA P ON F.CPF = P.CPF
    JOIN REALIZA R ON F.CPF = R.FUNCIONARIO_CPF
    JOIN SERVICO S ON R.SERVICO = S.SERVICO_CPF
GROUP BY
    P.NOME, F.ESPECIALIDADE
ORDER BY
    TOTAL_SERVICOS DESC;
*/


-- ==========================================
-- CONSULTA 4: Produto Mais Vendido
-- ==========================================
-- Objetivo: Mostrar o produto que mais foi vendido no PETSHOP, exibindo a categoria e preço.
-- Nota: Requer a tabela COMPRA_INCLUI e os campos CATEGORIA e PRECO_VENDA em PRODUTO

SELECT
    P.DESCRICAO AS NOME_PRODUTO,
    P.CATEGORIA,
    P.PRECO_VENDA,
    SUM(CI.QUANTIDADE) AS QUANTIDADE_TOTAL_VENDIDA
FROM
    PRODUTO P
    JOIN COMPRA_INCLUI CI ON P.ID_PRODUTO = CI.ID_PRODUTO
GROUP BY
    P.DESCRICAO, P.CATEGORIA, P.PRECO_VENDA
ORDER BY
    QUANTIDADE_TOTAL_VENDIDA DESC
LIMIT 1;


-- ==========================================
-- CONSULTA 5: Compras por Período
-- ==========================================
-- Objetivo: Listar compras realizadas em um determinado mês, com os dados do cliente,
--           forma de pagamento (meio), status da compra e quantidade total de produtos adquiridos.

-- Versão adaptada (sem contagem de produtos):
SELECT
    C.ID_COMPRA,
    P.NOME AS NOME_CLIENTE,
    P.CPF AS CPF_CLIENTE,
    C.DATA_HORA,
    C.MEIO AS FORMA_PAGAMENTO,
    C.STATUS
FROM
    COMPRA C
    JOIN CLIENTE CL ON C.CPF_CLIENTE = CL.CPF
    JOIN PESSOA P ON CL.CPF = P.CPF
WHERE
    C.DATA_HORA >= '2024-01-01'
    AND C.DATA_HORA < '2024-02-01'
ORDER BY
    C.DATA_HORA;

-- Versão completa (requer tabela COMPRA_INCLUI):
/*
SELECT
    C.ID_COMPRA,
    P.NOME AS NOME_CLIENTE,
    P.CPF AS CPF_CLIENTE,
    C.DATA_HORA,
    C.MEIO AS FORMA_PAGAMENTO,
    C.STATUS,
    SUM(CI.QUANTIDADE) AS TOTAL_PRODUTOS_ADQUIRIDOS
FROM
    COMPRA C
    JOIN CLIENTE CL ON C.CPF_CLIENTE = CL.CPF
    JOIN PESSOA P ON CL.CPF = P.CPF
    JOIN COMPRA_INCLUI CI ON C.ID_COMPRA = CI.ID_COMPRA
WHERE
    C.DATA_HORA BETWEEN '2024-01-01' AND '2024-01-31'
GROUP BY
    C.ID_COMPRA, P.NOME, P.CPF, C.DATA_HORA, C.MEIO, C.STATUS
ORDER BY
    C.DATA_HORA;
*/


-- ==========================================
-- CONSULTA 6: Clientes Inativos
-- ==========================================
-- Objetivo: Buscar clientes "Inativos" ou "Sumidos".
--           Listar clientes que não compram nada há mais de 6 meses.

SELECT
    P.NOME AS NOME_CLIENTE,
    P.CPF AS CPF_CLIENTE,
    MAX(C.DATA_HORA) AS DATA_ULTIMA_COMPRA,
    CASE
        WHEN MAX(C.DATA_HORA) IS NULL THEN 'Nunca comprou'
        ELSE CONCAT(
            EXTRACT(YEAR FROM AGE(CURRENT_DATE, MAX(C.DATA_HORA)::DATE)) * 12 +
            EXTRACT(MONTH FROM AGE(CURRENT_DATE, MAX(C.DATA_HORA)::DATE)),
            ' meses'
        )
    END AS TEMPO_INATIVO
FROM
    CLIENTE CL
    JOIN PESSOA P ON CL.CPF = P.CPF
    LEFT JOIN COMPRA C ON CL.CPF = C.CPF_CLIENTE
GROUP BY
    P.NOME, P.CPF
HAVING
    MAX(C.DATA_HORA) IS NULL
    OR MAX(C.DATA_HORA) < (CURRENT_DATE - INTERVAL '6 months')
ORDER BY
    DATA_ULTIMA_COMPRA NULLS FIRST;


-- ==========================================
-- CONSULTA 7: Agendamento do Dia
-- ==========================================
-- Objetivo: Consultar agendamento do Dia por Funcionário.
--           Mostrar a agenda do dia, detalhando quem é o funcionário,
--           qual o serviço e qual o animal/dono.

-- Versão adaptada (usando estrutura atual):
SELECT
    PF.NOME AS NOME_FUNCIONARIO,
    F.ESPECIALIDADE,
    S.TIPO AS TIPO_SERVICO,
    S.DATA_HORA,
    S.ANIMAL_NOME AS NOME_ANIMAL,
    PC.NOME AS DONO_ANIMAL,
    S.DESCRICAO AS DESCRICAO_SERVICO,
    S.PRECO
FROM
    SERVICO S
    JOIN FUNCIONARIO F ON S.FUNCIONARIO_CPF = F.CPF
    JOIN PESSOA PF ON F.CPF = PF.CPF
    JOIN ANIMAL A ON S.ANIMAL_NOME = A.NOME AND S.ANIMAL_CPF = A.DONO_CPF
    JOIN CLIENTE CL ON A.DONO_CPF = CL.CPF
    JOIN PESSOA PC ON CL.CPF = PC.CPF
WHERE
    DATE(S.DATA_HORA) = '2024-01-16'
ORDER BY
    S.DATA_HORA, PF.NOME;

-- Versão original (requer tabela REALIZA):
/*
SELECT
    PF.NOME AS NOME_FUNCIONARIO,
    F.ESPECIALIDADE,
    S.TIPO AS TIPO_SERVICO,
    S.DATA_HORA,
    A.NOME AS NOME_ANIMAL,
    PC.NOME AS DONO_ANIMAL
FROM
    SERVICO S
    JOIN REALIZA R ON S.SERVICO_CPF = R.SERVICO
    JOIN FUNCIONARIO F ON R.FUNCIONARIO_CPF = F.CPF
    JOIN PESSOA PF ON F.CPF = PF.CPF
    JOIN ANIMAL A ON S.ANIMAL = A.ANIMAL_CPF
    JOIN CLIENTE CL ON A.ANIMAL_CPF = CL.CPF
    JOIN PESSOA PC ON CL.CPF = PC.CPF
WHERE
    DATE(S.DATA_HORA) = '2024-01-16'
ORDER BY
    S.DATA_HORA;
*/
