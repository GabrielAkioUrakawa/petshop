import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class FuncionarioRepository {
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

  async create(cpf: string, especialidade: string) {
    await this.pool.query(
      'INSERT INTO funcionario (cpf, especialidade) VALUES ($1, $2)',
      [cpf, especialidade]
    );
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM funcionario');
    return result.rows;
  }

  async findByCpf(cpf: string) {
    const result = await this.pool.query('SELECT * FROM funcionario WHERE cpf = $1', [cpf]);
    return result.rows[0];
  }

  async update(cpf: string, especialidade: string) {
    await this.pool.query(
      'UPDATE funcionario SET especialidade = $2 WHERE cpf = $1',
      [cpf, especialidade]
    );
  }

  async delete(cpf: string) {
    await this.pool.query('DELETE FROM funcionario WHERE cpf = $1', [cpf]);
  }
}