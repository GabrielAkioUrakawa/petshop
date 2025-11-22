import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { AnimalAlergiaService } from './animal-alergia.service';

@Controller('animal-alergia')
export class AnimalAlergiaController {
  constructor(private readonly animalAlergiaService: AnimalAlergiaService) {}

  @Get()
  async findAll() {
    return this.animalAlergiaService.findAll();
  }

  @Get('by-animal')
  async findByAnimal(
    @Query('animalNome') animalNome: string,
    @Query('animalCpf') animalCpf: string
  ) {
    return this.animalAlergiaService.findByAnimal(animalNome, animalCpf);
  }

  @Post()
  async create(@Body() body: {
    animalNome: string;
    animalCpf: string;
    alergia: string;
  }) {
    return this.animalAlergiaService.create(
      body.animalNome,
      body.animalCpf,
      body.alergia
    );
  }

  @Delete(':animalNome/:animalCpf/:alergia')
  async delete(
    @Param('animalNome') animalNome: string,
    @Param('animalCpf') animalCpf: string,
    @Param('alergia') alergia: string
  ) {
    return this.animalAlergiaService.delete(animalNome, animalCpf, alergia);
  }

  @Delete('by-animal/:animalNome/:animalCpf')
  async deleteAllByAnimal(
    @Param('animalNome') animalNome: string,
    @Param('animalCpf') animalCpf: string
  ) {
    return this.animalAlergiaService.deleteAllByAnimal(animalNome, animalCpf);
  }
}
