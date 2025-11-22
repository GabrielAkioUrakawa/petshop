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
exports.FornecedorRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let FornecedorRepository = class FornecedorRepository {
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
    async create(cnpj, nome, email, telefone, categoria) {
        await this.pool.query(`INSERT INTO fornecedor (cnpj, nome, email, telefone, categoria)
       VALUES ($1, $2, $3, $4, $5)`, [cnpj, nome, email, telefone, categoria]);
    }
    async findAll() {
        const result = await this.pool.query('SELECT * FROM fornecedor');
        return result.rows;
    }
    async findByCnpj(cnpj) {
        const result = await this.pool.query('SELECT * FROM fornecedor WHERE cnpj = $1', [cnpj]);
        return result.rows[0];
    }
    async update(cnpj, nome, email, telefone, categoria) {
        await this.pool.query(`UPDATE fornecedor SET nome = $2, email = $3, telefone = $4, categoria = $5
       WHERE cnpj = $1`, [cnpj, nome, email, telefone, categoria]);
    }
    async delete(cnpj) {
        await this.pool.query('DELETE FROM fornecedor WHERE cnpj = $1', [cnpj]);
    }
};
exports.FornecedorRepository = FornecedorRepository;
exports.FornecedorRepository = FornecedorRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FornecedorRepository);
//# sourceMappingURL=fornecedor.repository.js.map