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
    async create(cpf, especialidade) {
        await this.pool.query('INSERT INTO funcionario (cpf, especialidade) VALUES ($1, $2)', [cpf, especialidade]);
    }
    async findAll() {
        const result = await this.pool.query('SELECT * FROM funcionario');
        return result.rows;
    }
    async findByCpf(cpf) {
        const result = await this.pool.query('SELECT * FROM funcionario WHERE cpf = $1', [cpf]);
        return result.rows[0];
    }
    async update(cpf, especialidade) {
        await this.pool.query('UPDATE funcionario SET especialidade = $2 WHERE cpf = $1', [cpf, especialidade]);
    }
    async delete(cpf) {
        await this.pool.query('DELETE FROM funcionario WHERE cpf = $1', [cpf]);
    }
    async findWithServiceCount() {
        const result = await this.pool.query(`
      SELECT P.NOME AS FUNCIONARIO_NOME, F.ESPECIALIDADE, COUNT(S.SERVICO_CPF) AS TOTAL_SERVICO
      FROM FUNCIONARIO F
      JOIN PESSOA P ON F.CPF = P.CPF
      JOIN SERVICO S ON F.CPF = S.FUNCIONARIO_CPF
      GROUP BY P.NOME, F.ESPECIALIDADE
      ORDER BY TOTAL_SERVICO DESC
    `);
        return result.rows;
    }
};
exports.FuncionarioRepository = FuncionarioRepository;
exports.FuncionarioRepository = FuncionarioRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FuncionarioRepository);
//# sourceMappingURL=funcionario.repository.js.map