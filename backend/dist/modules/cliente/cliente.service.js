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
exports.ClienteService = void 0;
const common_1 = require("@nestjs/common");
const cliente_repository_1 = require("./cliente.repository");
let ClienteService = class ClienteService {
    clienteRepository;
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async create(data) {
        return this.clienteRepository.create(data);
    }
    async findAll() {
        return this.clienteRepository.findAll();
    }
    async findByCpf(cpf) {
        return this.clienteRepository.findByCpf(cpf);
    }
    async update(cpf, data) {
        return this.clienteRepository.update(cpf, data);
    }
    async delete(cpf) {
        return this.clienteRepository.delete(cpf);
    }
    async findInactive(dataLimite) {
        return this.clienteRepository.findInactive(dataLimite);
    }
    async count() {
        return this.clienteRepository.count();
    }
};
exports.ClienteService = ClienteService;
exports.ClienteService = ClienteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cliente_repository_1.ClienteRepository])
], ClienteService);
//# sourceMappingURL=cliente.service.js.map