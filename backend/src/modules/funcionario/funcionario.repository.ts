import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class FuncionarioRepository {
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

  async create(cpf: string, especialidade: string) {
    await this.pool.query(
      'INSERT INTO funcionario (cpf, especialidade) VALUES ($1, $2)',
      [cpf, especialidade]
    );
  }

  async findAll() {
    const result = await this.pool.query(
      `SELECT F.CPF, F.ESPECIALIDADE, P.NOME, P.TELEFONE, P.ENDERECO
       FROM FUNCIONARIO F
       JOIN PESSOA P ON F.CPF = P.CPF
       ORDER BY P.NOME`
    );
    return result.rows;
  }

  async findByCpf(cpf: string) {
    const result = await this.pool.query(
      `SELECT F.CPF, F.ESPECIALIDADE, P.NOME, P.TELEFONE, P.ENDERECO
       FROM FUNCIONARIO F
       JOIN PESSOA P ON F.CPF = P.CPF
       WHERE F.CPF = $1`,
      [cpf]
    );
    return result.rows[0];
  }

  async update(cpf: string, especialidade: string) {
    await this.pool.query(
      'UPDATE funcionario SET especialidade = $2 WHERE cpf = $1',
      [cpf, especialidade]
    );
  }

  async delete(cpf: string) {
    await this.pool.query('DELETE FROM funcionario WHERE cpf = $1', [cpf]);
  }

  async findWithServiceCount() {
    const result = await this.pool.query(`
      SELECT P.NOME AS FUNCIONARIO_NOME, F.ESPECIALIDADE, COUNT(S.SERVICO_CPF) AS TOTAL_SERVICO
      FROM FUNCIONARIO F
      JOIN PESSOA P ON F.CPF = P.CPF
      JOIN SERVICO S ON F.CPF = S.FUNCIONARIO_CPF
      GROUP BY P.NOME, F.ESPECIALIDADE
      ORDER BY TOTAL_SERVICO DESC
    `);
    return result.rows;
  }

  async findEmployeeOfTheMonth(mes: number, ano: number) {
    const result = await this.pool.query(
      `SELECT P.NOME AS FUNCIONARIO_NOME, F.CPF AS FUNCIONARIO_CPF, F.ESPECIALIDADE,
              COUNT(S.SERVICO_CPF) AS TOTAL_ATENDIMENTOS
       FROM FUNCIONARIO F
       JOIN PESSOA P ON F.CPF = P.CPF
       JOIN SERVICO S ON F.CPF = S.FUNCIONARIO_CPF
       WHERE EXTRACT(MONTH FROM S.DATA_HORA) = $1
         AND EXTRACT(YEAR FROM S.DATA_HORA) = $2
       GROUP BY P.NOME, F.CPF, F.ESPECIALIDADE
       ORDER BY TOTAL_ATENDIMENTOS DESC
       LIMIT 1`,
      [mes, ano]
    );
    return result.rows[0];
  }
}