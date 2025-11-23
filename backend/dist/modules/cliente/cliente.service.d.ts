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
export declare class ClienteService {
    private readonly clienteRepository;
    constructor(clienteRepository: ClienteRepository);
    create(data: CreateClienteDto): Promise<void>;
    findAll(): Promise<any[]>;
    findByCpf(cpf: string): Promise<any>;
    update(cpf: string, data: UpdateClienteDto): Promise<void>;
    delete(cpf: string): Promise<void>;
    findInactive(dataLimite: string): Promise<any[]>;
    count(): Promise<number>;
}
export {};
