"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let FuncionarioRepository = class FuncionarioRepository {
    pool;
    constructor() {
        this.pool = new pg_1.Pool({
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            ssl: false,
        });
    }
    async create(data) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(`INSERT INTO pessoa (cpf, nome, email, telefone, endereco)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (cpf) DO UPDATE SET
           nome = EXCLUDED.nome,
           email = EXCLUDED.email,
           telefone = EXCLUDED.telefone,
           endereco = EXCLUDED.endereco`, [data.cpf, data.nome, data.email, data.telefone, data.endereco]);
            await client.query('INSERT INTO funcionario (cpf, especialidade) VALUES ($1, $2)', [data.cpf, data.especialidade]);
            await client.query('COMMIT');
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }
    async findAll() {
        const result = await this.pool.query(`SELECT F.CPF, F.ESPECIALIDADE, P.NOME, P.TELEFONE, P.ENDERECO
       FROM FUNCIONARIO F
       JOIN PESSOA P ON F.CPF = P.CPF
       ORDER BY P.NOME`);
        return result.rows;
    }
    async findByCpf(cpf) {
        const result = await this.pool.query(`SELECT F.CPF, F.ESPECIALIDADE, P.NOME, P.TELEFONE, P.ENDERECO
       FROM FUNCIONARIO F
       JOIN PESSOA P ON F.CPF = P.CPF
       WHERE F.CPF = $1`, [cpf]);
        return result.rows[0];
    }
    async update(cpf, data) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const pessoaFields = [];
            const pessoaValues = [];
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
            if (pessoaFields.length > 0) {
                pessoaValues.push(cpf);
                await client.query(`UPDATE pessoa SET ${pessoaFields.join(', ')} WHERE cpf = $${pessoaParamCount}`, pessoaValues);
            }
            if (data.especialidade !== undefined) {
                await client.query('UPDATE funcionario SET especialidade = $1 WHERE cpf = $2', [data.especialidade, cpf]);
            }
            await client.query('COMMIT');
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }
    async delete(cpf) {
        await this.pool.query('DELETE FROM funcionario WHERE cpf = $1', [cpf]);
    }
    async findWithServiceCount() {
        const result = await this.pool.query(`
      SELECT P.NOME AS FUNCIONARIO_NOME, P.CPF, P.EMAIL, P.TELEFONE, P.ENDERECO, F.ESPECIALIDADE, COUNT(R.SERVICO_CPF) AS TOTAL_SERVICOS
      FROM FUNCIONARIO F 
      JOIN PESSOA P ON F.CPF = P.CPF 
      LEFT JOIN REALIZA R ON F.CPF = R.FUNCIONARIO_CPF 
      LEFT JOIN SERVICO S ON R.SERVICO_CPF = S.SERVICO_CPF
      GROUP BY P.NOME, F.ESPECIALIDADE, P.CPF
      ORDER BY TOTAL_SERVICOS DESC

    `);
        return result.rows;
    }
    async findEmployeeOfTheMonth(mes, ano) {
        const result = await this.pool.query(`SELECT P.NOME AS FUNCIONARIO_NOME, F.CPF AS FUNCIONARIO_CPF, F.ESPECIALIDADE,
              COUNT(S.SERVICO_CPF) AS TOTAL_ATENDIMENTOS
       FROM FUNCIONARIO F
       JOIN PESSOA P ON F.CPF = P.CPF
       JOIN SERVICO S ON F.CPF = S.FUNCIONARIO_CPF
       WHERE EXTRACT(MONTH FROM S.DATA_HORA) = $1
         AND EXTRACT(YEAR FROM S.DATA_HORA) = $2
       GROUP BY P.NOME, F.CPF, F.ESPECIALIDADE
       ORDER BY TOTAL_ATENDIMENTOS DESC
       LIMIT 1`, [mes, ano]);
        return result.rows[0];
    }
};
exports.FuncionarioRepository = FuncionarioRepository;
exports.FuncionarioRepository = FuncionarioRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FuncionarioRepository);
//# sourceMappingURL=funcionario.repository.js.map