import { Test, TestingModule } from '@nestjs/testing';
import { ImpressaoService } from './impressao.service';

describe('ImpressaoService', () => {
  let service: ImpressaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImpressaoService],
    }).compile();

    service = module.get<ImpressaoService>(ImpressaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
