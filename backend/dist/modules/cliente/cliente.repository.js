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
exports.ClienteRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let ClienteRepository = class ClienteRepository {
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
            await client.query('INSERT INTO cliente (cpf, data_cadastro) VALUES ($1, $2)', [data.cpf, data.dataCadastro]);
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
        const result = await this.pool.query(`SELECT CL.CPF, CL.DATA_CADASTRO, P.NOME, P.TELEFONE, P.ENDERECO, P.EMAIL
       FROM CLIENTE CL
       JOIN PESSOA P ON CL.CPF = P.CPF
       ORDER BY P.NOME`);
        return result.rows;
    }
    async findByCpf(cpf) {
        const result = await this.pool.query(`SELECT CL.CPF, CL.DATA_CADASTRO, P.NOME, P.TELEFONE, P.ENDERECO
       FROM CLIENTE CL
       JOIN PESSOA P ON CL.CPF = P.CPF
       WHERE CL.CPF = $1`, [cpf]);
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
            if (data.dataCadastro !== undefined) {
                await client.query('UPDATE cliente SET data_cadastro = $1 WHERE cpf = $2', [data.dataCadastro, cpf]);
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
        await this.pool.query('DELETE FROM cliente WHERE cpf = $1', [cpf]);
    }
    async findInactive(dataLimite) {
        const result = await this.pool.query(`SELECT P.NOME AS NOME_CLIENTE, P.CPF AS CPF_CLIENTE, MAX(C.DATA_HORA) AS DATA_ULTIMA_COMPRA
       FROM CLIENTE CL
       JOIN PESSOA P ON CL.CPF = P.CPF
       LEFT JOIN COMPRA C ON CL.CPF = C.CPF_CLIENTE
       GROUP BY P.NOME, P.CPF
       HAVING MAX(C.DATA_HORA) IS NULL OR MAX(C.DATA_HORA) < $1`, [dataLimite]);
        return result.rows;
    }
    async count() {
        const result = await this.pool.query('SELECT COUNT(*) FROM cliente');
        return parseInt(result.rows[0].count);
    }
};
exports.ClienteRepository = ClienteRepository;
exports.ClienteRepository = ClienteRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ClienteRepository);
//# sourceMappingURL=cliente.repository.js.map