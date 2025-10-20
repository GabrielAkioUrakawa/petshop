import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class LivroRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ssl: false
    });
  }

  async create(isbn: string, titulo: string, dataPublicacao: Date) {
    await this.pool.query(
      'INSERT INTO livro (isbn, titulo, data_publicacao) VALUES ($1, $2, $3)',
      [isbn, titulo, dataPublicacao]
    );
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM livro');
    return result.rows;
  }

  async findByIsbn(isbn: string) {
    const result = await this.pool.query('SELECT * FROM livro WHERE isbn = $1', [isbn]);
    return result.rows[0];
  }

  async update(isbn: string, titulo: string, dataPublicacao: Date) {
    await this.pool.query(
      'UPDATE livro SET titulo = $2, data_publicacao = $3 WHERE isbn = $1',
      [isbn, titulo, dataPublicacao]
    );
  }

  async delete(isbn: string) {
    await this.pool.query('DELETE FROM livro WHERE isbn = $1', [isbn]);
  }
}