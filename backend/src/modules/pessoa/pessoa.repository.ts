import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class PessoaRepository {
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

  async create(cpf: string, nome: string, email: string, telefone: string, endereco: string) {
    await this.pool.query(
      'INSERT INTO pessoa (cpf, nome, email, telefone, endereco) VALUES ($1, $2, $3, $4, $5)',
      [cpf, nome, email, telefone, endereco]
    );
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM pessoa');
    return result.rows;
  }

  async findByCpf(cpf: string) {
    const result = await this.pool.query('SELECT * FROM pessoa WHERE cpf = $1', [cpf]);
    return result.rows[0];
  }

  async update(cpf: string, nome: string, email: string, telefone: string, endereco: string) {
    await this.pool.query(
      'UPDATE pessoa SET nome = $2, email = $3, telefone = $4, endereco = $5 WHERE cpf = $1',
      [cpf, nome, email, telefone, endereco]
    );
  }

  async delete(cpf: string) {
    await this.pool.query('DELETE FROM pessoa WHERE cpf = $1', [cpf]);
  }
}