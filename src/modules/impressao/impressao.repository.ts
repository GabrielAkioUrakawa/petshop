import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class ImprimeRepository {
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

  async create(lisbn: string, graficaId: string, nroCopias: number, dataEntrega: Date) {
    await this.pool.query(
      'INSERT INTO imprime (lisbn, grafica_id, nro_copias, data_entrega) VALUES ($1, $2, $3, $4)',
      [lisbn, graficaId, nroCopias, dataEntrega]
    );
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM imprime');
    return result.rows;
  }

  async findByIds(lisbn: string, graficaId: string) {
    const result = await this.pool.query(
      'SELECT * FROM imprime WHERE lisbn = $1 AND grafica_id = $2',
      [lisbn, graficaId]
    );
    return result.rows[0];
  }

  async update(lisbn: string, graficaId: string, nroCopias: number, dataEntrega: Date) {
    await this.pool.query(
      'UPDATE imprime SET nro_copias = $3, data_entrega = $4 WHERE lisbn = $1 AND grafica_id = $2',
      [lisbn, graficaId, nroCopias, dataEntrega]
    );
  }

  async delete(lisbn: string, graficaId: string) {
    await this.pool.query(
      'DELETE FROM imprime WHERE lisbn = $1 AND grafica_id = $2',
      [lisbn, graficaId]
    );
  }
}