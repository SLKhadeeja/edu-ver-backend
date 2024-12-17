import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Institution, InstitutionDocument } from './schemas/institution.schema';
import { CreateInstitutionDto } from './dto/create-instituion.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectModel(Institution.name)
    private institutionModel: Model<InstitutionDocument>,
  ) {}

  async create(
    createInstitutionDto: CreateInstitutionDto,
  ): Promise<Institution> {
    const newInstitution = new this.institutionModel(createInstitutionDto);
    return await newInstitution.save(); // Save to the database
  }

  async findAll(): Promise<Institution[]> {
    return await this.institutionModel.find().exec();
  }

  async findOne(id: string): Promise<Institution> {
    const institution = await this.institutionModel.findById(id).exec();
    if (!institution) {
      throw new NotFoundException(`Institution with ID ${id} not found`);
    }
    return institution;
  }

  async update(
    id: string,
    updateInstitutionDto: UpdateInstitutionDto,
  ): Promise<Institution> {
    const updatedInstitution = await this.institutionModel
      .findByIdAndUpdate(id, updateInstitutionDto, { new: true })
      .exec();
    if (!updatedInstitution) {
      throw new NotFoundException(`Institution with ID ${id} not found`);
    }
    return updatedInstitution;
  }

  async remove(id: string): Promise<void> {
    const result = await this.institutionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Institution with ID ${id} not found`);
    }
  }
}
