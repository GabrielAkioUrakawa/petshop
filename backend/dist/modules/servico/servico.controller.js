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
exports.ServicoController = void 0;
const common_1 = require("@nestjs/common");
const servico_service_1 = require("./servico.service");
let ServicoController = class ServicoController {
    servicoService;
    constructor(servicoService) {
        this.servicoService = servicoService;
    }
    async findAll() {
        return this.servicoService.findAll();
    }
    async findById(servicoCpf, dataHora) {
        return this.servicoService.findById(servicoCpf, dataHora);
    }
    async create(body) {
        return this.servicoService.create(body.servicoCpf, body.dataHora, body.preco, body.tipo, body.descricao, body.funcionarioCpf, body.animalNome, body.animalCpf);
    }
    async update(servicoCpf, dataHora, body) {
        return this.servicoService.update(servicoCpf, dataHora, body.preco, body.tipo, body.descricao, body.funcionarioCpf, body.animalNome, body.animalCpf);
    }
    async delete(servicoCpf, dataHora) {
        return this.servicoService.delete(servicoCpf, dataHora);
    }
};
exports.ServicoController = ServicoController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':servicoCpf/:dataHora'),
    __param(0, (0, common_1.Param)('servicoCpf')),
    __param(1, (0, common_1.Param)('dataHora')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ServicoController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServicoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':servicoCpf/:dataHora'),
    __param(0, (0, common_1.Param)('servicoCpf')),
    __param(1, (0, common_1.Param)('dataHora')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ServicoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':servicoCpf/:dataHora'),
    __param(0, (0, common_1.Param)('servicoCpf')),
    __param(1, (0, common_1.Param)('dataHora')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ServicoController.prototype, "delete", null);
exports.ServicoController = ServicoController = __decorate([
    (0, common_1.Controller)('servico'),
    __metadata("design:paramtypes", [servico_service_1.ServicoService])
], ServicoController);
//# sourceMappingURL=servico.controller.js.map