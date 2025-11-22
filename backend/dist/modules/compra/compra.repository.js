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
exports.CompraRepository = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let CompraRepository = class CompraRepository {
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
    async create(dataHora, meio, parcela, status, cpfCliente) {
        await this.pool.query(`INSERT INTO compra (data_hora, meio, parcela, status, cpf_cliente)
       VALUES ($1, $2, $3, $4, $5)`, [dataHora, meio, parcela, status, cpfCliente]);
    }
    async findAll() {
        const result = await this.pool.query('SELECT * FROM compra');
        return result.rows;
    }
    async findById(idCompra) {
        const result = await this.pool.query('SELECT * FROM compra WHERE id_compra = $1', [idCompra]);
        return result.rows[0];
    }
    async update(idCompra, dataHora, meio, parcela, status, cpfCliente) {
        await this.pool.query(`UPDATE compra SET data_hora = $2, meio = $3, parcela = $4, status = $5, cpf_cliente = $6
       WHERE id_compra = $1`, [idCompra, dataHora, meio, parcela, status, cpfCliente]);
    }
    async delete(idCompra) {
        await this.pool.query('DELETE FROM compra WHERE id_compra = $1', [idCompra]);
    }
    async findByDateRange(dataInicio, dataFinal) {
        const result = await this.pool.query(`SELECT C.ID_COMPRA, P.NOME AS NOME_CLIENTE, P.CPF AS CPF_CLIENTE, C.DATA_HORA,
              C.MEIO AS FORMA_PAGAMENTO, C.STATUS, SUM(CI.QUANTIDADE) AS TOTAL_PRODUTOS_ADQUIRIDOS
       FROM COMPRA C
       JOIN CLIENTE CL ON C.CPF_CLIENTE = CL.CPF
       JOIN PESSOA P ON CL.CPF = P.CPF
       JOIN COMPRA_INCLUI CI ON C.ID_COMPRA = CI.ID_COMPRA
       WHERE C.DATA_HORA BETWEEN $1 AND $2
       GROUP BY C.ID_COMPRA, P.NOME, P.CPF, C.DATA_HORA, C.MEIO, C.STATUS
       ORDER BY C.DATA_HORA`, [dataInicio, dataFinal]);
        return result.rows;
    }
};
exports.CompraRepository = CompraRepository;
exports.CompraRepository = CompraRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CompraRepository);
//# sourceMappingURL=compra.repository.js.map