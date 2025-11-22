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

  async create(
    descricao: string,
    categoria: string,
    precoVenda: number,
    qtdeEstoque: number,
    qtdeMinima: number,
    fornCnpj?: string
  ) {
    await this.pool.query(
      'INSERT INTO produto (descricao, categoria, preco_venda, qtde_estoque, qtde_minima, forn_cnpj) VALUES ($1, $2, $3, $4, $5, $6)',
      [descricao, categoria, precoVenda, qtdeEstoque, qtdeMinima, fornCnpj]
    );
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM produto');
    return result.rows;
  }

  async findById(idProduto: number) {
    const result = await this.pool.query('SELECT * FROM produto WHERE id_produto = $1', [idProduto]);
    return result.rows[0];
  }

  async update(
    idProduto: number,
    descricao: string,
    categoria: string,
    precoVenda: number,
    qtdeEstoque: number,
    qtdeMinima: number,
    fornCnpj?: string
  ) {
    await this.pool.query(
      'UPDATE produto SET descricao = $2, categoria = $3, preco_venda = $4, qtde_estoque = $5, qtde_minima = $6, forn_cnpj = $7 WHERE id_produto = $1',
      [idProduto, descricao, categoria, precoVenda, qtdeEstoque, qtdeMinima, fornCnpj]
    );
  }

  async delete(idProduto: number) {
    await this.pool.query('DELETE FROM produto WHERE id_produto = $1', [idProduto]);
  }
}