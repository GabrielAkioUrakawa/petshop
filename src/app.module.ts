import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraficaModule } from './modules/grafica/grafica.module';

@Module({
  imports: [GraficaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
