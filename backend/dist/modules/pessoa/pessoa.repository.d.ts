export declare class PessoaRepository {
    private pool;
    constructor();
    create(cpf: string, nome: string, email: string, telefone: string, endereco: string): Promise<void>;
    findAll(): Promise<any[]>;
    findByCpf(cpf: string): Promise<any>;
    update(cpf: string, nome: string, email: string, telefone: string, endereco: string): Promise<void>;
    delete(cpf: string): Promise<void>;
}
