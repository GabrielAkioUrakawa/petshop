import { Injectable } from '@nestjs/common';
import { ServicoRepository } from './servico.repository';

@Injectable()
export class ServicoService {
  constructor(private readonly servicoRepository: ServicoRepository) {}

  async create(
    servicoCpf: string,
    dataHora: string,
    preco: number,
    tipo: string,
    descricao: string,
    funcionarioCpf: string,
    animalNome: string,
    animalCpf: string
  ) {
    return this.servicoRepository.create(
      servicoCpf,
      dataHora,
      preco,
      tipo,
      descricao,
      funcionarioCpf,
      animalNome,
      animalCpf
    );
  }

  async findAll() {
    return this.servicoRepository.findAll();
  }

  async findById(servicoCpf: string, dataHora: string) {
    return this.servicoRepository.findById(servicoCpf, dataHora);
  }

  async update(
    servicoCpf: string,
    dataHora: string,
    preco: number,
    tipo: string,
    descricao: string,
    funcionarioCpf: string,
    animalNome: string,
    animalCpf: string
  ) {
    return this.servicoRepository.update(
      servicoCpf,
      dataHora,
      preco,
      tipo,
      descricao,
      funcionarioCpf,
      animalNome,
      animalCpf
    );
  }

  async delete(servicoCpf: string, dataHora: string) {
    return this.servicoRepository.delete(servicoCpf, dataHora);
  }
}