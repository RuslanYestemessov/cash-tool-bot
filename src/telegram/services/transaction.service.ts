import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from '../schemas/transaction.schema';
import { Model } from 'mongoose';
import { TransactionEnum } from '../enums/transaction.enum';

@Injectable()
export class TransactionService {

  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>
  ) {
  }

  async addTransaction(
    transaction: number,
    userId: string,
    transactionType: TransactionEnum,
    messageId: number
  ) {
    await this.transactionModel.create({
      transaction,
      transactionType,
      userId,
      messageId,
      comment: ''
    });
  }

  async getAllTransactions(userId: string) {
    return this.transactionModel.find({
      userId: userId
    });
  }

  async getOneTransaction(messageId: string): Promise<Transaction> {
    return this.transactionModel.findOne({
      messageId
    });
  }

  async addCommentForTransaction(messageId: string, transaction: Transaction) {
    return this.transactionModel.findOneAndUpdate({ messageId }, transaction).exec();
  }

  async removeTransaction(messageId: string) {
    return this.transactionModel.findOneAndDelete({
      messageId
    });
  }
}
