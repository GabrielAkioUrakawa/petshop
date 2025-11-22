export declare class AnimalRepository {
    private pool;
    constructor();
    create(donoCpf: string, nome: string, raca: string, especie: string, sexo: string, peso: number, dataNascimento: string): Promise<void>;
    findAll(): Promise<any[]>;
    findByNomeAndDonoCpf(nome: string, donoCpf: string): Promise<any>;
    update(nome: string, donoCpf: string, raca: string, especie: string, sexo: string, peso: number, dataNascimento: string): Promise<void>;
    delete(nome: string, donoCpf: string): Promise<void>;
    findByCliente(cpfCliente: string): Promise<any[]>;
    count(): Promise<number>;
}
