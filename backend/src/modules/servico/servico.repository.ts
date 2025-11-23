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

  async create(data: {
    servicoCpf: string;
    funcionarioCpf: string;
    dataHora: string;
    preco: number;
    tipo: string;
    descricao: string;
    animalNome: string;
    animalCpf: string;
    produtos?: Array<{
      idProduto: number;
      quantidade: number;
      precoUnitario: number;
      idCompra: number;
    }>;
  }) {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');

      // Valida se o funcionário existe e tem a especialidade correta
      const funcionarioResult = await client.query(
        `SELECT especialidade FROM funcionario WHERE cpf = $1`,
        [data.funcionarioCpf]
      );

      if (funcionarioResult.rows.length === 0) {
        throw new Error('Funcionário não encontrado');
      }

      const especialidade = funcionarioResult.rows[0].especialidade;
      const tipoServicoLower = data.tipo.toLowerCase();

      // Mapeamento de tipos de serviço para especialidades
      const especialidadesPorTipo: Record<string, string[]> = {
        consulta: ['Veterinário'],
        cirurgia: ['Veterinário'],
        vacinação: ['Veterinário'],
        'avaliação': ['Veterinário'],
        'exame': ['Veterinário'],
        banho: ['Banhista', 'Tosador'],
        tosa: ['Tosador'],
      };

      // Verifica se o tipo de serviço requer alguma especialidade específica
      let especialidadesPermitidas: string[] = [];
      for (const [tipoKey, especialidades] of Object.entries(especialidadesPorTipo)) {
        if (tipoServicoLower.includes(tipoKey)) {
          especialidadesPermitidas = especialidades;
          break;
        }
      }

      if (especialidadesPermitidas.length > 0 && !especialidadesPermitidas.includes(especialidade)) {
        throw new Error(
          `Funcionário com especialidade '${especialidade}' não pode realizar serviço do tipo '${data.tipo}'. Especialidades permitidas: ${especialidadesPermitidas.join(', ')}`
        );
      }

      // Insere o serviço
      await client.query(
        `INSERT INTO servico (servico_cpf, data_hora, preco, tipo, descricao, animal_nome, animal_cpf)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [data.servicoCpf, data.dataHora, data.preco, data.tipo, data.descricao, data.animalNome, data.animalCpf]
      );

      // Insere na tabela REALIZA
      await client.query(
        `INSERT INTO realiza (funcionario_cpf, servico_cpf, servico_data_hora)
         VALUES ($1, $2, $3)`,
        [data.funcionarioCpf, data.servicoCpf, data.dataHora]
      );

      // Se houver produtos, insere/atualiza na tabela COMPRA_INCLUI e atualiza o estoque
      if (data.produtos && data.produtos.length > 0) {
        for (const produto of data.produtos) {
          // Atualiza a relação COMPRA_INCLUI para vincular com o serviço
          await client.query(
            `INSERT INTO compra_inclui (id_compra, id_produto, quantidade, preco_unitario, servico_cpf, servico_data_hora)
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (id_compra, id_produto) DO UPDATE SET
               servico_cpf = EXCLUDED.servico_cpf,
               servico_data_hora = EXCLUDED.servico_data_hora`,
            [
              produto.idCompra,
              produto.idProduto,
              produto.quantidade,
              produto.precoUnitario,
              data.servicoCpf,
              data.dataHora
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
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async findAll() {
    const result = await this.pool.query(
      `SELECT S.SERVICO_CPF, S.DATA_HORA, S.PRECO, S.TIPO, S.DESCRICAO,
              S.ANIMAL_NOME, S.ANIMAL_CPF, A.ESPECIE AS ANIMAL_ESPECIE,
              PC.NOME AS CLIENTE_NOME,
              PF.NOME AS FUNCIONARIO_NOME, F.ESPECIALIDADE AS FUNCIONARIO_ESPECIALIDADE
       FROM SERVICO S
       JOIN ANIMAL A ON S.ANIMAL_NOME = A.NOME AND S.ANIMAL_CPF = A.DONO_CPF
       JOIN PESSOA PC ON A.DONO_CPF = PC.CPF
       LEFT JOIN REALIZA R ON S.SERVICO_CPF = R.SERVICO_CPF AND S.DATA_HORA = R.SERVICO_DATA_HORA
       LEFT JOIN FUNCIONARIO F ON R.FUNCIONARIO_CPF = F.CPF
       LEFT JOIN PESSOA PF ON F.CPF = PF.CPF
       ORDER BY S.DATA_HORA DESC`
    );
    return result.rows;
  }

  async findById(servicoCpf: string, dataHora: string) {
    const result = await this.pool.query(
      `SELECT S.SERVICO_CPF, S.DATA_HORA, S.PRECO, S.TIPO, S.DESCRICAO,
              S.ANIMAL_NOME, S.ANIMAL_CPF, A.ESPECIE AS ANIMAL_ESPECIE, A.RACA AS ANIMAL_RACA,
              PC.NOME AS CLIENTE_NOME, PC.TELEFONE AS CLIENTE_TELEFONE,
              PF.NOME AS FUNCIONARIO_NOME, F.ESPECIALIDADE AS FUNCIONARIO_ESPECIALIDADE, R.FUNCIONARIO_CPF
       FROM SERVICO S
       JOIN ANIMAL A ON S.ANIMAL_NOME = A.NOME AND S.ANIMAL_CPF = A.DONO_CPF
       JOIN PESSOA PC ON A.DONO_CPF = PC.CPF
       LEFT JOIN REALIZA R ON S.SERVICO_CPF = R.SERVICO_CPF AND S.DATA_HORA = R.SERVICO_DATA_HORA
       LEFT JOIN FUNCIONARIO F ON R.FUNCIONARIO_CPF = F.CPF
       LEFT JOIN PESSOA PF ON F.CPF = PF.CPF
       WHERE S.SERVICO_CPF = $1 AND S.DATA_HORA = $2`,
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
    animalNome: string,
    animalCpf: string
  ) {
    await this.pool.query(
      `UPDATE servico SET preco = $3, tipo = $4, descricao = $5, animal_nome = $6, animal_cpf = $7
       WHERE servico_cpf = $1 AND data_hora = $2`,
      [servicoCpf, dataHora, preco, tipo, descricao, animalNome, animalCpf]
    );
  }

  async delete(servicoCpf: string, dataHora: string) {
    await this.pool.query(
      'DELETE FROM servico WHERE servico_cpf = $1 AND data_hora = $2',
      [servicoCpf, dataHora]
    );
  }

  async findByFornecedor(nomeFornecedor: string) {
    const result = await this.pool.query(
      `SELECT F.NOME AS NOME_FORNECEDOR, P.DESCRICAO AS NOME_PRODUTO, S.TIPO AS TIPO_SERVICO, S.DATA_HORA
       FROM FORNECEDOR F
       JOIN PRODUTO P ON F.CNPJ = P.FORN_CNPJ
       JOIN COMPRA_INCLUI CI ON P.ID_PRODUTO = CI.ID_PRODUTO
       JOIN SERVICO S ON CI.SERVICO_CPF = S.SERVICO_CPF AND CI.SERVICO_DATA_HORA = S.DATA_HORA
       WHERE F.NOME = $1`,
      [nomeFornecedor]
    );
    return result.rows;
  }

  async findByDate(dataEspecifica: string) {
    const result = await this.pool.query(
      `SELECT PF.NOME AS NOME_FUNCIONARIO, F.ESPECIALIDADE, S.TIPO AS TIPO_SERVICO, S.DATA_HORA,
              A.NOME AS NOME_ANIMAL, PC.NOME AS DONO_ANIMAL
       FROM SERVICO S
       JOIN ANIMAL A ON S.ANIMAL_NOME = A.NOME AND S.ANIMAL_CPF = A.DONO_CPF
       JOIN CLIENTE CL ON A.DONO_CPF = CL.CPF
       JOIN PESSOA PC ON CL.CPF = PC.CPF
       LEFT JOIN REALIZA R ON S.SERVICO_CPF = R.SERVICO_CPF AND S.DATA_HORA = R.SERVICO_DATA_HORA
       LEFT JOIN FUNCIONARIO F ON R.FUNCIONARIO_CPF = F.CPF
       LEFT JOIN PESSOA PF ON F.CPF = PF.CPF
       WHERE DATE(S.DATA_HORA) = DATE($1)
       ORDER BY S.DATA_HORA`,
      [dataEspecifica]
    );
    return result.rows;
  }

  async count() {
    const result = await this.pool.query('SELECT COUNT(*) FROM servico');
    return parseInt(result.rows[0].count);
  }

  async findRevenueByMonth(mes: number, ano: number) {
    const result = await this.pool.query(
      `SELECT EXTRACT(MONTH FROM S.DATA_HORA) AS MES,
              EXTRACT(YEAR FROM S.DATA_HORA) AS ANO,
              SUM(S.PRECO) AS FATURAMENTO_SERVICOS,
              COALESCE(SUM(CI.QUANTIDADE * P.PRECO_VENDA), 0) AS FATURAMENTO_PRODUTOS,
              SUM(S.PRECO) + COALESCE(SUM(CI.QUANTIDADE * P.PRECO_VENDA), 0) AS FATURAMENTO_TOTAL,
              COUNT(DISTINCT S.SERVICO_CPF) AS TOTAL_SERVICOS
       FROM SERVICO S
       LEFT JOIN COMPRA_INCLUI CI ON S.SERVICO_CPF = CI.SERVICO_CPF
                                  AND S.DATA_HORA = CI.SERVICO_DATA_HORA
       LEFT JOIN PRODUTO P ON CI.ID_PRODUTO = P.ID_PRODUTO
       WHERE EXTRACT(MONTH FROM S.DATA_HORA) = $1
         AND EXTRACT(YEAR FROM S.DATA_HORA) = $2
       GROUP BY EXTRACT(MONTH FROM S.DATA_HORA), EXTRACT(YEAR FROM S.DATA_HORA)`,
      [mes, ano]
    );
    return result.rows[0];
  }
}