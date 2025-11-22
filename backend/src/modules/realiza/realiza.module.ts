import { Module } from '@nestjs/common';
import { RealizaController } from './realiza.controller';
import { RealizaService } from './realiza.service';
import { RealizaRepository } from './realiza.repository';

@Module({
  controllers: [RealizaController],
  providers: [RealizaService, RealizaRepository],
})
export class RealizaModule {}
