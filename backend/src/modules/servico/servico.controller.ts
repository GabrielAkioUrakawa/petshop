import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ServicoService } from './servico.service';

@Controller('servico')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Get()
  async findAll() {
    return this.servicoService.findAll();
  }

  @Get('count')
  async count() {
    return this.servicoService.count();
  }

  @Get('revenue-by-month')
  async findRevenueByMonth(@Query('mes') mes: string, @Query('ano') ano: string) {
    return this.servicoService.findRevenueByMonth(parseInt(mes), parseInt(ano));
  }

  @Get('by-fornecedor/:nomeFornecedor')
  async findByFornecedor(@Param('nomeFornecedor') nomeFornecedor: string) {
    return this.servicoService.findByFornecedor(nomeFornecedor);
  }

  @Get('by-date')
  async findByDate(@Query('dataEspecifica') dataEspecifica: string) {
    return this.servicoService.findByDate(dataEspecifica);
  }

  @Get(':servicoCpf/:dataHora')
  async findById(@Param('servicoCpf') servicoCpf: string, @Param('dataHora') dataHora: string) {
    return this.servicoService.findById(servicoCpf, dataHora);
  }

  @Post()
  async create(@Body() body: {
    servicoCpf: string;
    funcionarioCpf: string;
    dataHora: string;
    preco: number;
    tipo: string;
    descricao: string;
    animalNome: string;
    animalCpf: string;
    produtos?: Array<{
      idProduto: number;
      quantidade: number;
      precoUnitario: number;
      idCompra: number;
    }>;
  }) {
    return this.servicoService.create(body);
  }

  @Put(':servicoCpf/:dataHora')
  async update(
    @Param('servicoCpf') servicoCpf: string,
    @Param('dataHora') dataHora: string,
    @Body() body: {
      preco: number;
      tipo: string;
      descricao: string;
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
      body.animalNome,
      body.animalCpf
    );
  }

  @Delete(':servicoCpf/:dataHora')
  async delete(@Param('servicoCpf') servicoCpf: string, @Param('dataHora') dataHora: string) {
    return this.servicoService.delete(servicoCpf, dataHora);
  }
}
