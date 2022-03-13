export interface IUser {
  uid: string;
  email: string;
  name: string;
  merchant?: boolean;
  lastLogIn?: Date;
  points?: number;
  voucher5?: number;
  voucher10?: number;
  voucher20?: number;
}
