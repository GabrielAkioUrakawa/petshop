import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class FornecedorRepository {
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
    cnpj: string,
    nome: string,
    email: string,
    telefone: string,
    categoria: string
  ) {
    await this.pool.query(
      `INSERT INTO fornecedor (cnpj, nome, email, telefone, categoria)
       VALUES ($1, $2, $3, $4, $5)`,
      [cnpj, nome, email, telefone, categoria]
    );
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM fornecedor');
    return result.rows;
  }

  async findByCnpj(cnpj: string) {
    const result = await this.pool.query(
      'SELECT * FROM fornecedor WHERE cnpj = $1',
      [cnpj]
    );
    return result.rows[0];
  }

  async update(
    cnpj: string,
    nome: string,
    email: string,
    telefone: string,
    categoria: string
  ) {
    await this.pool.query(
      `UPDATE fornecedor SET nome = $2, email = $3, telefone = $4, categoria = $5
       WHERE cnpj = $1`,
      [cnpj, nome, email, telefone, categoria]
    );
  }

  async delete(cnpj: string) {
    await this.pool.query('DELETE FROM fornecedor WHERE cnpj = $1', [cnpj]);
  }
}