import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  Min,
  Max,
  IsOptional,
  IsUrl,
  IsIn
} from 'class-validator';

enum ItemSlot {
  OneHand = 'One Hand',
  TwoHands = 'Two Hands',
  Head = 'Head',
  Body = 'Body',
  Legs = 'Legs',
  SmallItem = 'Small Item'
}

const ItemQuantity = [1, 2, 4] as const;

const ItemProsperity = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

@Entity()
export class Item {
  @IsInt()
  @Min(1)
  @ApiProperty({ required: true, example: 1 })
  @PrimaryColumn({ type: 'integer' })
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
  @Column({ type: 'text' })
  image: string;

  @IsInt()
  @Min(5)
  @ApiProperty({ required: true, example: 20 })
  @Column({ type: 'integer' })
  price: number;

  @IsIn(Object.values(ItemQuantity))
  @ApiProperty({ enum: ItemQuantity, required: true, example: 2 })
  @Column({ type: 'integer' })
  quantity: typeof ItemQuantity[number];

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(9)
  @ApiProperty({ enum: ItemProsperity, example: 1 })
  @Column({ type: 'enum', enum: ItemProsperity, nullable: true })
  prosperity?: typeof ItemProsperity[number];
}
