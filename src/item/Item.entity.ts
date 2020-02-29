import { Entity, PrimaryColumn, Column, ObjectType, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, IsOptional, IsUrl, IsIn } from 'class-validator';
import { Prosperity } from '../types';
import { ShopQuantity } from '../shopQuantity/ShopQuantity.entity';

enum ItemSlot {
  OneHand = 'One Hand',
  TwoHands = 'Two Hands',
  Head = 'Head',
  Body = 'Body',
  Legs = 'Legs',
  SmallItem = 'Small Item'
}

const ItemQuantity = [1, 2, 4] as const;

@Entity()
export class Item {
  @IsInt()
  @Min(1)
  @ApiProperty({ required: true, example: 1 })
  @PrimaryColumn('integer')
  id: number;

  @IsString()
  @ApiProperty({ required: true, example: 'Boots of Striding' })
  @Column({ type: 'text', unique: true })
  name: string;

  @IsIn(Object.values(ItemSlot))
  @ApiProperty({ enum: ItemSlot, required: true, example: 'Legs' })
  @Column({ type: 'enum', enum: ItemSlot })
  slot: ItemSlot;

  @IsString()
  @IsUrl()
  @ApiProperty({
    required: true,
    example:
      'https://gloomhavendb.com/assets/cards/items/1-14/boots-of-striding.png'
  })
  @Column('text')
  image: string;

  @IsInt()
  @Min(5)
  @ApiProperty({ required: true, example: 20 })
  @Column('integer')
  price: number;

  @IsIn(Object.values(ItemQuantity))
  @ApiProperty({ enum: ItemQuantity, required: true, example: 2 })
  @Column('integer')
  quantity: typeof ItemQuantity[number];

  @IsOptional()
  @IsIn(Object.values(Prosperity))
  @ApiProperty({ enum: Prosperity, example: 1 })
  @Column({ type: 'enum', enum: Prosperity, nullable: true })
  prosperity?: typeof Prosperity[number];

  @OneToMany(
    (): ObjectType<ShopQuantity> => ShopQuantity,
    (shopQuantity: ShopQuantity): number => shopQuantity.item
  )
  relations?: ShopQuantity[];
}
