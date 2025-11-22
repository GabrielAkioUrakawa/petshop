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
exports.ClienteController = void 0;
const common_1 = require("@nestjs/common");
const cliente_service_1 = require("./cliente.service");
let ClienteController = class ClienteController {
    clienteService;
    constructor(clienteService) {
        this.clienteService = clienteService;
    }
    async findAll() {
        return this.clienteService.findAll();
    }
    async findByCpf(cpf) {
        return this.clienteService.findByCpf(cpf);
    }
    async create(body) {
        return this.clienteService.create(body.cpf, body.dataCadastro);
    }
    async update(cpf, body) {
        return this.clienteService.update(cpf, body.dataCadastro);
    }
    async delete(cpf) {
        return this.clienteService.delete(cpf);
    }
};
exports.ClienteController = ClienteController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "findByCpf", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "delete", null);
exports.ClienteController = ClienteController = __decorate([
    (0, common_1.Controller)('cliente'),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService])
], ClienteController);
//# sourceMappingURL=cliente.controller.js.map