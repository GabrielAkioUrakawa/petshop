export declare class ClienteRepository {
    private pool;
    constructor();
    create(cpf: string, dataCadastro: string): Promise<void>;
    findAll(): Promise<any[]>;
    findByCpf(cpf: string): Promise<any>;
    update(cpf: string, dataCadastro: string): Promise<void>;
    delete(cpf: string): Promise<void>;
}
