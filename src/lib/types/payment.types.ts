export interface Currency {
  currency: string | null;
  amount: number;
  actual: number;
}

export interface DisplayRate {
  base: string;
  counter: string;
  rate: number;
}

export interface Address {
  address: string;
  tag: string | null;
  protocol: string;
  uri: string;
  alternatives: string[];
}

export interface PaySummary {
  uuid: string;
  merchantDisplayName: string;
  merchantId: string;
  dateCreated: number;
  expiryDate: number;
  quoteExpiryDate: number | null;
  acceptanceExpiryDate: number | null;
  quoteStatus: string;
  reference: string;
  type: string;
  subType: string;
  status: string;
  displayCurrency: Currency;
  walletCurrency: Currency;
  paidCurrency: Currency;
  feeCurrency: Currency;
  displayRate: DisplayRate | null;
  exchangeRate: DisplayRate | null;
  address: Address | null;
  returnUrl: string;
  redirectUrl: string;
  transactions: unknown[];
  refund: unknown | null;
  refunds: unknown[];
}
