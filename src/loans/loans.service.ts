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

  async getCurrentBookLoan(bookId: string): Promise<Loan | any> {
    const currentBookLoan = await this.loanModel.findOne({ bookId: bookId, finalDate: null });
    if (!currentBookLoan) return {};
    return currentBookLoan;
  }

  async getUserLoans(userEmail: string): Promise<Loan[]> {
    const userLoans = await this.loanModel.find({ userEmail: userEmail });
    return userLoans;
  }

  async postLoan(createdLoan: CreatedLoanDTO): Promise<Loan> {
    createdLoan.initialDate = new Date();
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
    await this.loanModel.findByIdAndUpdate(loanId, finishedLoan);
    return finishedLoan;
  }
}
