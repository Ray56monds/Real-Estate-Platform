// src/properties/properties.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async create(createPropertyDto: CreatePropertyDto) {
    return this.prisma.property.create({ data: createPropertyDto });
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return this.prisma.property.update({
      where: { id },
      data: updatePropertyDto,
    });
  }

  async findAll() {
    return this.prisma.property.findMany();
  }
}
