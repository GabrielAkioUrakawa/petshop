import { Injectable } from '@nestjs/common';
import { FornecedorRepository } from './fornecedor.repository';

@Injectable()
export class FornecedorService {
  constructor(private readonly fornecedorRepository: FornecedorRepository) {}

  async create(
    cnpj: string,
    nome: string,
    email: string,
    telefone: string,
    categoria: string
  ) {
    return this.fornecedorRepository.create(cnpj, nome, email, telefone, categoria);
  }

  async findAll() {
    return this.fornecedorRepository.findAll();
  }

  async findByCnpj(cnpj: string) {
    return this.fornecedorRepository.findByCnpj(cnpj);
  }

  async update(
    cnpj: string,
    nome: string,
    email: string,
    telefone: string,
    categoria: string
  ) {
    return this.fornecedorRepository.update(cnpj, nome, email, telefone, categoria);
  }

  async delete(cnpj: string) {
    return this.fornecedorRepository.delete(cnpj);
  }
}