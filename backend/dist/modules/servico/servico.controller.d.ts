import { ServicoService } from './servico.service';
export declare class ServicoController {
    private readonly servicoService;
    constructor(servicoService: ServicoService);
    findAll(): Promise<any[]>;
    count(): Promise<number>;
    findRevenueByMonth(mes: string, ano: string): Promise<any>;
    findByFornecedor(nomeFornecedor: string): Promise<any[]>;
    findByDate(dataEspecifica: string): Promise<any[]>;
    findById(servicoCpf: string, dataHora: string): Promise<any>;
    create(body: {
        servicoCpf: string;
        dataHora: string;
        preco: number;
        tipo: string;
        descricao: string;
        funcionarioCpf: string;
        animalNome: string;
        animalCpf: string;
    }): Promise<void>;
    update(servicoCpf: string, dataHora: string, body: {
        preco: number;
        tipo: string;
        descricao: string;
        funcionarioCpf: string;
        animalNome: string;
        animalCpf: string;
    }): Promise<void>;
    delete(servicoCpf: string, dataHora: string): Promise<void>;
}
