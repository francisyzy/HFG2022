export interface ITransaction {
  uid: string;

  merchantUID: string;
  merchantName: string;
  userUID: string;
  userName: string;

  createdAt: Date;

  pointsAdded: number;
}
