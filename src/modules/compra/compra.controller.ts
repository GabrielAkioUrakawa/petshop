import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CompraService } from './compra.service';

@Controller('compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Get()
  async findAll() {
    return this.compraService.findAll();
  }

  @Get(':idCompra')
  async findById(@Param('idCompra') idCompra: string) {
    return this.compraService.findById(idCompra);
  }

  @Post()
  async create(@Body() body: {
    idCompra: string;
    dataHora: string;
    meio: string;
    parcela: number;
    status: string;
    cpfCliente: string;
  }) {
    return this.compraService.create(
      body.idCompra,
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
      idCompra,
      body.dataHora,
      body.meio,
      body.parcela,
      body.status,
      body.cpfCliente
    );
  }

  @Delete(':idCompra')
  async delete(@Param('idCompra') idCompra: string) {
    return this.compraService.delete(idCompra);
  }
}