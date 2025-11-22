import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AnimalService } from './animal.service';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  async findAll() {
    return this.animalService.findAll();
  }

  @Get('count')
  async count() {
    return this.animalService.count();
  }

  @Get('by-cliente/:cpfCliente')
  async findByCliente(@Param('cpfCliente') cpfCliente: string) {
    return this.animalService.findByCliente(cpfCliente);
  }

  @Get(':nome/:donoCpf')
  async findByNomeAndDonoCpf(@Param('nome') nome: string, @Param('donoCpf') donoCpf: string) {
    return this.animalService.findByNomeAndDonoCpf(nome, donoCpf);
  }

  @Post()
  async create(@Body() body: {
    donoCpf: string;
    nome: string;
    raca: string;
    especie: string;
    sexo: string;
    peso: number;
    dataNascimento: string;
  }) {
    return this.animalService.create(
      body.donoCpf,
      body.nome,
      body.raca,
      body.especie,
      body.sexo,
      body.peso,
      body.dataNascimento
    );
  }

  @Put(':nome/:donoCpf')
  async update(
    @Param('nome') nome: string,
    @Param('donoCpf') donoCpf: string,
    @Body() body: {
      raca: string;
      especie: string;
      sexo: string;
      peso: number;
      dataNascimento: string;
    }
  ) {
    return this.animalService.update(
      nome,
      donoCpf,
      body.raca,
      body.especie,
      body.sexo,
      body.peso,
      body.dataNascimento
    );
  }

  @Delete(':nome/:donoCpf')
  async delete(@Param('nome') nome: string, @Param('donoCpf') donoCpf: string) {
    return this.animalService.delete(nome, donoCpf);
  }
}
