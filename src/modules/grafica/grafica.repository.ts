import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class GraficaRepository {
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

  async create(id: string, nome: string) {
    await this.pool.query('INSERT INTO grafica (id, nome) VALUES ($1, $2)', [id, nome]);
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM grafica');
    return result.rows;
  }

  async findById(id: string) {
    const result = await this.pool.query('SELECT * FROM grafica WHERE id = $1', [id]);
    return result.rows[0];
  }

  async update(id: string, nome: string) {
    await this.pool.query('UPDATE grafica SET nome = $2 WHERE id = $1', [id, nome]);
  }

  async delete(id: string) {
    await this.pool.query('DELETE FROM grafica WHERE id = $1', [id]);
  }
}