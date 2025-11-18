import { Injectable } from '@nestjs/common';
import { ServicoRepository } from './servico.repository';

@Injectable()
export class ServicoService {
  constructor(private readonly servicoRepository: ServicoRepository) {}

  async create(
    dataHora: string,
    preco: number,
    tipo: string,
    descricao: string,
    clienteCpf: string,
    funcionarioCpf: string,
    animalCpf: string
  ) {
    return this.servicoRepository.create(
      dataHora,
      preco,
      tipo,
      descricao,
      clienteCpf,
      funcionarioCpf,
      animalCpf
    );
  }

  async findAll() {
    return this.servicoRepository.findAll();
  }

  async findById(clienteCpf: string, dataHora: string) {
    return this.servicoRepository.findById(clienteCpf, dataHora);
  }

  async update(
    clienteCpf: string,
    dataHora: string,
    preco: number,
    tipo: string,
    descricao: string,
    funcionarioCpf: string,
    animalCpf: string
  ) {
    return this.servicoRepository.update(
      clienteCpf,
      dataHora,
      preco,
      tipo,
      descricao,
      funcionarioCpf,
      animalCpf
    );
  }

  async delete(clienteCpf: string, dataHora: string) {
    return this.servicoRepository.delete(clienteCpf, dataHora);
  }
}