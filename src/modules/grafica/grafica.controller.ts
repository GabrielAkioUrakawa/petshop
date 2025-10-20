import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GraficaService } from './grafica.service';

@Controller('grafica')
export class GraficaController {
  constructor(private readonly graficaService: GraficaService) {}

  @Get()
  async findAll() {
    return this.graficaService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.graficaService.findById(id);
  }

  @Post()
  async create(@Body() body: { id: string; nome: string }) {
    return this.graficaService.create(body.id, body.nome);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { nome: string }) {
    return this.graficaService.update(id, body.nome);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.graficaService.delete(id);
  }
}
