import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class ClienteRepository {
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

  async create(data: {
    cpf: string;
    dataCadastro: string;
    nome: string;
    email?: string;
    telefone?: string;
    endereco?: string;
  }) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');

      // Insere ou atualiza na tabela PESSOA
      await client.query(
        `INSERT INTO pessoa (cpf, nome, email, telefone, endereco)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (cpf) DO UPDATE SET
           nome = EXCLUDED.nome,
           email = EXCLUDED.email,
           telefone = EXCLUDED.telefone,
           endereco = EXCLUDED.endereco`,
        [data.cpf, data.nome, data.email, data.telefone, data.endereco]
      );

      // Insere na tabela CLIENTE
      await client.query(
        'INSERT INTO cliente (cpf, data_cadastro) VALUES ($1, $2)',
        [data.cpf, data.dataCadastro]
      );

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async findAll() {
    const result = await this.pool.query(
      `SELECT CL.CPF, CL.DATA_CADASTRO, P.NOME, P.TELEFONE, P.ENDERECO, P.EMAIL
       FROM CLIENTE CL
       JOIN PESSOA P ON CL.CPF = P.CPF
       ORDER BY P.NOME`
    );
    return result.rows;
  }

  async findByCpf(cpf: string) {
    const result = await this.pool.query(
      `SELECT CL.CPF, CL.DATA_CADASTRO, P.NOME, P.TELEFONE, P.ENDERECO
       FROM CLIENTE CL
       JOIN PESSOA P ON CL.CPF = P.CPF
       WHERE CL.CPF = $1`,
      [cpf]
    );
    return result.rows[0];
  }

  async update(cpf: string, data: {
    dataCadastro?: string;
    nome?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
  }) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');

      // Constrói dinamicamente a query de UPDATE para PESSOA
      const pessoaFields: string[] = [];
      const pessoaValues: any[] = [];
      let pessoaParamCount = 1;

      if (data.nome !== undefined) {
        pessoaFields.push(`nome = $${pessoaParamCount++}`);
        pessoaValues.push(data.nome);
      }
      if (data.email !== undefined) {
        pessoaFields.push(`email = $${pessoaParamCount++}`);
        pessoaValues.push(data.email);
      }
      if (data.telefone !== undefined) {
        pessoaFields.push(`telefone = $${pessoaParamCount++}`);
        pessoaValues.push(data.telefone);
      }
      if (data.endereco !== undefined) {
        pessoaFields.push(`endereco = $${pessoaParamCount++}`);
        pessoaValues.push(data.endereco);
      }

      // Atualiza PESSOA se houver campos para atualizar
      if (pessoaFields.length > 0) {
        pessoaValues.push(cpf);
        await client.query(
          `UPDATE pessoa SET ${pessoaFields.join(', ')} WHERE cpf = $${pessoaParamCount}`,
          pessoaValues
        );
      }

      // Atualiza CLIENTE se houver data_cadastro
      if (data.dataCadastro !== undefined) {
        await client.query(
          'UPDATE cliente SET data_cadastro = $1 WHERE cpf = $2',
          [data.dataCadastro, cpf]
        );
      }

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async delete(cpf: string) {
    await this.pool.query('DELETE FROM cliente WHERE cpf = $1', [cpf]);
  }

  async findInactive(dataLimite: string) {
    const result = await this.pool.query(
      `SELECT P.NOME AS NOME_CLIENTE, P.CPF AS CPF_CLIENTE, MAX(C.DATA_HORA) AS DATA_ULTIMA_COMPRA
       FROM CLIENTE CL
       JOIN PESSOA P ON CL.CPF = P.CPF
       LEFT JOIN COMPRA C ON CL.CPF = C.CPF_CLIENTE
       GROUP BY P.NOME, P.CPF
       HAVING MAX(C.DATA_HORA) IS NULL OR MAX(C.DATA_HORA) < $1`,
      [dataLimite]
    );
    return result.rows;
  }

  async count() {
    const result = await this.pool.query('SELECT COUNT(*) FROM cliente');
    return parseInt(result.rows[0].count);
  }
}