import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  HttpCode,
  Param,
  NotFoundException,
  BadRequestException,
  Query
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
  ApiQuery
} from '@nestjs/swagger';
import { ItemService } from './ItemService';
import { Item } from './Item.entity';
import { NotFoundResponse, BadRequestResponse } from '../dto';
import { Prosperity } from '../types';
import { Validator } from 'class-validator';

@Controller('item')
@ApiTags('item')
export class ItemController {
  private validator: Validator;

  constructor(private readonly itemService: ItemService) {
    this.validator = new Validator();
  }

  private validateItemId(id: unknown): void {
    const numberId = Number(id);
    const isValidId =
      this.validator.isInt(numberId) && this.validator.isPositive(numberId);
    if (!isValidId) {
      throw new BadRequestException(`Item id must be a positive integer`);
    }
  }

  private validateItemProsperity(prosperity: unknown): void {
    const numberProsperity = Number(prosperity);
    const isValidProsperity = this.validator.isIn(
      numberProsperity,
      Object.values(Prosperity)
    );

    if (!isValidProsperity) {
      throw new BadRequestException(`Items prosperity invalid`);
    }
  }

  @Get()
  @ApiQuery({ name: 'prosperity', type: 'number', required: false })
  @ApiOkResponse({
    description: 'Successfully fetched items',
    type: [Item]
  })
  @ApiBadRequestResponse({
    description: 'bad request',
    type: BadRequestResponse
  })
  getAllItems(@Query('prosperity') prosperity?: string): Promise<Item[]> {
    if (prosperity) {
      this.validateItemProsperity(prosperity);
      const numberProsperity = Number(prosperity);
      return this.itemService.findFilteredItems({
        prosperity: numberProsperity as typeof Prosperity[number]
      });
    }

    return this.itemService.findAllItems();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Successfully created item',
    type: Item
  })
  @ApiBadRequestResponse({
    description: 'bad request',
    type: BadRequestResponse
  })
  createItem(@Body() item: Item): Promise<Item> {
    return this.itemService.insertItem(item);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOkResponse({
    description: 'Successfully fetched item',
    type: Item
  })
  @ApiBadRequestResponse({
    description: 'bad request',
    type: BadRequestResponse
  })
  @ApiNotFoundResponse({
    description: 'No item has been found',
    type: NotFoundResponse
  })
  async getItemById(@Param('id') id: string): Promise<Item> {
    this.validateItemId(id);

    const numberId = Number(id);
    const item = await this.itemService.findItemById(numberId);
    if (!item) {
      throw new NotFoundException(`No item with id=${numberId} has been found`);
    }
    return item;
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Successfully removed item'
  })
  @ApiBadRequestResponse({
    description: 'bad request',
    type: BadRequestResponse
  })
  @ApiNotFoundResponse({
    description: 'No item has been found',
    type: NotFoundResponse
  })
  async deleteItemById(@Param('id') id: string): Promise<void> {
    await this.getItemById(id);

    const numberId = Number(id);
    await this.itemService.deleteItemById(numberId);
  }
}
