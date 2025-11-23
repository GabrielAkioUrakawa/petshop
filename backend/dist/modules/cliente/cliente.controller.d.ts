import { ClienteService } from './cliente.service';
export declare class ClienteController {
    private readonly clienteService;
    constructor(clienteService: ClienteService);
    findAll(): Promise<any[]>;
    count(): Promise<number>;
    findInactive(dataLimite: string): Promise<any[]>;
    findByCpf(cpf: string): Promise<any>;
    create(body: {
        cpf: string;
        dataCadastro: string;
        nome: string;
        email?: string;
        telefone?: string;
        endereco?: string;
    }): Promise<void>;
    update(cpf: string, body: {
        dataCadastro?: string;
        nome?: string;
        email?: string;
        telefone?: string;
        endereco?: string;
    }): Promise<void>;
    delete(cpf: string): Promise<void>;
}
