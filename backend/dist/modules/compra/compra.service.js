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
exports.CompraService = void 0;
const common_1 = require("@nestjs/common");
const compra_repository_1 = require("./compra.repository");
let CompraService = class CompraService {
    compraRepository;
    constructor(compraRepository) {
        this.compraRepository = compraRepository;
    }
    async create(data) {
        return this.compraRepository.create(data);
    }
    async findAll() {
        return this.compraRepository.findAll();
    }
    async findById(idCompra) {
        return this.compraRepository.findById(idCompra);
    }
    async update(idCompra, dataHora, meio, parcela, status, cpfCliente) {
        return this.compraRepository.update(idCompra, dataHora, meio, parcela, status, cpfCliente);
    }
    async delete(idCompra) {
        return this.compraRepository.delete(idCompra);
    }
    async findByDateRange(dataInicio, dataFinal) {
        return this.compraRepository.findByDateRange(dataInicio, dataFinal);
    }
};
exports.CompraService = CompraService;
exports.CompraService = CompraService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [compra_repository_1.CompraRepository])
], CompraService);
//# sourceMappingURL=compra.service.js.map