import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class ClienteRepository {
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

  async create(cpf: string, dataCadastro: string) {
    await this.pool.query(
      'INSERT INTO cliente (cpf, data_cadastro) VALUES ($1, $2)',
      [cpf, dataCadastro]
    );
  }

  async findAll() {
    const result = await this.pool.query(
      `SELECT CL.CPF, CL.DATA_CADASTRO, P.NOME, P.TELEFONE, P.ENDERECO, P.EMAIL
       FROM CLIENTE CL
       JOIN PESSOA P ON CL.CPF = P.CPF
       ORDER BY P.NOME`
    );
    return result.rows;
  }

  async findByCpf(cpf: string) {
    const result = await this.pool.query(
      `SELECT CL.CPF, CL.DATA_CADASTRO, P.NOME, P.TELEFONE, P.ENDERECO
       FROM CLIENTE CL
       JOIN PESSOA P ON CL.CPF = P.CPF
       WHERE CL.CPF = $1`,
      [cpf]
    );
    return result.rows[0];
  }

  async update(cpf: string, dataCadastro: string) {
    await this.pool.query(
      'UPDATE cliente SET data_cadastro = $2 WHERE cpf = $1',
      [cpf, dataCadastro]
    );
  }

  async delete(cpf: string) {
    await this.pool.query('DELETE FROM cliente WHERE cpf = $1', [cpf]);
  }

  async findInactive(dataLimite: string) {
    const result = await this.pool.query(
      `SELECT P.NOME AS NOME_CLIENTE, P.CPF AS CPF_CLIENTE, MAX(C.DATA_HORA) AS DATA_ULTIMA_COMPRA
       FROM CLIENTE CL
       JOIN PESSOA P ON CL.CPF = P.CPF
       LEFT JOIN COMPRA C ON CL.CPF = C.CPF_CLIENTE
       GROUP BY P.NOME, P.CPF
       HAVING MAX(C.DATA_HORA) IS NULL OR MAX(C.DATA_HORA) < $1`,
      [dataLimite]
    );
    return result.rows;
  }

  async count() {
    const result = await this.pool.query('SELECT COUNT(*) FROM cliente');
    return parseInt(result.rows[0].count);
  }
}