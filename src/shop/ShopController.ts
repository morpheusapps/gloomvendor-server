import {
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
  BadRequestException,
  Delete,
  HttpCode
} from '@nestjs/common';
import { ShopService } from './ShopService';
import { ShopQuantityService } from '../shopQuantity/ShopQuantityService';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiParam,
  ApiBadRequestResponse,
  ApiNoContentResponse
} from '@nestjs/swagger';
import { Shop } from './Shop.entity';
import { NotFoundResponse, BadRequestResponse } from '../dto';
import { Validator } from 'class-validator';
import { ItemService } from '../item';

@Controller('shop')
@ApiTags('shop')
export class ShopController {
  private validator: Validator;

  constructor(
    private readonly shopService: ShopService,
    private readonly shopQuantityService: ShopQuantityService,
    private readonly itemService: ItemService
  ) {
    this.validator = new Validator();
  }

  private validateShopId(id: string): void {
    const isValidId = this.validator.isUUID(id, '4');
    if (!isValidId) {
      throw new BadRequestException(`Shop id must includes uuid/4 format`);
    }
  }

  @Get()
  @ApiOkResponse({
    description: 'Successfully fetched shops',
    type: [Shop]
  })
  getAllShops(): Promise<Shop[]> {
    return this.shopService.findAllShops();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Successfully created shop',
    type: Shop
  })
  async createShop(): Promise<Shop> {
    const shop = await this.shopService.insertShop();

    const initialItems = await this.itemService.findFilteredItems({
      prosperity: 1
    });
    await this.shopQuantityService.insertShopQuantities({
      items: initialItems,
      shopId: shop.id
    });
    return shop;
  }

  @Get(':id')
  @ApiParam({ name: 'id', schema: { type: 'string', format: 'uuid' } })
  @ApiOkResponse({
    description: 'Successfully fetched shop',
    type: Shop
  })
  @ApiBadRequestResponse({
    description: 'bad request',
    type: BadRequestResponse
  })
  @ApiNotFoundResponse({
    description: 'No shop has been found',
    type: NotFoundResponse
  })
  async getShopById(@Param('id') id: string): Promise<Shop> {
    this.validateShopId(id);

    const item = await this.shopService.findShopById(id);
    if (!item) {
      throw new NotFoundException(`No shop with id='${id}' has been found`);
    }
    return item;
  }

  @Delete(':id')
  @ApiParam({ name: 'id', schema: { type: 'string', format: 'uuid' } })
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Successfully removed shop'
  })
  @ApiBadRequestResponse({
    description: 'bad request',
    type: BadRequestResponse
  })
  @ApiNotFoundResponse({
    description: 'No shop has been found',
    type: NotFoundResponse
  })
  async deleteShopById(@Param('id') id: string): Promise<void> {
    await this.getShopById(id);
    await this.shopQuantityService.deleteShopQuantityByShopId(id);
    await this.shopService.deleteShopById(id);
  }
}
