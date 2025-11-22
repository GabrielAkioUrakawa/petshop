import { ServicoService } from './servico.service';
export declare class ServicoController {
    private readonly servicoService;
    constructor(servicoService: ServicoService);
    findAll(): Promise<any[]>;
    findById(clienteCpf: string, dataHora: string): Promise<any>;
    create(body: {
        dataHora: string;
        preco: number;
        tipo: string;
        descricao: string;
        clienteCpf: string;
        funcionarioCpf: string;
        animalCpf: string;
    }): Promise<void>;
    update(clienteCpf: string, dataHora: string, body: {
        preco: number;
        tipo: string;
        descricao: string;
        funcionarioCpf: string;
        animalCpf: string;
    }): Promise<void>;
    delete(clienteCpf: string, dataHora: string): Promise<void>;
}
