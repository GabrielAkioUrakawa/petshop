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
exports.FuncionarioController = void 0;
const common_1 = require("@nestjs/common");
const funcionario_service_1 = require("./funcionario.service");
let FuncionarioController = class FuncionarioController {
    funcionarioService;
    constructor(funcionarioService) {
        this.funcionarioService = funcionarioService;
    }
    async findAll() {
        return this.funcionarioService.findAll();
    }
    async findEmployeeOfTheMonth(mes, ano) {
        return this.funcionarioService.findEmployeeOfTheMonth(parseInt(mes), parseInt(ano));
    }
    async findWithServiceCount() {
        return this.funcionarioService.findWithServiceCount();
    }
    async findByCpf(cpf) {
        return this.funcionarioService.findByCpf(cpf);
    }
    async create(body) {
        return this.funcionarioService.create(body);
    }
    async update(cpf, body) {
        return this.funcionarioService.update(cpf, body);
    }
    async delete(cpf) {
        return this.funcionarioService.delete(cpf);
    }
};
exports.FuncionarioController = FuncionarioController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('employee-of-the-month'),
    __param(0, (0, common_1.Query)('mes')),
    __param(1, (0, common_1.Query)('ano')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "findEmployeeOfTheMonth", null);
__decorate([
    (0, common_1.Get)('with-service-count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "findWithServiceCount", null);
__decorate([
    (0, common_1.Get)(':cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "findByCpf", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "delete", null);
exports.FuncionarioController = FuncionarioController = __decorate([
    (0, common_1.Controller)('funcionario'),
    __metadata("design:paramtypes", [funcionario_service_1.FuncionarioService])
], FuncionarioController);
//# sourceMappingURL=funcionario.controller.js.map