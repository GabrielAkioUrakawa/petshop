import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PessoaService } from './pessoa.service';

@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Get()
  async findAll() {
    return this.pessoaService.findAll();
  }

  @Get(':cpf')
  async findByCpf(@Param('cpf') cpf: string) {
    return this.pessoaService.findByCpf(cpf);
  }

  @Post()
  async create(@Body() body: { cpf: string; nome: string; email: string; telefone: string; endereco: string }) {
    return this.pessoaService.create(body.cpf, body.nome, body.email, body.telefone, body.endereco);
  }

  @Put(':cpf')
  async update(@Param('cpf') cpf: string, @Body() body: { nome: string; email: string; telefone: string; endereco: string }) {
    return this.pessoaService.update(cpf, body.nome, body.email, body.telefone, body.endereco);
  }

  @Delete(':cpf')
  async delete(@Param('cpf') cpf: string) {
    return this.pessoaService.delete(cpf);
  }
}