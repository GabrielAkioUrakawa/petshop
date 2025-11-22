import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { CompraService } from './compra.service';

@Controller('compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Get()
  async findAll() {
    return this.compraService.findAll();
  }

  @Get('by-date-range')
  async findByDateRange(
    @Query('dataInicio') dataInicio: string,
    @Query('dataFinal') dataFinal: string
  ) {
    return this.compraService.findByDateRange(dataInicio, dataFinal);
  }

  @Get(':idCompra')
  async findById(@Param('idCompra') idCompra: string) {
    return this.compraService.findById(Number(idCompra));
  }

  @Post()
  async create(@Body() body: {
    dataHora: string;
    meio: string;
    parcela: number;
    status: string;
    cpfCliente: string;
  }) {
    return this.compraService.create(
      body.dataHora,
      body.meio,
      body.parcela,
      body.status,
      body.cpfCliente
    );
  }

  @Put(':idCompra')
  async update(
    @Param('idCompra') idCompra: string,
    @Body() body: {
      dataHora: string;
      meio: string;
      parcela: number;
      status: string;
      cpfCliente: string;
    }
  ) {
    return this.compraService.update(
      Number(idCompra),
      body.dataHora,
      body.meio,
      body.parcela,
      body.status,
      body.cpfCliente
    );
  }

  @Delete(':idCompra')
  async delete(@Param('idCompra') idCompra: string) {
    return this.compraService.delete(Number(idCompra));
  }
}
