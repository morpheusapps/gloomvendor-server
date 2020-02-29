import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsBoolean,
  Min,
  Max,
  IsOptional,
  Matches,
  IsUrl
} from 'class-validator';

enum ItemSlot {
  OneHanded = 'one-handed',
  TwoHanded = 'two-handed',
  Head = 'head',
  Chest = 'chest',
  Boots = 'boots',
  Consumable = 'consumable'
}

const ItemProsperity = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

@Entity()
export class Item {
  @IsInt()
  @ApiProperty({ required: true, example: 1 })
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @IsString()
  @ApiProperty({ required: true, example: 'Boots of Striding' })
  @Column({ type: 'text', unique: true })
  name: string;

  @Matches(/^(one-handed|two-handed|head|chest|boots|consumable)$/)
  @ApiProperty({ enum: ItemSlot, required: true, example: 'boots' })
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

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(9)
  @ApiProperty({ example: 1 })
  @Column({ type: 'enum', enum: ItemProsperity, nullable: true })
  prosperity?: typeof ItemProsperity[number];

  @IsOptional()
  @IsBoolean()
  @Column({ type: 'boolean', nullable: true })
  @ApiProperty({ example: false })
  rare?: boolean;
}
