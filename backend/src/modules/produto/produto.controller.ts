import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  async findAll() {
    return this.produtoService.findAll();
  }

  @Get('low-stock')
  async findLowStock() {
    return this.produtoService.findLowStock();
  }

  @Get('best-sellers')
  async findBestSellers() {
    return this.produtoService.findBestSellers();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.produtoService.findById(Number(id));
  }

  @Post()
  async create(@Body() body: {
    descricao: string;
    categoria: string;
    precoVenda: number;
    qtdeEstoque: number;
    qtdeMinima: number;
    fornCnpj?: string;
  }) {
    return this.produtoService.create(
      body.descricao,
      body.categoria,
      body.precoVenda,
      body.qtdeEstoque,
      body.qtdeMinima,
      body.fornCnpj
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: {
      descricao: string;
      categoria: string;
      precoVenda: number;
      qtdeEstoque: number;
      qtdeMinima: number;
      fornCnpj?: string;
    }
  ) {
    return this.produtoService.update(
      Number(id),
      body.descricao,
      body.categoria,
      body.precoVenda,
      body.qtdeEstoque,
      body.qtdeMinima,
      body.fornCnpj
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.produtoService.delete(Number(id));
  }
}
