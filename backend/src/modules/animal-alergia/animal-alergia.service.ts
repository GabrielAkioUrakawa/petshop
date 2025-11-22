import { Injectable } from '@nestjs/common';
import { AnimalAlergiaRepository } from './animal-alergia.repository';

@Injectable()
export class AnimalAlergiaService {
  constructor(private readonly animalAlergiaRepository: AnimalAlergiaRepository) {}

  async create(animalNome: string, animalCpf: string, alergia: string) {
    return this.animalAlergiaRepository.create(animalNome, animalCpf, alergia);
  }

  async findByAnimal(animalNome: string, animalCpf: string) {
    return this.animalAlergiaRepository.findByAnimal(animalNome, animalCpf);
  }

  async findAll() {
    return this.animalAlergiaRepository.findAll();
  }

  async delete(animalNome: string, animalCpf: string, alergia: string) {
    return this.animalAlergiaRepository.delete(animalNome, animalCpf, alergia);
  }

  async deleteAllByAnimal(animalNome: string, animalCpf: string) {
    return this.animalAlergiaRepository.deleteAllByAnimal(animalNome, animalCpf);
  }
}
