import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class ServicoRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ssl: false,
    });
  }

  async create(
    servicoCpf: string,
    dataHora: string,
    preco: number,
    tipo: string,
    descricao: string,
    funcionarioCpf: string,
    animalNome: string,
    animalCpf: string
  ) {
    await this.pool.query(
      `INSERT INTO servico (servico_cpf, data_hora, preco, tipo, descricao, funcionario_cpf, animal_nome, animal_cpf)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [servicoCpf, dataHora, preco, tipo, descricao, funcionarioCpf, animalNome, animalCpf]
    );
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM servico');
    return result.rows;
  }

  async findById(servicoCpf: string, dataHora: string) {
    const result = await this.pool.query(
      'SELECT * FROM servico WHERE servico_cpf = $1 AND data_hora = $2',
      [servicoCpf, dataHora]
    );
    return result.rows[0];
  }

  async update(
    servicoCpf: string,
    dataHora: string,
    preco: number,
    tipo: string,
    descricao: string,
    funcionarioCpf: string,
    animalNome: string,
    animalCpf: string
  ) {
    await this.pool.query(
      `UPDATE servico SET preco = $3, tipo = $4, descricao = $5, funcionario_cpf = $6, animal_nome = $7, animal_cpf = $8
       WHERE servico_cpf = $1 AND data_hora = $2`,
      [servicoCpf, dataHora, preco, tipo, descricao, funcionarioCpf, animalNome, animalCpf]
    );
  }

  async delete(servicoCpf: string, dataHora: string) {
    await this.pool.query(
      'DELETE FROM servico WHERE servico_cpf = $1 AND data_hora = $2',
      [servicoCpf, dataHora]
    );
  }

  async findByFornecedor(nomeFornecedor: string) {
    const result = await this.pool.query(
      `SELECT F.NOME AS NOME_FORNECEDOR, P.DESCRICAO AS NOME_PRODUTO, S.TIPO AS TIPO_SERVICO, S.DATA_HORA
       FROM FORNECEDOR F
       JOIN PRODUTO P ON F.CNPJ = P.FORN_CNPJ
       JOIN COMPRA_INCLUI CI ON P.ID_PRODUTO = CI.ID_PRODUTO
       JOIN SERVICO S ON CI.SERVICO_CPF = S.SERVICO_CPF AND CI.SERVICO_DATA_HORA = S.DATA_HORA
       WHERE F.NOME = $1`,
      [nomeFornecedor]
    );
    return result.rows;
  }

  async findByDate(dataEspecifica: string) {
    const result = await this.pool.query(
      `SELECT PF.NOME AS NOME_FUNCIONARIO, F.ESPECIALIDADE, S.TIPO AS TIPO_SERVICO, S.DATA_HORA,
              A.NOME AS NOME_ANIMAL, PC.NOME AS DONO_ANIMAL
       FROM SERVICO S
       JOIN FUNCIONARIO F ON S.FUNCIONARIO_CPF = F.CPF
       JOIN PESSOA PF ON F.CPF = PF.CPF
       JOIN ANIMAL A ON S.ANIMAL_NOME = A.NOME AND S.ANIMAL_CPF = A.DONO_CPF
       JOIN CLIENTE CL ON A.DONO_CPF = CL.CPF
       JOIN PESSOA PC ON CL.CPF = PC.CPF
       WHERE DATE(S.DATA_HORA) = DATE($1)
       ORDER BY S.DATA_HORA`,
      [dataEspecifica]
    );
    return result.rows;
  }

  async count() {
    const result = await this.pool.query('SELECT COUNT(*) FROM servico');
    return parseInt(result.rows[0].count);
  }

  async findRevenueByMonth(mes: number, ano: number) {
    const result = await this.pool.query(
      `SELECT EXTRACT(MONTH FROM S.DATA_HORA) AS MES,
              EXTRACT(YEAR FROM S.DATA_HORA) AS ANO,
              SUM(S.PRECO) AS FATURAMENTO_SERVICOS,
              COALESCE(SUM(CI.QUANTIDADE * P.PRECO_VENDA), 0) AS FATURAMENTO_PRODUTOS,
              SUM(S.PRECO) + COALESCE(SUM(CI.QUANTIDADE * P.PRECO_VENDA), 0) AS FATURAMENTO_TOTAL,
              COUNT(DISTINCT S.SERVICO_CPF) AS TOTAL_SERVICOS
       FROM SERVICO S
       LEFT JOIN COMPRA_INCLUI CI ON S.SERVICO_CPF = CI.SERVICO_CPF
                                  AND S.DATA_HORA = CI.SERVICO_DATA_HORA
       LEFT JOIN PRODUTO P ON CI.ID_PRODUTO = P.ID_PRODUTO
       WHERE EXTRACT(MONTH FROM S.DATA_HORA) = $1
         AND EXTRACT(YEAR FROM S.DATA_HORA) = $2
       GROUP BY EXTRACT(MONTH FROM S.DATA_HORA), EXTRACT(YEAR FROM S.DATA_HORA)`,
      [mes, ano]
    );
    return result.rows[0];
  }
}