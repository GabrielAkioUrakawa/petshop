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
exports.FornecedorService = void 0;
const common_1 = require("@nestjs/common");
const fornecedor_repository_1 = require("./fornecedor.repository");
let FornecedorService = class FornecedorService {
    fornecedorRepository;
    constructor(fornecedorRepository) {
        this.fornecedorRepository = fornecedorRepository;
    }
    async create(cnpj, nome, email, telefone, categoria) {
        return this.fornecedorRepository.create(cnpj, nome, email, telefone, categoria);
    }
    async findAll() {
        return this.fornecedorRepository.findAll();
    }
    async findByCnpj(cnpj) {
        return this.fornecedorRepository.findByCnpj(cnpj);
    }
    async update(cnpj, nome, email, telefone, categoria) {
        return this.fornecedorRepository.update(cnpj, nome, email, telefone, categoria);
    }
    async delete(cnpj) {
        return this.fornecedorRepository.delete(cnpj);
    }
};
exports.FornecedorService = FornecedorService;
exports.FornecedorService = FornecedorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [fornecedor_repository_1.FornecedorRepository])
], FornecedorService);
//# sourceMappingURL=fornecedor.service.js.map