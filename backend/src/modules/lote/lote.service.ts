import { Injectable } from '@nestjs/common';
import { LoteRepository } from './lote.repository';

@Injectable()
export class LoteService {
  constructor(private readonly loteRepository: LoteRepository) {}

  async create(
    dataValidade: string,
    quantidade: number,
    idCompra: number,
    idProduto: number
  ) {
    return this.loteRepository.create(dataValidade, quantidade, idCompra, idProduto);
  }

  async findAll() {
    return this.loteRepository.findAll();
  }

  async findById(idLote: number) {
    return this.loteRepository.findById(idLote);
  }

  async update(
    idLote: number,
    dataValidade: string,
    quantidade: number,
    idCompra: number,
    idProduto: number
  ) {
    return this.loteRepository.update(idLote, dataValidade, quantidade, idCompra, idProduto);
  }

  async delete(idLote: number) {
    return this.loteRepository.delete(idLote);
  }
}