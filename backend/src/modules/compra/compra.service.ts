import { Injectable } from '@nestjs/common';
import { CompraRepository } from './compra.repository';

@Injectable()
export class CompraService {
  constructor(private readonly compraRepository: CompraRepository) {}

  async create(
    dataHora: string,
    meio: string,
    parcela: number,
    status: string,
    cpfCliente: string
  ) {
    return this.compraRepository.create(dataHora, meio, parcela, status, cpfCliente);
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
