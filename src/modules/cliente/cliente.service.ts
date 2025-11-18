import { Injectable } from '@nestjs/common';
import { ClienteRepository } from './cliente.repository';

@Injectable()
export class ClienteService {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async create(cpf: string, dataCadastro: string) {
    return this.clienteRepository.create(cpf, dataCadastro);
  }

  async findAll() {
    return this.clienteRepository.findAll();
  }

  async findByCpf(cpf: string) {
    return this.clienteRepository.findByCpf(cpf);
  }

  async update(cpf: string, dataCadastro: string) {
    return this.clienteRepository.update(cpf, dataCadastro);
  }

  async delete(cpf: string) {
    return this.clienteRepository.delete(cpf);
  }
}