import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Institution, InstitutionSchema } from './entities/institution.entity';
import { InstitutionController } from './institution.controller';
import { InstitutionService } from './institution.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Institution.name, schema: InstitutionSchema },
    ]),
  ],
  controllers: [InstitutionController],
  providers: [InstitutionService],
})
export class InstitutionModule {}
