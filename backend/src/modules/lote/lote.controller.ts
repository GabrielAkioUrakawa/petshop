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
    idProd: number;
    fCnpj: string;
    quantidade: number;
  }) {
    return this.loteService.create(
      body.idProd,
      body.fCnpj,
      body.quantidade
    );
  }

  @Put(':idLote')
  async update(
    @Param('idLote') idLote: string,
    @Body() body: {
      idProd: number;
      fCnpj: string;
      quantidade: number;
    }
  ) {
    return this.loteService.update(
      Number(idLote),
      body.idProd,
      body.fCnpj,
      body.quantidade
    );
  }

  @Delete(':idLote')
  async delete(@Param('idLote') idLote: string) {
    return this.loteService.delete(Number(idLote));
  }
}
