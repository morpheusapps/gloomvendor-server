import { Module, forwardRef, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopController } from './ShopController';
import { ShopService } from './ShopService';
import { Shop } from './Shop.entity';
import { ItemModule } from '../item';
import { ShopQuantity, ShopQuantityModule } from '../shopQuantity';

@Module({
  imports: [
    forwardRef(
      (): DynamicModule => TypeOrmModule.forFeature([Shop, ShopQuantity])
    ),
    ItemModule,
    ShopQuantityModule
  ],
  controllers: [ShopController],
  providers: [ShopService]
})
export class ShopModule {}
