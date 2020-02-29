import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './item';
import { ShopModule } from './shop';
import { Shop } from './shop/Shop.entity';
import { ShopQuantity } from './shopQuantity/ShopQuantity.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ entities: [Shop, ShopQuantity] }),
    ShopModule,
    ItemModule
  ]
})
export class ApplicationModule {}
