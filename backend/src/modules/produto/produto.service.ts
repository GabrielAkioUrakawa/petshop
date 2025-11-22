import { Injectable } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';

@Injectable()
export class ProdutoService {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async create(codigo: number, nome: string, preco: number, quantidade: number) {
    return this.produtoRepository.create(codigo, nome, preco, quantidade);
  }

  async findAll() {
    return this.produtoRepository.findAll();
  }

  async findByCodigo(codigo: number) {
    return this.produtoRepository.findByCodigo(codigo);
  }

  async update(codigo: number, nome: string, preco: number, quantidade: number) {
    return this.produtoRepository.update(codigo, nome, preco, quantidade);
  }

  async delete(codigo: number) {
    return this.produtoRepository.delete(codigo);
  }
}