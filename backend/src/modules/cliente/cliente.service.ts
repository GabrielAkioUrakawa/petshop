import { Injectable } from '@nestjs/common';
import { ClienteRepository } from './cliente.repository';

interface CreateClienteDto {
  cpf: string;
  dataCadastro: string;
  nome: string;
  email?: string;
  telefone?: string;
  endereco?: string;
}

interface UpdateClienteDto {
  dataCadastro?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
}

@Injectable()
export class ClienteService {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async create(data: CreateClienteDto) {
    return this.clienteRepository.create(data);
  }

  async findAll() {
    return this.clienteRepository.findAll();
  }

  async findByCpf(cpf: string) {
    return this.clienteRepository.findByCpf(cpf);
  }

  async update(cpf: string, data: UpdateClienteDto) {
    return this.clienteRepository.update(cpf, data);
  }

  async delete(cpf: string) {
    return this.clienteRepository.delete(cpf);
  }

  async findInactive(dataLimite: string) {
    return this.clienteRepository.findInactive(dataLimite);
  }

  async count() {
    return this.clienteRepository.count();
  }
}