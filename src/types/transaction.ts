export interface ITransaction {
  uid: string;

  merchantUID: string;
  userUID: string;

  createdAt: Date;

  points: number;
}
