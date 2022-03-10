export interface IUser {
  uid: string;
  email: string;
  name: string;
  lastLogIn?: Date;
  points?: number;
}
