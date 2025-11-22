import { Injectable } from '@nestjs/common';
import { LoteRepository } from './lote.repository';

@Injectable()
export class LoteService {
  constructor(private readonly loteRepository: LoteRepository) {}

  async create(
    idProd: number,
    fCnpj: string,
    quantidade: number
  ) {
    return this.loteRepository.create(idProd, fCnpj, quantidade);
  }

  async findAll() {
    return this.loteRepository.findAll();
  }

  async findById(idLote: number) {
    return this.loteRepository.findById(idLote);
  }

  async update(
    idLote: number,
    idProd: number,
    fCnpj: string,
    quantidade: number
  ) {
    return this.loteRepository.update(idLote, idProd, fCnpj, quantidade);
  }

  async delete(idLote: number) {
    return this.loteRepository.delete(idLote);
  }
}