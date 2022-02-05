export interface Loan {
  id?: string;
  userId: string;
  bookId: string;
  initialDate: Date;
  finalDate: Date;
}
