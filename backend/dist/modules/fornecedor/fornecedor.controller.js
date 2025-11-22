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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FornecedorController = void 0;
const common_1 = require("@nestjs/common");
const fornecedor_service_1 = require("./fornecedor.service");
let FornecedorController = class FornecedorController {
    fornecedorService;
    constructor(fornecedorService) {
        this.fornecedorService = fornecedorService;
    }
    async findAll() {
        return this.fornecedorService.findAll();
    }
    async findByCnpj(cnpj) {
        return this.fornecedorService.findByCnpj(cnpj);
    }
    async create(body) {
        return this.fornecedorService.create(body.cnpj, body.nome, body.email, body.telefone, body.categoria);
    }
    async update(cnpj, body) {
        return this.fornecedorService.update(cnpj, body.nome, body.email, body.telefone, body.categoria);
    }
    async delete(cnpj) {
        return this.fornecedorService.delete(cnpj);
    }
};
exports.FornecedorController = FornecedorController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FornecedorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':cnpj'),
    __param(0, (0, common_1.Param)('cnpj')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FornecedorController.prototype, "findByCnpj", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FornecedorController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':cnpj'),
    __param(0, (0, common_1.Param)('cnpj')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FornecedorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':cnpj'),
    __param(0, (0, common_1.Param)('cnpj')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FornecedorController.prototype, "delete", null);
exports.FornecedorController = FornecedorController = __decorate([
    (0, common_1.Controller)('fornecedor'),
    __metadata("design:paramtypes", [fornecedor_service_1.FornecedorService])
], FornecedorController);
//# sourceMappingURL=fornecedor.controller.js.map