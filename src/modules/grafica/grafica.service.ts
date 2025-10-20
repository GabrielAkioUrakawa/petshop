import { Injectable } from '@nestjs/common';
import { GraficaRepository } from './grafica.repository';

@Injectable()
export class GraficaService {
  constructor(private readonly graficaRepository: GraficaRepository) {}

  async create(id: string, nome: string) {
    return this.graficaRepository.create(id, nome);
  }

  async findAll() {
    return this.graficaRepository.findAll();
  }

  async findById(id: string) {
    return this.graficaRepository.findById(id);
  }

  async update(id: string, nome: string) {
    return this.graficaRepository.update(id, nome);
  }

  async delete(id: string) {
    return this.graficaRepository.delete(id);
  }
}
