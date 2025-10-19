import { Module } from '@nestjs/common';
import { GraficaController } from './grafica.controller';
import { GraficaService } from './grafica.service';

@Module({
  controllers: [GraficaController],
  providers: [GraficaService]
})
export class GraficaModule {}
