import { Module } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { AnimalRepository } from './animal.repository';

@Module({
  controllers: [AnimalController],
  providers: [AnimalService, AnimalRepository]
})
export class AnimalModule {}