import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isValidMongoId } from 'src/shared/isValidMongoId';
import { CreatedLoanDTO } from './dto/created-loan.dto';
import { FinishedLoanDTO } from './dto/finished-loan.dto';
import { Loan } from './interfaces/loan';

@Injectable()
export class LoansService {
  constructor(@InjectModel('Loan') private loanModel: Model<Loan>) {}

  async getLoans(): Promise<Loan[]> {
    return await this.loanModel.find();
  }

  async getLoan(loanId: string): Promise<Loan> {
    isValidMongoId(loanId);
    const loan = await this.loanModel.findById(loanId);
    if (!loan) throw new HttpException('Loan not found', HttpStatus.NOT_FOUND);
    return loan;
  }

  async getUserLoans(userId: string): Promise<Loan[]> {
    const userLoans = await this.loanModel.find({ userId: userId });
    return userLoans;
  }

  async postLoan(createdLoan: CreatedLoanDTO): Promise<Loan> {
    const newLoan = new this.loanModel(createdLoan);
    return await newLoan.save();
  }

  async deleteLoan(loanId: string): Promise<string> {
    isValidMongoId(loanId);
    await this.loanModel.deleteOne({ _id: loanId });
    return `Loan ${loanId} deleted`;
  }

  async finishLoan(loanId: string, finishedLoan: FinishedLoanDTO): Promise<Loan> {
    isValidMongoId(loanId);
    finishedLoan.finalDate = new Date();
    console.log(finishedLoan);

    await this.loanModel.findByIdAndUpdate(loanId, finishedLoan);
    return this.getLoan(loanId);
  }
}
