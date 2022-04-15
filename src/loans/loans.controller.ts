import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jws-auth.guard';
import { CreatedLoanDTO } from './dto/created-loan.dto';
import { Loan } from './interfaces/loan';
import { LoansService } from './loans.service';

@UseGuards(JwtAuthGuard)
@Controller('loans')
export class LoansController {
  constructor(private loansService: LoansService) {}

  @Get()
  getLoans(): Promise<Loan[]> {
    return this.loansService.getLoans();
  }

  @Get(':loanId')
  getLoan(@Param('loanId') loanId: string): Promise<Loan> {
    return this.loansService.getLoan(loanId);
  }

  @Post()
  createLoan(@Body() createdLoan: CreatedLoanDTO): Promise<Loan> {
    return this.loansService.postLoan(createdLoan);
  }

  @Delete(':loanId')
  deleteLoan(@Param('loanId') loanId: string): Promise<string> {
    return this.loansService.deleteLoan(loanId);
  }

  @Put(':loanId')
  updateLoan(@Param('loanId') loanId: string, @Body() createdLoan: CreatedLoanDTO): Promise<Loan> {
    return this.loansService.updateLoan(createdLoan, loanId);
  }
}
