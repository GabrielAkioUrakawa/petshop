import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class RealizaRepository {
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

  async create(funcionarioCpf: string, servicoCpf: string, servicoDataHora: string) {
    await this.pool.query(
      'INSERT INTO realiza (funcionario_cpf, servico_cpf, servico_data_hora) VALUES ($1, $2, $3)',
      [funcionarioCpf, servicoCpf, servicoDataHora]
    );
  }

  async findAll() {
    const result = await this.pool.query(
      `SELECT R.FUNCIONARIO_CPF, PF.NOME AS FUNCIONARIO_NOME, F.ESPECIALIDADE,
              R.SERVICO_CPF, R.SERVICO_DATA_HORA, S.TIPO AS TIPO_SERVICO, S.PRECO,
              PC.NOME AS CLIENTE_NOME, A.NOME AS ANIMAL_NOME
       FROM REALIZA R
       JOIN FUNCIONARIO F ON R.FUNCIONARIO_CPF = F.CPF
       JOIN PESSOA PF ON F.CPF = PF.CPF
       JOIN SERVICO S ON R.SERVICO_CPF = S.SERVICO_CPF AND R.SERVICO_DATA_HORA = S.DATA_HORA
       JOIN ANIMAL A ON S.ANIMAL_NOME = A.NOME AND S.ANIMAL_CPF = A.ANIMAL_CPF
       JOIN PESSOA PC ON A.ANIMAL_CPF = PC.CPF
       ORDER BY R.SERVICO_DATA_HORA DESC`
    );
    return result.rows;
  }

  async findByFuncionario(funcionarioCpf: string) {
    const result = await this.pool.query(
      `SELECT R.FUNCIONARIO_CPF, PF.NOME AS FUNCIONARIO_NOME, F.ESPECIALIDADE,
              R.SERVICO_CPF, R.SERVICO_DATA_HORA, S.TIPO AS TIPO_SERVICO, S.PRECO,
              PC.NOME AS CLIENTE_NOME, A.NOME AS ANIMAL_NOME
       FROM REALIZA R
       JOIN FUNCIONARIO F ON R.FUNCIONARIO_CPF = F.CPF
       JOIN PESSOA PF ON F.CPF = PF.CPF
       JOIN SERVICO S ON R.SERVICO_CPF = S.SERVICO_CPF AND R.SERVICO_DATA_HORA = S.DATA_HORA
       JOIN ANIMAL A ON S.ANIMAL_NOME = A.NOME AND S.ANIMAL_CPF = A.ANIMAL_CPF
       JOIN PESSOA PC ON A.ANIMAL_CPF = PC.CPF
       WHERE R.FUNCIONARIO_CPF = $1
       ORDER BY R.SERVICO_DATA_HORA DESC`,
      [funcionarioCpf]
    );
    return result.rows;
  }

  async findByServico(servicoCpf: string, servicoDataHora: string) {
    const result = await this.pool.query(
      `SELECT R.FUNCIONARIO_CPF, PF.NOME AS FUNCIONARIO_NOME, F.ESPECIALIDADE,
              R.SERVICO_CPF, R.SERVICO_DATA_HORA, S.TIPO AS TIPO_SERVICO, S.PRECO
       FROM REALIZA R
       JOIN FUNCIONARIO F ON R.FUNCIONARIO_CPF = F.CPF
       JOIN PESSOA PF ON F.CPF = PF.CPF
       JOIN SERVICO S ON R.SERVICO_CPF = S.SERVICO_CPF AND R.SERVICO_DATA_HORA = S.DATA_HORA
       WHERE R.SERVICO_CPF = $1 AND R.SERVICO_DATA_HORA = $2`,
      [servicoCpf, servicoDataHora]
    );
    return result.rows;
  }

  async delete(funcionarioCpf: string, servicoCpf: string, servicoDataHora: string) {
    await this.pool.query(
      'DELETE FROM realiza WHERE funcionario_cpf = $1 AND servico_cpf = $2 AND servico_data_hora = $3',
      [funcionarioCpf, servicoCpf, servicoDataHora]
    );
  }
}
