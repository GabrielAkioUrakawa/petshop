import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class ServicoRepository {
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
    servicoCpf: string,
    dataHora: string,
    preco: number,
    tipo: string,
    descricao: string,
    funcionarioCpf: string,
    animalNome: string,
    animalCpf: string
  ) {
    await this.pool.query(
      `INSERT INTO servico (servico_cpf, data_hora, preco, tipo, descricao, funcionario_cpf, animal_nome, animal_cpf)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [servicoCpf, dataHora, preco, tipo, descricao, funcionarioCpf, animalNome, animalCpf]
    );
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM servico');
    return result.rows;
  }

  async findById(servicoCpf: string, dataHora: string) {
    const result = await this.pool.query(
      'SELECT * FROM servico WHERE servico_cpf = $1 AND data_hora = $2',
      [servicoCpf, dataHora]
    );
    return result.rows[0];
  }

  async update(
    servicoCpf: string,
    dataHora: string,
    preco: number,
    tipo: string,
    descricao: string,
    funcionarioCpf: string,
    animalNome: string,
    animalCpf: string
  ) {
    await this.pool.query(
      `UPDATE servico SET preco = $3, tipo = $4, descricao = $5, funcionario_cpf = $6, animal_nome = $7, animal_cpf = $8
       WHERE servico_cpf = $1 AND data_hora = $2`,
      [servicoCpf, dataHora, preco, tipo, descricao, funcionarioCpf, animalNome, animalCpf]
    );
  }

  async delete(servicoCpf: string, dataHora: string) {
    await this.pool.query(
      'DELETE FROM servico WHERE servico_cpf = $1 AND data_hora = $2',
      [servicoCpf, dataHora]
    );
  }
}