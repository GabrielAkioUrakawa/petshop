import { CompraService } from './compra.service';
export declare class CompraController {
    private readonly compraService;
    constructor(compraService: CompraService);
    findAll(): Promise<any[]>;
    findById(idCompra: string): Promise<any>;
    create(body: {
        idCompra: string;
        dataHora: string;
        meio: string;
        parcela: number;
        status: string;
        cpfCliente: string;
    }): Promise<void>;
    update(idCompra: string, body: {
        dataHora: string;
        meio: string;
        parcela: number;
        status: string;
        cpfCliente: string;
    }): Promise<void>;
    delete(idCompra: string): Promise<void>;
}
