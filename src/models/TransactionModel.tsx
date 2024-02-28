interface TransactionItem {
  productId: string;
  quantity: number;
}

export interface Transaction {
  id: string;
  date: Date;
  totalAmount: number;
  items: TransactionItem[];
}
