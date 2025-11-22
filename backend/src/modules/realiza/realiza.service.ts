import { Injectable } from '@nestjs/common';
import { RealizaRepository } from './realiza.repository';

@Injectable()
export class RealizaService {
  constructor(private readonly realizaRepository: RealizaRepository) {}

  async create(funcionarioCpf: string, servicoCpf: string, servicoDataHora: string) {
    return this.realizaRepository.create(funcionarioCpf, servicoCpf, servicoDataHora);
  }

  async findAll() {
    return this.realizaRepository.findAll();
  }

  async findByFuncionario(funcionarioCpf: string) {
    return this.realizaRepository.findByFuncionario(funcionarioCpf);
  }

  async findByServico(servicoCpf: string, servicoDataHora: string) {
    return this.realizaRepository.findByServico(servicoCpf, servicoDataHora);
  }

  async delete(funcionarioCpf: string, servicoCpf: string, servicoDataHora: string) {
    return this.realizaRepository.delete(funcionarioCpf, servicoCpf, servicoDataHora);
  }
}
