export declare class ServicoRepository {
    private pool;
    constructor();
    create(data: {
        servicoCpf: string;
        dataHora: string;
        preco: number;
        tipo: string;
        descricao: string;
        animalNome: string;
        animalCpf: string;
        produtos?: Array<{
            idProduto: number;
            quantidade: number;
            precoUnitario: number;
            idCompra: number;
        }>;
    }): Promise<void>;
    findAll(): Promise<any[]>;
    findById(servicoCpf: string, dataHora: string): Promise<any>;
    update(servicoCpf: string, dataHora: string, preco: number, tipo: string, descricao: string, animalNome: string, animalCpf: string): Promise<void>;
    delete(servicoCpf: string, dataHora: string): Promise<void>;
    findByFornecedor(nomeFornecedor: string): Promise<any[]>;
    findByDate(dataEspecifica: string): Promise<any[]>;
    count(): Promise<number>;
    findRevenueByMonth(mes: number, ano: number): Promise<any>;
}
