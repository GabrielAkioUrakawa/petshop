export declare class ServicoRepository {
    private pool;
    constructor();
    create(servicoCpf: string, dataHora: string, preco: number, tipo: string, descricao: string, funcionarioCpf: string, animalNome: string, animalCpf: string): Promise<void>;
    findAll(): Promise<any[]>;
    findById(servicoCpf: string, dataHora: string): Promise<any>;
    update(servicoCpf: string, dataHora: string, preco: number, tipo: string, descricao: string, funcionarioCpf: string, animalNome: string, animalCpf: string): Promise<void>;
    delete(servicoCpf: string, dataHora: string): Promise<void>;
}
