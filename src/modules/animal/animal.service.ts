import { Injectable } from '@nestjs/common';
import { AnimalRepository } from './animal.repository';

@Injectable()
export class AnimalService {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async create(
    clientCpf: string,
    nome: string,
    raca: string,
    especie: string,
    sexo: string,
    peso: number,
    dataNascimento: string
  ) {
    return this.animalRepository.create(clientCpf, nome, raca, especie, sexo, peso, dataNascimento);
  }

  async findAll() {
    return this.animalRepository.findAll();
  }

  async findByClientCpf(clientCpf: string) {
    return this.animalRepository.findByClientCpf(clientCpf);
  }

  async update(
    clientCpf: string,
    nome: string,
    raca: string,
    especie: string,
    sexo: string,
    peso: number,
    dataNascimento: string
  ) {
    return this.animalRepository.update(clientCpf, nome, raca, especie, sexo, peso, dataNascimento);
  }

  async delete(clientCpf: string) {
    return this.animalRepository.delete(clientCpf);
  }
}