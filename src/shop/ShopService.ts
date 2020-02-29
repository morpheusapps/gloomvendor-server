import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Shop } from './Shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>
  ) {}

  findAllShops(): Promise<Shop[]> {
    return this.shopRepository.find();
  }

  findShopById(id: string): Promise<Shop | void> {
    return this.shopRepository.findOne(id);
  }

  async insertShop(): Promise<Shop> {
    const shopProsperity = 1;
    const shopInsertResult = await this.shopRepository.insert({
      prosperity: shopProsperity
    });
    const shopId = shopInsertResult?.identifiers[0]?.id as string;
    const shop: Shop = { id: shopId, prosperity: shopProsperity };

    return shop;
  }

  deleteShopById(id: string): Promise<DeleteResult> {
    return this.shopRepository.delete(id);
  }
}
