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
exports.CompraController = void 0;
const common_1 = require("@nestjs/common");
const compra_service_1 = require("./compra.service");
let CompraController = class CompraController {
    compraService;
    constructor(compraService) {
        this.compraService = compraService;
    }
    async findAll() {
        return this.compraService.findAll();
    }
    async findByDateRange(dataInicio, dataFinal) {
        return this.compraService.findByDateRange(dataInicio, dataFinal);
    }
    async findById(idCompra) {
        return this.compraService.findById(Number(idCompra));
    }
    async create(body) {
        return this.compraService.create(body.dataHora, body.meio, body.parcela, body.status, body.cpfCliente);
    }
    async update(idCompra, body) {
        return this.compraService.update(Number(idCompra), body.dataHora, body.meio, body.parcela, body.status, body.cpfCliente);
    }
    async delete(idCompra) {
        return this.compraService.delete(Number(idCompra));
    }
};
exports.CompraController = CompraController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompraController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-date-range'),
    __param(0, (0, common_1.Query)('dataInicio')),
    __param(1, (0, common_1.Query)('dataFinal')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CompraController.prototype, "findByDateRange", null);
__decorate([
    (0, common_1.Get)(':idCompra'),
    __param(0, (0, common_1.Param)('idCompra')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompraController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompraController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':idCompra'),
    __param(0, (0, common_1.Param)('idCompra')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CompraController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':idCompra'),
    __param(0, (0, common_1.Param)('idCompra')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompraController.prototype, "delete", null);
exports.CompraController = CompraController = __decorate([
    (0, common_1.Controller)('compra'),
    __metadata("design:paramtypes", [compra_service_1.CompraService])
], CompraController);
//# sourceMappingURL=compra.controller.js.map