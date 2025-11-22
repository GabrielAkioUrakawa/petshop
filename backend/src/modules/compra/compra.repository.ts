import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class CompraRepository {
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
    dataHora: string,
    meio: string,
    parcela: number,
    status: string,
    cpfCliente: string
  ) {
    await this.pool.query(
      `INSERT INTO compra (data_hora, meio, parcela, status, cpf_cliente)
       VALUES ($1, $2, $3, $4, $5)`,
      [dataHora, meio, parcela, status, cpfCliente]
    );
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM compra');
    return result.rows;
  }

  async findById(idCompra: number) {
    const result = await this.pool.query(
      'SELECT * FROM compra WHERE id_compra = $1',
      [idCompra]
    );
    return result.rows[0];
  }

  async update(
    idCompra: number,
    dataHora: string,
    meio: string,
    parcela: number,
    status: string,
    cpfCliente: string
  ) {
    await this.pool.query(
      `UPDATE compra SET data_hora = $2, meio = $3, parcela = $4, status = $5, cpf_cliente = $6
       WHERE id_compra = $1`,
      [idCompra, dataHora, meio, parcela, status, cpfCliente]
    );
  }

  async delete(idCompra: number) {
    await this.pool.query('DELETE FROM compra WHERE id_compra = $1', [idCompra]);
  }
}
