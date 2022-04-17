import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jws-auth.guard';
import { CreatedLoanDTO } from './dto/created-loan.dto';
import { FinishedLoanDTO } from './dto/finished-loan.dto';
import { Loan } from './interfaces/loan';
import { LoansService } from './loans.service';

@UseGuards(JwtAuthGuard)
@Controller()
export class LoansController {
  constructor(private loansService: LoansService) {}

  @Get('loans')
  getLoans(): Promise<Loan[]> {
    return this.loansService.getLoans();
  }

  @Get('loans/:bookId')
  getCurrentBookLoan(@Param('bookId') bookId: string): Promise<Loan> {
    return this.loansService.getCurrentBookLoan(bookId);
  }

  @Get('myLoans/:userEmail')
  getUserLoans(@Param('userEmail') userEmail: string): Promise<Loan[]> {
    return this.loansService.getUserLoans(userEmail);
  }

  @Post('loans')
  createLoan(@Body() createdLoan: CreatedLoanDTO): Promise<Loan> {
    return this.loansService.postLoan(createdLoan);
  }

  @Delete('loans/:loanId')
  deleteLoan(@Param('loanId') loanId: string): Promise<string> {
    return this.loansService.deleteLoan(loanId);
  }

  @Put('loans/:loanId')
  finishLoan(
    @Param('loanId') loanId: string,
    @Body() finishedLoan: FinishedLoanDTO,
  ): Promise<Loan> {
    return this.loansService.finishLoan(loanId, finishedLoan);
  }
}
