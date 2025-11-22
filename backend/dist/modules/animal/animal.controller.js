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
exports.AnimalController = void 0;
const common_1 = require("@nestjs/common");
const animal_service_1 = require("./animal.service");
let AnimalController = class AnimalController {
    animalService;
    constructor(animalService) {
        this.animalService = animalService;
    }
    async findAll() {
        return this.animalService.findAll();
    }
    async count() {
        return this.animalService.count();
    }
    async findByCliente(cpfCliente) {
        return this.animalService.findByCliente(cpfCliente);
    }
    async findByNomeAndDonoCpf(nome, donoCpf) {
        return this.animalService.findByNomeAndDonoCpf(nome, donoCpf);
    }
    async create(body) {
        return this.animalService.create(body.donoCpf, body.nome, body.raca, body.especie, body.sexo, body.peso, body.dataNascimento);
    }
    async update(nome, donoCpf, body) {
        return this.animalService.update(nome, donoCpf, body.raca, body.especie, body.sexo, body.peso, body.dataNascimento);
    }
    async delete(nome, donoCpf) {
        return this.animalService.delete(nome, donoCpf);
    }
};
exports.AnimalController = AnimalController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnimalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnimalController.prototype, "count", null);
__decorate([
    (0, common_1.Get)('by-cliente/:cpfCliente'),
    __param(0, (0, common_1.Param)('cpfCliente')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnimalController.prototype, "findByCliente", null);
__decorate([
    (0, common_1.Get)(':nome/:donoCpf'),
    __param(0, (0, common_1.Param)('nome')),
    __param(1, (0, common_1.Param)('donoCpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AnimalController.prototype, "findByNomeAndDonoCpf", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnimalController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':nome/:donoCpf'),
    __param(0, (0, common_1.Param)('nome')),
    __param(1, (0, common_1.Param)('donoCpf')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AnimalController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':nome/:donoCpf'),
    __param(0, (0, common_1.Param)('nome')),
    __param(1, (0, common_1.Param)('donoCpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AnimalController.prototype, "delete", null);
exports.AnimalController = AnimalController = __decorate([
    (0, common_1.Controller)('animal'),
    __metadata("design:paramtypes", [animal_service_1.AnimalService])
], AnimalController);
//# sourceMappingURL=animal.controller.js.map