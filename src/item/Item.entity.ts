import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsBoolean,
  Min,
  Max,
  IsOptional
} from 'class-validator';

@Entity()
export class Item {
  @IsInt()
  @ApiProperty({ required: true, example: 1 })
  @PrimaryColumn()
  id: number;

  @IsString()
  @ApiProperty({ required: true, example: 'Boots of Striding' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ required: true, example: 'one-handed' })
  @Column()
  slot: 'one-handed' | 'two-handed' | 'head' | 'chest' | 'boots' | 'consumable';

  @IsString()
  @ApiProperty({ required: true, example: '...' })
  @Column()
  image: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(9)
  @ApiProperty({ example: 1 })
  @Column({ nullable: true })
  prosperity?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

  @IsOptional()
  @IsBoolean()
  @Column({ nullable: true })
  @ApiProperty({ example: false })
  rare?: boolean;
}
