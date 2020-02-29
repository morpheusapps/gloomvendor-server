import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  HttpCode,
  Param,
  NotFoundException
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';
import { ItemService } from './ItemService';
import { Item } from './Item.entity';
import { NotFoundResponse } from '../dto';

@Controller('item')
@ApiTags('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  @ApiOkResponse({
    description: 'Successfully fetched items',
    type: [Item]
  })
  getAllItems(): Promise<Item[]> {
    return this.itemService.findAllItems();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Successfully created item',
    type: Item
  })
  postItem(@Body() item: Item): Promise<Item> {
    return this.itemService.insertItem(item);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Successfully fetched item',
    type: Item
  })
  @ApiNotFoundResponse({
    description: 'No item has been found',
    type: NotFoundResponse
  })
  async getItemById(@Param('id') id: number): Promise<Item> {
    const item = await this.itemService.findItemById(id);
    if (!item) {
      throw new NotFoundException(`No item with id=${id} has been found`);
    }
    return item;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Successfully removed item'
  })
  @ApiNotFoundResponse({
    description: 'No item has been found',
    type: NotFoundResponse
  })
  async deleteItemById(@Param('id') id: number): Promise<void> {
    await this.getItemById(id);
    await this.itemService.deleteItemById(id);
  }
}
