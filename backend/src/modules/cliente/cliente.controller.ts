import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  async findAll() {
    return this.clienteService.findAll();
  }

  @Get('count')
  async count() {
    return this.clienteService.count();
  }

  @Get('inactive')
  async findInactive(@Query('dataLimite') dataLimite: string) {
    return this.clienteService.findInactive(dataLimite);
  }

  @Get(':cpf')
  async findByCpf(@Param('cpf') cpf: string) {
    return this.clienteService.findByCpf(cpf);
  }

  @Post()
  async create(@Body() body: { cpf: string; dataCadastro: string }) {
    return this.clienteService.create(body.cpf, body.dataCadastro);
  }

  @Put(':cpf')
  async update(@Param('cpf') cpf: string, @Body() body: { dataCadastro: string }) {
    return this.clienteService.update(cpf, body.dataCadastro);
  }

  @Delete(':cpf')
  async delete(@Param('cpf') cpf: string) {
    return this.clienteService.delete(cpf);
  }
}