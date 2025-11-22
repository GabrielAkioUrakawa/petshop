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
exports.AnimalService = void 0;
const common_1 = require("@nestjs/common");
const animal_repository_1 = require("./animal.repository");
let AnimalService = class AnimalService {
    animalRepository;
    constructor(animalRepository) {
        this.animalRepository = animalRepository;
    }
    async create(clientCpf, nome, raca, especie, sexo, peso, dataNascimento) {
        return this.animalRepository.create(clientCpf, nome, raca, especie, sexo, peso, dataNascimento);
    }
    async findAll() {
        return this.animalRepository.findAll();
    }
    async findByClientCpf(clientCpf) {
        return this.animalRepository.findByClientCpf(clientCpf);
    }
    async update(clientCpf, nome, raca, especie, sexo, peso, dataNascimento) {
        return this.animalRepository.update(clientCpf, nome, raca, especie, sexo, peso, dataNascimento);
    }
    async delete(clientCpf) {
        return this.animalRepository.delete(clientCpf);
    }
};
exports.AnimalService = AnimalService;
exports.AnimalService = AnimalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [animal_repository_1.AnimalRepository])
], AnimalService);
//# sourceMappingURL=animal.service.js.map