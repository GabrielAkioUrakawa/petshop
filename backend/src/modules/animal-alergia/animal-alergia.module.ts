import { Module } from '@nestjs/common';
import { AnimalAlergiaController } from './animal-alergia.controller';
import { AnimalAlergiaService } from './animal-alergia.service';
import { AnimalAlergiaRepository } from './animal-alergia.repository';

@Module({
  controllers: [AnimalAlergiaController],
  providers: [AnimalAlergiaService, AnimalAlergiaRepository],
})
export class AnimalAlergiaModule {}
