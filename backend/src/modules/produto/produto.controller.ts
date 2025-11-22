import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  async findAll() {
    return this.produtoService.findAll();
  }

  @Get(':codigo')
  async findByCodigo(@Param('codigo') codigo: string) {
    return this.produtoService.findByCodigo(Number(codigo));
  }

  @Post()
  async create(@Body() body: { codigo: number; nome: string; preco: number; quantidade: number }) {
    return this.produtoService.create(body.codigo, body.nome, body.preco, body.quantidade);
  }

  @Put(':codigo')
  async update(
    @Param('codigo') codigo: string,
    @Body() body: { nome: string; preco: number; quantidade: number }
  ) {
    return this.produtoService.update(Number(codigo), body.nome, body.preco, body.quantidade);
  }

  @Delete(':codigo')
  async delete(@Param('codigo') codigo: string) {
    return this.produtoService.delete(Number(codigo));
  }
}