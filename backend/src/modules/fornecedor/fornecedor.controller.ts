import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';

@Controller('fornecedor')
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) {}

  @Get()
  async findAll() {
    return this.fornecedorService.findAll();
  }

  @Get(':cnpj')
  async findByCnpj(@Param('cnpj') cnpj: string) {
    return this.fornecedorService.findByCnpj(cnpj);
  }

  @Post()
  async create(@Body() body: {
    cnpj: string;
    nome: string;
    email: string;
    telefone: string;
    categoria: string;
  }) {
    return this.fornecedorService.create(
      body.cnpj,
      body.nome,
      body.email,
      body.telefone,
      body.categoria
    );
  }

  @Put(':cnpj')
  async update(
    @Param('cnpj') cnpj: string,
    @Body() body: {
      nome: string;
      email: string;
      telefone: string;
      categoria: string;
    }
  ) {
    return this.fornecedorService.update(
      cnpj,
      body.nome,
      body.email,
      body.telefone,
      body.categoria
    );
  }

  @Delete(':cnpj')
  async delete(@Param('cnpj') cnpj: string) {
    return this.fornecedorService.delete(cnpj);
  }
}