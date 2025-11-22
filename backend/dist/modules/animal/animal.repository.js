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
exports.AnimalRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let AnimalRepository = class AnimalRepository {
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
    async create(donoCpf, nome, raca, especie, sexo, peso, dataNascimento) {
        await this.pool.query(`INSERT INTO animal (dono_cpf, nome, raca, especie, sexo, peso, data_nascimento)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`, [donoCpf, nome, raca, especie, sexo, peso, dataNascimento]);
    }
    async findAll() {
        const result = await this.pool.query('SELECT * FROM animal');
        return result.rows;
    }
    async findByNomeAndDonoCpf(nome, donoCpf) {
        const result = await this.pool.query('SELECT * FROM animal WHERE nome = $1 AND dono_cpf = $2', [nome, donoCpf]);
        return result.rows[0];
    }
    async update(nome, donoCpf, raca, especie, sexo, peso, dataNascimento) {
        await this.pool.query(`UPDATE animal SET raca = $3, especie = $4, sexo = $5, peso = $6, data_nascimento = $7
       WHERE nome = $1 AND dono_cpf = $2`, [nome, donoCpf, raca, especie, sexo, peso, dataNascimento]);
    }
    async delete(nome, donoCpf) {
        await this.pool.query('DELETE FROM animal WHERE nome = $1 AND dono_cpf = $2', [nome, donoCpf]);
    }
};
exports.AnimalRepository = AnimalRepository;
exports.AnimalRepository = AnimalRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AnimalRepository);
//# sourceMappingURL=animal.repository.js.map