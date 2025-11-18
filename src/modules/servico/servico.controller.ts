import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServicoService } from './servico.service';

@Controller('servico')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Get()
  async findAll() {
    return this.servicoService.findAll();
  }

  @Get(':clienteCpf/:dataHora')
  async findById(@Param('clienteCpf') clienteCpf: string, @Param('dataHora') dataHora: string) {
    return this.servicoService.findById(clienteCpf, dataHora);
  }

  @Post()
  async create(@Body() body: {
    dataHora: string;
    preco: number;
    tipo: string;
    descricao: string;
    clienteCpf: string;
    funcionarioCpf: string;
    animalCpf: string;
  }) {
    return this.servicoService.create(
      body.dataHora,
      body.preco,
      body.tipo,
      body.descricao,
      body.clienteCpf,
      body.funcionarioCpf,
      body.animalCpf
    );
  }

  @Put(':clienteCpf/:dataHora')
  async update(
    @Param('clienteCpf') clienteCpf: string,
    @Param('dataHora') dataHora: string,
    @Body() body: {
      preco: number;
      tipo: string;
      descricao: string;
      funcionarioCpf: string;
      animalCpf: string;
    }
  ) {
    return this.servicoService.update(
      clienteCpf,
      dataHora,
      body.preco,
      body.tipo,
      body.descricao,
      body.funcionarioCpf,
      body.animalCpf
    );
  }

  @Delete(':clienteCpf/:dataHora')
  async delete(@Param('clienteCpf') clienteCpf: string, @Param('dataHora') dataHora: string) {
    return this.servicoService.delete(clienteCpf, dataHora);
  }
}