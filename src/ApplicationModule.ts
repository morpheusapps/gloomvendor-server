import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './item';

@Module({
  imports: [TypeOrmModule.forRoot(), ItemModule]
})
export class ApplicationModule {}
