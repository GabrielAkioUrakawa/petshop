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
exports.FuncionarioService = void 0;
const common_1 = require("@nestjs/common");
const funcionario_repository_1 = require("./funcionario.repository");
let FuncionarioService = class FuncionarioService {
    funcionarioRepository;
    constructor(funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }
    async create(cpf, especialidade) {
        return this.funcionarioRepository.create(cpf, especialidade);
    }
    async findAll() {
        return this.funcionarioRepository.findAll();
    }
    async findByCpf(cpf) {
        return this.funcionarioRepository.findByCpf(cpf);
    }
    async update(cpf, especialidade) {
        return this.funcionarioRepository.update(cpf, especialidade);
    }
    async delete(cpf) {
        return this.funcionarioRepository.delete(cpf);
    }
    async findWithServiceCount() {
        return this.funcionarioRepository.findWithServiceCount();
    }
};
exports.FuncionarioService = FuncionarioService;
exports.FuncionarioService = FuncionarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [funcionario_repository_1.FuncionarioRepository])
], FuncionarioService);
//# sourceMappingURL=funcionario.service.js.map