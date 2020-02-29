import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ObjectType
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { Prosperity } from '../types';
import { ShopQuantity } from '../shopQuantity/ShopQuantity.entity';

@Entity()
export class Shop {
  @ApiProperty({ example: 'd69abc90-a8f3-4116-aeca-838ac72a8bd1' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsIn(Object.values(Prosperity))
  @ApiProperty({ enum: Prosperity, example: 1 })
  @Column({ type: 'enum', enum: Prosperity, nullable: true })
  prosperity: typeof Prosperity[number];

  @OneToMany(
    (): ObjectType<ShopQuantity> => ShopQuantity,
    (shopQuantity: ShopQuantity): string => shopQuantity.shop
  )
  relations?: ShopQuantity[];
}
