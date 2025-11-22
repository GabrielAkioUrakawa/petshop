import { ClienteRepository } from './cliente.repository';
export declare class ClienteService {
    private readonly clienteRepository;
    constructor(clienteRepository: ClienteRepository);
    create(cpf: string, dataCadastro: string): Promise<void>;
    findAll(): Promise<any[]>;
    findByCpf(cpf: string): Promise<any>;
    update(cpf: string, dataCadastro: string): Promise<void>;
    delete(cpf: string): Promise<void>;
    findInactive(dataLimite: string): Promise<any[]>;
    count(): Promise<number>;
}
