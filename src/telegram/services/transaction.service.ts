import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from '../schemas/transaction.schema';
import { Model } from 'mongoose';
import { TransactionEnum } from '../enums/transaction.enum';

@Injectable()
export class TransactionService {

  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {
  }

  async addTransaction(transaction: number, userId: string, transactionType: TransactionEnum) {
    await this.transactionModel.create({
      transaction,
      transactionType,
      userId
    });
  }

  async showAllTransactions(userId: string) {
    return this.transactionModel.find({
      userId: userId
    });
  }
}
