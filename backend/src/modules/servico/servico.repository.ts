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
    dataHora: string,
    preco: number,
    tipo: string,
    descricao: string,
    clienteCpf: string,
    funcionarioCpf: string,
    animalCpf: string
  ) {
    await this.pool.query(
      `INSERT INTO servico (data_hora, preco, tipo, descricao, cliente_cpf, funcionario_cpf, animal_cpf)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [dataHora, preco, tipo, descricao, clienteCpf, funcionarioCpf, animalCpf]
    );
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM servico');
    return result.rows;
  }

  async findById(clienteCpf: string, dataHora: string) {
    const result = await this.pool.query(
      'SELECT * FROM servico WHERE cliente_cpf = $1 AND data_hora = $2',
      [clienteCpf, dataHora]
    );
    return result.rows[0];
  }

  async update(
    clienteCpf: string,
    dataHora: string,
    preco: number,
    tipo: string,
    descricao: string,
    funcionarioCpf: string,
    animalCpf: string
  ) {
    await this.pool.query(
      `UPDATE servico SET preco = $3, tipo = $4, descricao = $5, funcionario_cpf = $6, animal_cpf = $7
       WHERE cliente_cpf = $1 AND data_hora = $2`,
      [clienteCpf, dataHora, preco, tipo, descricao, funcionarioCpf, animalCpf]
    );
  }

  async delete(clienteCpf: string, dataHora: string) {
    await this.pool.query(
      'DELETE FROM servico WHERE cliente_cpf = $1 AND data_hora = $2',
      [clienteCpf, dataHora]
    );
  }
}