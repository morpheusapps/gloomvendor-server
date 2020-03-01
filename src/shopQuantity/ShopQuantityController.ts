import { Controller, Post, Get, Body, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { ShopQuantityService } from './ShopQuantityService';
import { ShopQuantity } from './ShopQuantity.entity';

@Controller('shopQuantity')
@ApiTags('shopQuantity')
export class ShopQuantityController {
  constructor(private readonly shopQuantityService: ShopQuantityService) {}

  @Get()
  @ApiQuery({
    name: 'shop',
    schema: { type: 'string', format: 'uuid' },
    required: false
  })
  @ApiOkResponse({
    description: 'Successfully fetched shop quantity',
    type: ShopQuantity
  })
  getShopQuantities(@Query('shop') shop?: string): Promise<ShopQuantity[]> {
    return shop
      ? this.shopQuantityService.findShopQuantitiesByShopId(shop)
      : this.shopQuantityService.findShopQuantities();
  }

  @Post()
  createShopQuantity(
    @Body() shopQuantity: ShopQuantity
  ): Promise<ShopQuantity> {
    return this.shopQuantityService.insertShopQuantity(shopQuantity);
  }

  @Patch()
  updateShopQuantity(
    @Body() shopQuantity: ShopQuantity
  ): Promise<ShopQuantity> {
    return this.shopQuantityService.updateShopQuantity(shopQuantity);
  }
}
