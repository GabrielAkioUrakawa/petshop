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
    const result = await this.pool.query('SELECT * FROM cliente');
    return result.rows;
  }

  async findByCpf(cpf: string) {
    const result = await this.pool.query('SELECT * FROM cliente WHERE cpf = $1', [cpf]);
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
}