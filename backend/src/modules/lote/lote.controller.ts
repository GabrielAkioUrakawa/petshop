import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LoteService } from './lote.service';

@Controller('lote')
export class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @Get()
  async findAll() {
    return this.loteService.findAll();
  }

  @Get(':idLote')
  async findById(@Param('idLote') idLote: string) {
    return this.loteService.findById(Number(idLote));
  }

  @Post()
  async create(@Body() body: {
    dataValidade: string;
    quantidade: number;
    idCompra: number;
    idProduto: number;
  }) {
    return this.loteService.create(
      body.dataValidade,
      body.quantidade,
      body.idCompra,
      body.idProduto
    );
  }

  @Put(':idLote')
  async update(
    @Param('idLote') idLote: string,
    @Body() body: {
      dataValidade: string;
      quantidade: number;
      idCompra: number;
      idProduto: number;
    }
  ) {
    return this.loteService.update(
      Number(idLote),
      body.dataValidade,
      body.quantidade,
      body.idCompra,
      body.idProduto
    );
  }

  @Delete(':idLote')
  async delete(@Param('idLote') idLote: string) {
    return this.loteService.delete(Number(idLote));
  }
}
