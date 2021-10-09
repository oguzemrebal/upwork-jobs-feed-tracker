export interface Attribute {
  prettyName: string;
  highlighted: boolean;
}

export interface Client {
  paymentVerificationStatus: number;
  totalFeedback: number;
  totalSpent: number;

  location: {
    country: string;
  };
}

export interface Job {
  title: string;
  type: number;
  tierText: string;
  description: string;

  amount: {
    amount: number;
    currencyCode: string;
  };

  client: Client;
  attrs: Attribute[];

  cipherText: string;
  duration: string;
  createdOn: Date;

  // internal attribute
  __isSeen: boolean;
}
