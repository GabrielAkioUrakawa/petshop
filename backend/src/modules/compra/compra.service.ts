import { Injectable } from '@nestjs/common';
import { CompraRepository } from './compra.repository';

interface CreateCompraDto {
  dataHora: string;
  meio: string;
  parcela: number;
  status: string;
  cpfCliente: string;
  produtos?: Array<{
    idProduto: number;
    quantidade: number;
    precoUnitario: number;
    servicoCpf?: string;
    servicoDataHora?: string;
  }>;
}

@Injectable()
export class CompraService {
  constructor(private readonly compraRepository: CompraRepository) {}

  async create(data: CreateCompraDto) {
    return this.compraRepository.create(data);
  }

  async findAll() {
    return this.compraRepository.findAll();
  }

  async findById(idCompra: number) {
    return this.compraRepository.findById(idCompra);
  }

  async update(
    idCompra: number,
    dataHora: string,
    meio: string,
    parcela: number,
    status: string,
    cpfCliente: string
  ) {
    return this.compraRepository.update(idCompra, dataHora, meio, parcela, status, cpfCliente);
  }

  async delete(idCompra: number) {
    return this.compraRepository.delete(idCompra);
  }

  async findByDateRange(dataInicio: string, dataFinal: string) {
    return this.compraRepository.findByDateRange(dataInicio, dataFinal);
  }
}
