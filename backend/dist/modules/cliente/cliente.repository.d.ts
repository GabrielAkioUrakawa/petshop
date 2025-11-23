export declare class ClienteRepository {
    private pool;
    constructor();
    create(data: {
        cpf: string;
        dataCadastro: string;
        nome: string;
        email?: string;
        telefone?: string;
        endereco?: string;
    }): Promise<void>;
    findAll(): Promise<any[]>;
    findByCpf(cpf: string): Promise<any>;
    update(cpf: string, data: {
        dataCadastro?: string;
        nome?: string;
        email?: string;
        telefone?: string;
        endereco?: string;
    }): Promise<void>;
    delete(cpf: string): Promise<void>;
    findInactive(dataLimite: string): Promise<any[]>;
    count(): Promise<number>;
}
