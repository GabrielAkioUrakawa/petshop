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
    idLote: number,
    dataValidade: string,
    quantidade: number,
    idCompra: string,
    codigoProduto: number
  ) {
    await this.pool.query(
      `INSERT INTO lote (id_lote, data_validade, quantidade, id_compra, codigo_produto)
       VALUES ($1, $2, $3, $4, $5)`,
      [idLote, dataValidade, quantidade, idCompra, codigoProduto]
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
    dataValidade: string,
    quantidade: number,
    idCompra: string,
    codigoProduto: number
  ) {
    await this.pool.query(
      `UPDATE lote SET data_validade = $2, quantidade = $3, id_compra = $4, codigo_produto = $5
       WHERE id_lote = $1`,
      [idLote, dataValidade, quantidade, idCompra, codigoProduto]
    );
  }

  async delete(idLote: number) {
    await this.pool.query('DELETE FROM lote WHERE id_lote = $1', [idLote]);
  }
}