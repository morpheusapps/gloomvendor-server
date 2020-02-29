import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Item } from './Item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly ItemRepository: Repository<Item>
  ) {}

  findAllItems(): Promise<Item[]> {
    return this.ItemRepository.find();
  }

  findItemById(id: number): Promise<Item | void> {
    return this.ItemRepository.findOne(id);
  }

  async insertItem(item: Item): Promise<Item> {
    await this.ItemRepository.insert(item);
    return item;
  }

  updateItem(item: Item): Promise<Item> {
    return this.ItemRepository.save(item);
  }

  deleteItemById(id: number): Promise<DeleteResult> {
    return this.ItemRepository.delete(id);
  }
}
