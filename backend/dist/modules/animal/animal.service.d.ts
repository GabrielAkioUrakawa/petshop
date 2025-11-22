import { AnimalRepository } from './animal.repository';
export declare class AnimalService {
    private readonly animalRepository;
    constructor(animalRepository: AnimalRepository);
    create(donoCpf: string, nome: string, raca: string, especie: string, sexo: string, peso: number, dataNascimento: string): Promise<void>;
    findAll(): Promise<any[]>;
    findByNomeAndDonoCpf(nome: string, donoCpf: string): Promise<any>;
    update(nome: string, donoCpf: string, raca: string, especie: string, sexo: string, peso: number, dataNascimento: string): Promise<void>;
    delete(nome: string, donoCpf: string): Promise<void>;
}
