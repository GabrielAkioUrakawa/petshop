import { CompraService } from './compra.service';
export declare class CompraController {
    private readonly compraService;
    constructor(compraService: CompraService);
    findAll(): Promise<any[]>;
    findByDateRange(dataInicio: string, dataFinal: string): Promise<any[]>;
    findById(idCompra: string): Promise<any>;
    create(body: {
        dataHora: string;
        meio: string;
        parcela: number;
        status: string;
        cpfCliente: string;
        produtos?: Array<{
            idProduto: number;
            quantidade: number;
            precoUnitario: number;
            servicoCpf?: string;
            servicoDataHora?: string;
        }>;
    }): Promise<{
        id_compra: any;
    }>;
    update(idCompra: string, body: {
        dataHora: string;
        meio: string;
        parcela: number;
        status: string;
        cpfCliente: string;
    }): Promise<void>;
    delete(idCompra: string): Promise<void>;
}
