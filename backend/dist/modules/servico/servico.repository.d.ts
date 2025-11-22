export declare class ServicoRepository {
    private pool;
    constructor();
    create(dataHora: string, preco: number, tipo: string, descricao: string, clienteCpf: string, funcionarioCpf: string, animalCpf: string): Promise<void>;
    findAll(): Promise<any[]>;
    findById(clienteCpf: string, dataHora: string): Promise<any>;
    update(clienteCpf: string, dataHora: string, preco: number, tipo: string, descricao: string, funcionarioCpf: string, animalCpf: string): Promise<void>;
    delete(clienteCpf: string, dataHora: string): Promise<void>;
}
