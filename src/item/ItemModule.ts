import { Module, forwardRef, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './ItemController';
import { ItemService } from './ItemService';
import { Item } from './Item.entity';

@Module({
  imports: [forwardRef((): DynamicModule => TypeOrmModule.forFeature([Item]))],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService]
})
export class ItemModule {}
