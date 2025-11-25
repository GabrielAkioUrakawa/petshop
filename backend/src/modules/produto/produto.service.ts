import { Injectable } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';

@Injectable()
export class ProdutoService {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async create(
    descricao: string,
    categoria: string,
    precoVenda: number,
    precoCompra: number,
    qtdeEstoque: number,
    qtdeMinima: number,
    fornCnpj?: string,
  ) {
    return this.produtoRepository.create(descricao, categoria, precoVenda, precoCompra,qtdeEstoque, qtdeMinima, fornCnpj);
  }

  async findAll() {
    return this.produtoRepository.findAll();
  }

  async findById(idProduto: string) {
    return this.produtoRepository.findById(idProduto);
  }

  async update(
    idProduto: number,
    descricao: string,
    categoria: string,
    precoVenda: number,
    precoCompra: number,
    qtdeEstoque: number,
    qtdeMinima: number,
    fornCnpj?: string,
  ) {
    return this.produtoRepository.update(idProduto, descricao, categoria, precoVenda, precoCompra, qtdeEstoque, qtdeMinima, fornCnpj);
  }

  async delete(idProduto: number) {
    return this.produtoRepository.delete(idProduto);
  }

  async findLowStock() {
    return this.produtoRepository.findLowStock();
  }

  async findBestSellers() {
    return this.produtoRepository.findBestSellers();
  }
}