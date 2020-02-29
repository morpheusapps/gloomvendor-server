import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Item } from './Item.entity';
import { Prosperity } from '../types';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>
  ) {}

  findAllItems(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  findFilteredItems(params: {
    prosperity: typeof Prosperity[number];
  }): Promise<Item[]> {
    return this.itemRepository.find(params);
  }

  findItemById(id: number): Promise<Item | void> {
    return this.itemRepository.findOne(id);
  }

  async insertItem(item: Item): Promise<Item> {
    await this.itemRepository.insert(item);
    return item;
  }

  updateItem(item: Item): Promise<Item> {
    return this.itemRepository.save(item);
  }

  deleteItemById(id: number): Promise<DeleteResult> {
    return this.itemRepository.delete(id);
  }
}
