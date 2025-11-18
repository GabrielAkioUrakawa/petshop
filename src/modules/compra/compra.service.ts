import { Injectable } from '@nestjs/common';
import { CompraRepository } from './compra.repository';

@Injectable()
export class CompraService {
  constructor(private readonly compraRepository: CompraRepository) {}

  async create(
    idCompra: string,
    dataHora: string,
    meio: string,
    parcela: number,
    status: string,
    cpfCliente: string
  ) {
    return this.compraRepository.create(idCompra, dataHora, meio, parcela, status, cpfCliente);
  }

  async findAll() {
    return this.compraRepository.findAll();
  }

  async findById(idCompra: string) {
    return this.compraRepository.findById(idCompra);
  }

  async update(
    idCompra: string,
    dataHora: string,
    meio: string,
    parcela: number,
    status: string,
    cpfCliente: string
  ) {
    return this.compraRepository.update(idCompra, dataHora, meio, parcela, status, cpfCliente);
  }

  async delete(idCompra: string) {
    return this.compraRepository.delete(idCompra);
  }
}