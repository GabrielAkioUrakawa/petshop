import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class LoteRepository {
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
    idProd: number,
    fCnpj: string,
    quantidade: number
  ) {
    await this.pool.query(
      `INSERT INTO lote (id_prod, f_cnpj, quantidade)
       VALUES ($1, $2, $3)`,
      [idProd, fCnpj, quantidade]
    );
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM lote');
    return result.rows;
  }

  async findById(idLote: number) {
    const result = await this.pool.query('SELECT * FROM lote WHERE id_lote = $1', [idLote]);
    return result.rows[0];
  }

  async update(
    idLote: number,
    idProd: number,
    fCnpj: string,
    quantidade: number
  ) {
    await this.pool.query(
      `UPDATE lote SET id_prod = $2, f_cnpj = $3, quantidade = $4
       WHERE id_lote = $1`,
      [idLote, idProd, fCnpj, quantidade]
    );
  }

  async delete(idLote: number) {
    await this.pool.query('DELETE FROM lote WHERE id_lote = $1', [idLote]);
  }
}