import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';

@Controller('funcionario')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Get()
  async findAll() {
    return this.funcionarioService.findAll();
  }

  @Get('employee-of-the-month')
  async findEmployeeOfTheMonth(@Query('mes') mes: string, @Query('ano') ano: string) {
    return this.funcionarioService.findEmployeeOfTheMonth(parseInt(mes), parseInt(ano));
  }

  @Get('with-service-count')
  async findWithServiceCount() {
    return this.funcionarioService.findWithServiceCount();
  }

  @Get(':cpf')
  async findByCpf(@Param('cpf') cpf: string) {
    return this.funcionarioService.findByCpf(cpf);
  }

  @Post()
  async create(@Body() body: {
    cpf: string;
    especialidade: string;
    nome: string;
    email?: string;
    telefone?: string;
    endereco?: string;
  }) {
    return this.funcionarioService.create(body);
  }

  @Put(':cpf')
  async update(@Param('cpf') cpf: string, @Body() body: {
    especialidade?: string;
    nome?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
  }) {
    return this.funcionarioService.update(cpf, body);
  }

  @Delete(':cpf')
  async delete(@Param('cpf') cpf: string) {
    return this.funcionarioService.delete(cpf);
  }
}