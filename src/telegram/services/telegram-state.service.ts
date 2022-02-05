import { Injectable } from '@nestjs/common';
import { TransactionEnum } from '../enums/transaction.enum';

@Injectable()
export class TelegramStateService {
  currentUserId: string;
  currentOperation: TransactionEnum;

  setCurrentUser(userId: string) {
    this.currentUserId = userId;
  }

  get getCurrentUser() {
    return this.currentUserId;
  }

  setCurrentOperation(currentOperation: TransactionEnum) {
    this.currentOperation = currentOperation;
  }

  get getCurrentOperation() {
    return this.currentOperation;
  }
}
