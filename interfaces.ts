export interface Airdrop {
  network: string;
  token: string;

  homeLink: string;
  claimLink?: string;

  startDate: Date;
  endDate?: Date;
}
