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
exports.ServicoService = void 0;
const common_1 = require("@nestjs/common");
const servico_repository_1 = require("./servico.repository");
let ServicoService = class ServicoService {
    servicoRepository;
    constructor(servicoRepository) {
        this.servicoRepository = servicoRepository;
    }
    async create(servicoCpf, dataHora, preco, tipo, descricao, animalNome, animalCpf) {
        return this.servicoRepository.create(servicoCpf, dataHora, preco, tipo, descricao, animalNome, animalCpf);
    }
    async findAll() {
        return this.servicoRepository.findAll();
    }
    async findById(servicoCpf, dataHora) {
        return this.servicoRepository.findById(servicoCpf, dataHora);
    }
    async update(servicoCpf, dataHora, preco, tipo, descricao, animalNome, animalCpf) {
        return this.servicoRepository.update(servicoCpf, dataHora, preco, tipo, descricao, animalNome, animalCpf);
    }
    async delete(servicoCpf, dataHora) {
        return this.servicoRepository.delete(servicoCpf, dataHora);
    }
    async findByFornecedor(nomeFornecedor) {
        return this.servicoRepository.findByFornecedor(nomeFornecedor);
    }
    async findByDate(dataEspecifica) {
        return this.servicoRepository.findByDate(dataEspecifica);
    }
    async count() {
        return this.servicoRepository.count();
    }
    async findRevenueByMonth(mes, ano) {
        return this.servicoRepository.findRevenueByMonth(mes, ano);
    }
};
exports.ServicoService = ServicoService;
exports.ServicoService = ServicoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [servico_repository_1.ServicoRepository])
], ServicoService);
//# sourceMappingURL=servico.service.js.map