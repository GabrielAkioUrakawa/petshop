export declare class AnimalRepository {
    private pool;
    constructor();
    create(clientCpf: string, nome: string, raca: string, especie: string, sexo: string, peso: number, dataNascimento: string): Promise<void>;
    findAll(): Promise<any[]>;
    findByClientCpf(clientCpf: string): Promise<any>;
    update(clientCpf: string, nome: string, raca: string, especie: string, sexo: string, peso: number, dataNascimento: string): Promise<void>;
    delete(clientCpf: string): Promise<void>;
}
