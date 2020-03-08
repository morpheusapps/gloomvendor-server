import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { ShopQuantity } from './ShopQuantity.entity';
import { Item } from '../item';

@Injectable()
export class ShopQuantityService {
  constructor(
    @InjectRepository(ShopQuantity)
    private readonly shopQuantityRepository: Repository<ShopQuantity>
  ) {}

  findShopQuantities(): Promise<ShopQuantity[]> {
    return this.shopQuantityRepository.find({
      relations: ['item'],
      loadRelationIds: true
    });
  }

  findShopQuantitiesByShopId(shopId: string): Promise<ShopQuantity[]> {
    return this.shopQuantityRepository.find({
      relations: ['item'],
      where: { shop: shopId }
    });
  }

  async insertShopQuantity(shopQuantity: ShopQuantity): Promise<ShopQuantity> {
    await this.shopQuantityRepository.insert(shopQuantity);
    return shopQuantity;
  }

  async insertShopQuantities({
    items,
    shopId
  }: {
    items: Item[];
    shopId: string;
  }): Promise<ShopQuantity[]> {
    return Promise.all(
      items.map(item =>
        this.insertShopQuantity({
          shop: shopId,
          item: item.id,
          quantity: item.quantity
        })
      )
    );
  }

  deleteShopQuantityByShopId(shopId: string): Promise<DeleteResult> {
    return this.shopQuantityRepository.delete({ shop: shopId });
  }

  async updateShopQuantity(shopQuantity: ShopQuantity): Promise<ShopQuantity> {
    const { shop, item, quantity } = shopQuantity;

    await this.shopQuantityRepository.update({ shop, item }, { quantity });

    return shopQuantity;
  }
}
