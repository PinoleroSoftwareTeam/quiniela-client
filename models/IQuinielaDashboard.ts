import { IQuinielaUserDashboard } from './IQuinielaUserDashboard';

export interface IQuinielaDashboard {
  quinielaId: Number;
  userId: string;
  details: IQuinielaUserDashboard[];
}
