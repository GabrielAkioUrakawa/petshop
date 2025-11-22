import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class AnimalRepository {
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
    clientCpf: string,
    nome: string,
    raca: string,
    especie: string,
    sexo: string,
    peso: number,
    dataNascimento: string
  ) {
    await this.pool.query(
      `INSERT INTO animal (client_cpf, nome, raca, especie, sexo, peso, data_nascimento)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [clientCpf, nome, raca, especie, sexo, peso, dataNascimento]
    );
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM animal');
    return result.rows;
  }

  async findByClientCpf(clientCpf: string) {
    const result = await this.pool.query('SELECT * FROM animal WHERE client_cpf = $1', [clientCpf]);
    return result.rows[0];
  }

  async update(
    clientCpf: string,
    nome: string,
    raca: string,
    especie: string,
    sexo: string,
    peso: number,
    dataNascimento: string
  ) {
    await this.pool.query(
      `UPDATE animal SET nome = $2, raca = $3, especie = $4, sexo = $5, peso = $6, data_nascimento = $7
       WHERE client_cpf = $1`,
      [clientCpf, nome, raca, especie, sexo, peso, dataNascimento]
    );
  }

  async delete(clientCpf: string) {
    await this.pool.query('DELETE FROM animal WHERE client_cpf = $1', [clientCpf]);
  }
}