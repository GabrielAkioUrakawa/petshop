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
exports.ServicoRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let ServicoRepository = class ServicoRepository {
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
    async create(dataHora, preco, tipo, descricao, clienteCpf, funcionarioCpf, animalCpf) {
        await this.pool.query(`INSERT INTO servico (data_hora, preco, tipo, descricao, cliente_cpf, funcionario_cpf, animal_cpf)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`, [dataHora, preco, tipo, descricao, clienteCpf, funcionarioCpf, animalCpf]);
    }
    async findAll() {
        const result = await this.pool.query('SELECT * FROM servico');
        return result.rows;
    }
    async findById(clienteCpf, dataHora) {
        const result = await this.pool.query('SELECT * FROM servico WHERE cliente_cpf = $1 AND data_hora = $2', [clienteCpf, dataHora]);
        return result.rows[0];
    }
    async update(clienteCpf, dataHora, preco, tipo, descricao, funcionarioCpf, animalCpf) {
        await this.pool.query(`UPDATE servico SET preco = $3, tipo = $4, descricao = $5, funcionario_cpf = $6, animal_cpf = $7
       WHERE cliente_cpf = $1 AND data_hora = $2`, [clienteCpf, dataHora, preco, tipo, descricao, funcionarioCpf, animalCpf]);
    }
    async delete(clienteCpf, dataHora) {
        await this.pool.query('DELETE FROM servico WHERE cliente_cpf = $1 AND data_hora = $2', [clienteCpf, dataHora]);
    }
};
exports.ServicoRepository = ServicoRepository;
exports.ServicoRepository = ServicoRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ServicoRepository);
//# sourceMappingURL=servico.repository.js.map