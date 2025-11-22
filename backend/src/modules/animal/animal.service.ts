import { Injectable } from '@nestjs/common';
import { AnimalRepository } from './animal.repository';

@Injectable()
export class AnimalService {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async create(
    donoCpf: string,
    nome: string,
    raca: string,
    especie: string,
    sexo: string,
    peso: number,
    dataNascimento: string
  ) {
    return this.animalRepository.create(donoCpf, nome, raca, especie, sexo, peso, dataNascimento);
  }

  async findAll() {
    return this.animalRepository.findAll();
  }

  async findByNomeAndDonoCpf(nome: string, donoCpf: string) {
    return this.animalRepository.findByNomeAndDonoCpf(nome, donoCpf);
  }

  async update(
    nome: string,
    donoCpf: string,
    raca: string,
    especie: string,
    sexo: string,
    peso: number,
    dataNascimento: string
  ) {
    return this.animalRepository.update(nome, donoCpf, raca, especie, sexo, peso, dataNascimento);
  }

  async delete(nome: string, donoCpf: string) {
    return this.animalRepository.delete(nome, donoCpf);
  }
}
