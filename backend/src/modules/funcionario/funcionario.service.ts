import { Injectable } from '@nestjs/common';
import { FuncionarioRepository } from './funcionario.repository';

interface CreateFuncionarioDto {
  cpf: string;
  especialidade: string;
  nome: string;
  email?: string;
  telefone?: string;
  endereco?: string;
}

interface UpdateFuncionarioDto {
  especialidade?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
}

@Injectable()
export class FuncionarioService {
  constructor(private readonly funcionarioRepository: FuncionarioRepository) {}

  async create(data: CreateFuncionarioDto) {
    return this.funcionarioRepository.create(data);
  }

  async findAll() {
    return this.funcionarioRepository.findAll();
  }

  async findByCpf(cpf: string) {
    return this.funcionarioRepository.findByCpf(cpf);
  }

  async update(cpf: string, data: UpdateFuncionarioDto) {
    return this.funcionarioRepository.update(cpf, data);
  }

  async delete(cpf: string) {
    return this.funcionarioRepository.delete(cpf);
  }

  async findWithServiceCount() {
    return this.funcionarioRepository.findWithServiceCount();
  }

  async findEmployeeOfTheMonth(mes: number, ano: number) {
    return this.funcionarioRepository.findEmployeeOfTheMonth(mes, ano);
  }
}