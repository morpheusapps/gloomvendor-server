import { Controller, Post, Param, Get, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { ShopQuantityService } from './ShopQuantityService';
import { ShopQuantity } from './ShopQuantity.entity';

@Controller('shopQuantity')
@ApiTags('shopQuantity')
export class ShopQuantityController {
  constructor(private readonly shopQuantityService: ShopQuantityService) {}

  @Get()
  @ApiOkResponse({
    description: 'Successfully fetched shop quantity',
    type: ShopQuantity
  })
  getShopQuantities(): Promise<ShopQuantity[]> {
    return this.shopQuantityService.findShopQuantities();
  }

  @Post()
  createShopQuantity(
    @Body() shopQuantity: ShopQuantity
  ): Promise<ShopQuantity> {
    return this.shopQuantityService.insertShopQuantity(shopQuantity);
  }

  @Get('shop/:shop')
  @ApiParam({ name: 'shop', schema: { type: 'string', format: 'uuid' } })
  @ApiOkResponse({
    description: 'Successfully fetched shop quantity',
    type: ShopQuantity
  })
  getShopQuantitiesByShop(
    @Param('shop') shop: string
  ): Promise<ShopQuantity[]> {
    return this.shopQuantityService.findShopQuantitiesByShopId(shop);
  }

  @Patch()
  updateShopQuantity(
    @Body() shopQuantity: ShopQuantity
  ): Promise<ShopQuantity> {
    return this.shopQuantityService.updateShopQuantity(shopQuantity);
  }
}
