import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoansController } from './loans.controller';
import { LoansService } from './loans.service';
import { LoanSchema } from './schemas/loan.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Loan', schema: LoanSchema }])],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
