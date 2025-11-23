import { Injectable } from '@nestjs/common';
import { ServicoRepository } from './servico.repository';

interface CreateServicoDto {
  servicoCpf: string;
  dataHora: string;
  preco: number;
  tipo: string;
  descricao: string;
  animalNome: string;
  animalCpf: string;
  produtos?: Array<{
    idProduto: number;
    quantidade: number;
    precoUnitario: number;
    idCompra: number;
  }>;
}

@Injectable()
export class ServicoService {
  constructor(private readonly servicoRepository: ServicoRepository) {}

  async create(data: CreateServicoDto) {
    return this.servicoRepository.create(data);
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
    animalNome: string,
    animalCpf: string
  ) {
    return this.servicoRepository.update(
      servicoCpf,
      dataHora,
      preco,
      tipo,
      descricao,
      animalNome,
      animalCpf
    );
  }

  async delete(servicoCpf: string, dataHora: string) {
    return this.servicoRepository.delete(servicoCpf, dataHora);
  }

  async findByFornecedor(nomeFornecedor: string) {
    return this.servicoRepository.findByFornecedor(nomeFornecedor);
  }

  async findByDate(dataEspecifica: string) {
    return this.servicoRepository.findByDate(dataEspecifica);
  }

  async count() {
    return this.servicoRepository.count();
  }

  async findRevenueByMonth(mes: number, ano: number) {
    return this.servicoRepository.findRevenueByMonth(mes, ano);
  }
}