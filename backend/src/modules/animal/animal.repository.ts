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
    donoCpf: string,
    nome: string,
    raca: string,
    especie: string,
    sexo: string,
    peso: number,
    dataNascimento: string
  ) {
    await this.pool.query(
      `INSERT INTO animal (dono_cpf, nome, raca, especie, sexo, peso, data_nascimento)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [donoCpf, nome, raca, especie, sexo, peso, dataNascimento]
    );
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM animal');
    return result.rows;
  }

  async findByNomeAndDonoCpf(nome: string, donoCpf: string) {
    const result = await this.pool.query(
      'SELECT * FROM animal WHERE nome = $1 AND dono_cpf = $2',
      [nome, donoCpf]
    );
    return result.rows[0];
  }

  async update(
    nome: string,
    donoCpf: string,
    raca: string,
    especie: string,
    sexo: string,
    peso: number,
    dataNascimento: string
  ) {
    await this.pool.query(
      `UPDATE animal SET raca = $3, especie = $4, sexo = $5, peso = $6, data_nascimento = $7
       WHERE nome = $1 AND dono_cpf = $2`,
      [nome, donoCpf, raca, especie, sexo, peso, dataNascimento]
    );
  }

  async delete(nome: string, donoCpf: string) {
    await this.pool.query('DELETE FROM animal WHERE nome = $1 AND dono_cpf = $2', [nome, donoCpf]);
  }

  async findByCliente(cpfCliente: string) {
    const result = await this.pool.query(
      `SELECT A.NOME, A.ESPECIE, A.RACA, A.SEXO, A.PESO, A.DATA_NASCIMENTO, P.NOME AS NOME_DONO
       FROM ANIMAL A
       JOIN PESSOA P ON A.ANIMAL_CPF = P.CPF
       WHERE A.ANIMAL_CPF = $1
       ORDER BY A.NOME`,
      [cpfCliente]
    );
    return result.rows;
  }

  async count() {
    const result = await this.pool.query('SELECT COUNT(*) FROM animal');
    return parseInt(result.rows[0].count);
  }
}
