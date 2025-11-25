import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class AnimalAlergiaRepository {
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

  async create(animalNome: string, animalCpf: string, alergia: string) {
    await this.pool.query(
      'INSERT INTO animal_alergias (animal_nome, animal_cpf, alergia) VALUES ($1, $2, $3)',
      [animalNome, animalCpf, alergia]
    );
  }

  async findByAnimal(animalNome: string, animalCpf: string) {
    const result = await this.pool.query(
      `SELECT AA.ANIMAL_NOME, AA.ANIMAL_CPF, AA.ALERGIA, A.ESPECIE, A.RACA, P.NOME AS DONO_NOME
       FROM ANIMAL_ALERGIAS AA
       JOIN ANIMAL A ON AA.ANIMAL_NOME = A.NOME AND AA.ANIMAL_CPF = A.ANIMAL_CPF
       JOIN PESSOA P ON A.ANIMAL_CPF = P.CPF
       WHERE AA.ANIMAL_NOME = $1 AND AA.ANIMAL_CPF = $2
       ORDER BY AA.ALERGIA`,
      [animalNome, animalCpf]
    );
    return result.rows;
  }

  async findAll() {
    const result = await this.pool.query(
      `SELECT AA.ANIMAL_NOME, AA.ANIMAL_CPF, AA.ALERGIA, A.ESPECIE, A.RACA, P.NOME AS DONO_NOME
       FROM ANIMAL_ALERGIAS AA
       JOIN ANIMAL A ON AA.ANIMAL_NOME = A.NOME AND AA.ANIMAL_CPF = A.ANIMAL_CPF
       JOIN PESSOA P ON A.ANIMAL_CPF = P.CPF
       ORDER BY AA.ANIMAL_NOME, AA.ALERGIA`
    );
    return result.rows;
  }

  async delete(animalNome: string, animalCpf: string, alergia: string) {
    await this.pool.query(
      'DELETE FROM animal_alergias WHERE animal_nome = $1 AND animal_cpf = $2 AND alergia = $3',
      [animalNome, animalCpf, alergia]
    );
  }

  async deleteAllByAnimal(animalNome: string, animalCpf: string) {
    await this.pool.query(
      'DELETE FROM animal_alergias WHERE animal_nome = $1 AND animal_cpf = $2',
      [animalNome, animalCpf]
    );
  }
}
