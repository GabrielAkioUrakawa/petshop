import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AnimalService } from './animal.service';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  async findAll() {
    return this.animalService.findAll();
  }

  @Get(':clientCpf')
  async findByClientCpf(@Param('clientCpf') clientCpf: string) {
    return this.animalService.findByClientCpf(clientCpf);
  }

  @Post()
  async create(@Body() body: {
    clientCpf: string;
    nome: string;
    raca: string;
    especie: string;
    sexo: string;
    peso: number;
    dataNascimento: string;
  }) {
    return this.animalService.create(
      body.clientCpf,
      body.nome,
      body.raca,
      body.especie,
      body.sexo,
      body.peso,
      body.dataNascimento
    );
  }

  @Put(':clientCpf')
  async update(
    @Param('clientCpf') clientCpf: string,
    @Body() body: {
      nome: string;
      raca: string;
      especie: string;
      sexo: string;
      peso: number;
      dataNascimento: string;
    }
  ) {
    return this.animalService.update(
      clientCpf,
      body.nome,
      body.raca,
      body.especie,
      body.sexo,
      body.peso,
      body.dataNascimento
    );
  }

  @Delete(':clientCpf')
  async delete(@Param('clientCpf') clientCpf: string) {
    return this.animalService.delete(clientCpf);
  }
}