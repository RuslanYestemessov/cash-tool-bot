import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TransactionEnum } from '../enums/transaction.enum';

export type TransactionDocument = Transaction & Document

@Schema()
export class Transaction {
  @Prop()
  messageId: number;

  @Prop()
  userId: string;

  @Prop()
  transactionType: TransactionEnum;

  @Prop()
  transaction: number;

  @Prop()
  comment: string
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
