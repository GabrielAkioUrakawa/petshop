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
    async create(cpf, dataCadastro) {
        await this.pool.query('INSERT INTO cliente (cpf, data_cadastro) VALUES ($1, $2)', [cpf, dataCadastro]);
    }
    async findAll() {
        const result = await this.pool.query('SELECT * FROM cliente');
        return result.rows;
    }
    async findByCpf(cpf) {
        const result = await this.pool.query('SELECT * FROM cliente WHERE cpf = $1', [cpf]);
        return result.rows[0];
    }
    async update(cpf, dataCadastro) {
        await this.pool.query('UPDATE cliente SET data_cadastro = $2 WHERE cpf = $1', [cpf, dataCadastro]);
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