import { Module, forwardRef, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopQuantityController } from './ShopQuantityController';
import { ShopQuantityService } from '../shopQuantity/ShopQuantityService';
import { ShopQuantity } from '../shopQuantity/ShopQuantity.entity';

@Module({
  imports: [
    forwardRef((): DynamicModule => TypeOrmModule.forFeature([ShopQuantity]))
  ],
  controllers: [ShopQuantityController],
  providers: [ShopQuantityService],
  exports: [ShopQuantityService]
})
export class ShopQuantityModule {}
