import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from '../schemas/transaction.schema';
import { Model } from 'mongoose';
import { TelegramStateService } from './telegram-state.service';
import { TransactionEnum } from '../enums/transaction.enum';

@Injectable()
export class AddTransactionService {
  currentUserId: string;

  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
    private userStateService: TelegramStateService
  ) {
    this.currentUserId = this.userStateService.getCurrentUser;
  }

  async addTransaction(transaction: number, userId: string, transactionType: TransactionEnum) {
    await this.transactionModel.create({
      transaction,
      transactionType,
      userId
    });
  }
}
