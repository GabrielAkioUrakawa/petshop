import { Module } from '@nestjs/common';
import { GraficaController } from './grafica.controller';
import { GraficaService } from './grafica.service';
import { GraficaRepository } from './grafica.repository';

@Module({
  controllers: [GraficaController],
  providers: [GraficaService, GraficaRepository]
})
export class GraficaModule {}
