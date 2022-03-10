export interface ITransaction {
  uid: string;

  fromUserUid: string;
  toUserUid: string;

  points: number;
  message?: string;
}
