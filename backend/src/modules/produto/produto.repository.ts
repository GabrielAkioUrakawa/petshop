import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class ProdutoRepository {
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

  async create(codigo: number, nome: string, preco: number, quantidade: number) {
    await this.pool.query(
      'INSERT INTO produto (codigo, nome, preco, quantidade) VALUES ($1, $2, $3, $4)',
      [codigo, nome, preco, quantidade]
    );
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM produto');
    return result.rows;
  }

  async findByCodigo(codigo: number) {
    const result = await this.pool.query('SELECT * FROM produto WHERE codigo = $1', [codigo]);
    return result.rows[0];
  }

  async update(codigo: number, nome: string, preco: number, quantidade: number) {
    await this.pool.query(
      'UPDATE produto SET nome = $2, preco = $3, quantidade = $4 WHERE codigo = $1',
      [codigo, nome, preco, quantidade]
    );
  }

  async delete(codigo: number) {
    await this.pool.query('DELETE FROM produto WHERE codigo = $1', [codigo]);
  }
}