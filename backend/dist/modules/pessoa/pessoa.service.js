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
exports.PessoaService = void 0;
const common_1 = require("@nestjs/common");
const pessoa_repository_1 = require("./pessoa.repository");
let PessoaService = class PessoaService {
    pessoaRepository;
    constructor(pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }
    async create(cpf, nome, email, telefone, endereco) {
        return this.pessoaRepository.create(cpf, nome, email, telefone, endereco);
    }
    async findAll() {
        return this.pessoaRepository.findAll();
    }
    async findByCpf(cpf) {
        return this.pessoaRepository.findByCpf(cpf);
    }
    async update(cpf, nome, email, telefone, endereco) {
        return this.pessoaRepository.update(cpf, nome, email, telefone, endereco);
    }
    async delete(cpf) {
        return this.pessoaRepository.delete(cpf);
    }
};
exports.PessoaService = PessoaService;
exports.PessoaService = PessoaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pessoa_repository_1.PessoaRepository])
], PessoaService);
//# sourceMappingURL=pessoa.service.js.map