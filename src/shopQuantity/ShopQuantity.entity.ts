import { Entity, Column, ManyToOne, ObjectType, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { Item } from '../item/Item.entity';
import { Shop } from '../shop/Shop.entity';

const ShopQuantityCount = [0, 1, 2, 3, 4] as const;

@Entity()
export class ShopQuantity {
  @ApiProperty({
    required: true,
    example: 1
  })
  @ManyToOne(
    (): ObjectType<Item> => Item,
    (item: Item): ShopQuantity[] => item.relations,
    { primary: true, nullable: false }
  )
  @JoinColumn()
  item: number;

  @ApiProperty({
    required: true,
    example: '89179d1e-954b-4bc4-9f05-dff9c9cace1e'
  })
  @ManyToOne(
    (): ObjectType<Shop> => Shop,
    (shop: Shop): ShopQuantity[] => shop.relations,
    { primary: true, nullable: false }
  )
  @JoinColumn()
  shop: string;

  @IsIn(Object.values(ShopQuantityCount))
  @ApiProperty({ enum: ShopQuantityCount, required: true, example: 2 })
  @Column('integer')
  quantity: typeof ShopQuantityCount[number];
}
