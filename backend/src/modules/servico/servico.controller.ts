import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServicoService } from './servico.service';

@Controller('servico')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Get()
  async findAll() {
    return this.servicoService.findAll();
  }

  @Get(':servicoCpf/:dataHora')
  async findById(@Param('servicoCpf') servicoCpf: string, @Param('dataHora') dataHora: string) {
    return this.servicoService.findById(servicoCpf, dataHora);
  }

  @Post()
  async create(@Body() body: {
    servicoCpf: string;
    dataHora: string;
    preco: number;
    tipo: string;
    descricao: string;
    funcionarioCpf: string;
    animalNome: string;
    animalCpf: string;
  }) {
    return this.servicoService.create(
      body.servicoCpf,
      body.dataHora,
      body.preco,
      body.tipo,
      body.descricao,
      body.funcionarioCpf,
      body.animalNome,
      body.animalCpf
    );
  }

  @Put(':servicoCpf/:dataHora')
  async update(
    @Param('servicoCpf') servicoCpf: string,
    @Param('dataHora') dataHora: string,
    @Body() body: {
      preco: number;
      tipo: string;
      descricao: string;
      funcionarioCpf: string;
      animalNome: string;
      animalCpf: string;
    }
  ) {
    return this.servicoService.update(
      servicoCpf,
      dataHora,
      body.preco,
      body.tipo,
      body.descricao,
      body.funcionarioCpf,
      body.animalNome,
      body.animalCpf
    );
  }

  @Delete(':servicoCpf/:dataHora')
  async delete(@Param('servicoCpf') servicoCpf: string, @Param('dataHora') dataHora: string) {
    return this.servicoService.delete(servicoCpf, dataHora);
  }
}
