import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { RealizaService } from './realiza.service';

@Controller('realiza')
export class RealizaController {
  constructor(private readonly realizaService: RealizaService) {}

  @Get()
  async findAll() {
    return this.realizaService.findAll();
  }

  @Get('by-funcionario/:funcionarioCpf')
  async findByFuncionario(@Param('funcionarioCpf') funcionarioCpf: string) {
    return this.realizaService.findByFuncionario(funcionarioCpf);
  }

  @Get('by-servico')
  async findByServico(
    @Query('servicoCpf') servicoCpf: string,
    @Query('servicoDataHora') servicoDataHora: string
  ) {
    return this.realizaService.findByServico(servicoCpf, servicoDataHora);
  }

  @Post()
  async create(@Body() body: {
    funcionarioCpf: string;
    servicoCpf: string;
    servicoDataHora: string;
  }) {
    return this.realizaService.create(
      body.funcionarioCpf,
      body.servicoCpf,
      body.servicoDataHora
    );
  }

  @Delete(':funcionarioCpf/:servicoCpf/:servicoDataHora')
  async delete(
    @Param('funcionarioCpf') funcionarioCpf: string,
    @Param('servicoCpf') servicoCpf: string,
    @Param('servicoDataHora') servicoDataHora: string
  ) {
    return this.realizaService.delete(funcionarioCpf, servicoCpf, servicoDataHora);
  }
}
