import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class CompraRepository {
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
    dataHora: string;
    meio: string;
    parcela: number;
    status: string;
    cpfCliente: string;
    produtos?: Array<{
      idProduto: number;
      quantidade: number;
      precoUnitario: number;
      servicoCpf?: string;
      servicoDataHora?: string;
    }>;
  }) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');

      // Insere a compra
      const compraResult = await client.query(
        `INSERT INTO compra (data_hora, meio, parcela, status, cpf_cliente)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id_compra`,
        [data.dataHora, data.meio, data.parcela, data.status, data.cpfCliente]
      );

      const idCompra = compraResult.rows[0].id_compra;

      // Se houver produtos, insere na tabela COMPRA_INCLUI e atualiza o estoque
      if (data.produtos && data.produtos.length > 0) {
        for (const produto of data.produtos) {
          // Insere o produto na compra
          await client.query(
            `INSERT INTO compra_inclui (id_compra, id_produto, quantidade, preco_unitario, servico_cpf, servico_data_hora)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              idCompra,
              produto.idProduto,
              produto.quantidade,
              produto.precoUnitario,
              produto.servicoCpf || null,
              produto.servicoDataHora || null
            ]
          );

          // Atualiza o estoque do produto (diminui a quantidade)
          await client.query(
            `UPDATE produto
             SET qtde_estoque = qtde_estoque - $1
             WHERE id_produto = $2`,
            [produto.quantidade, produto.idProduto]
          );
        }
      }

      await client.query('COMMIT');
      return { id_compra: idCompra };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async findAll() {
    const result = await this.pool.query('SELECT * FROM compra');
    return result.rows;
  }

  async findById(idCompra: number) {
    const result = await this.pool.query(
      'SELECT * FROM compra WHERE id_compra = $1',
      [idCompra]
    );
    return result.rows[0];
  }

  async update(
    idCompra: number,
    dataHora: string,
    meio: string,
    parcela: number,
    status: string,
    cpfCliente: string
  ) {
    await this.pool.query(
      `UPDATE compra SET data_hora = $2, meio = $3, parcela = $4, status = $5, cpf_cliente = $6
       WHERE id_compra = $1`,
      [idCompra, dataHora, meio, parcela, status, cpfCliente]
    );
  }

  async delete(idCompra: number) {
    await this.pool.query('DELETE FROM compra WHERE id_compra = $1', [idCompra]);
  }

  async findByDateRange(dataInicio: string, dataFinal: string) {
    const result = await this.pool.query(
      `SELECT C.ID_COMPRA, P.NOME AS NOME_CLIENTE, P.CPF AS CPF_CLIENTE, C.DATA_HORA,
              C.MEIO AS FORMA_PAGAMENTO, C.STATUS, SUM(CI.QUANTIDADE) AS TOTAL_PRODUTOS_ADQUIRIDOS
       FROM COMPRA C
       JOIN CLIENTE CL ON C.CPF_CLIENTE = CL.CPF
       JOIN PESSOA P ON CL.CPF = P.CPF
       JOIN COMPRA_INCLUI CI ON C.ID_COMPRA = CI.ID_COMPRA
       WHERE C.DATA_HORA BETWEEN $1 AND $2
       GROUP BY C.ID_COMPRA, P.NOME, P.CPF, C.DATA_HORA, C.MEIO, C.STATUS
       ORDER BY C.DATA_HORA`,
      [dataInicio, dataFinal]
    );
    return result.rows;
  }
}
