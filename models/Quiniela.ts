import { IQuiniela } from './IQuiniela';

export class Quiniela implements IQuiniela {
  id: number;
  name: string;
  description: string;
  createdDate: string;
  calendarId: number;
  active: boolean;

  constructor(
    id: number = 0,
    name: string = '',
    description: string = '',
    createdDate: string,
    calendarId: number = 0,
    active: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.calendarId = calendarId;
    this.active = active;
    this.createdDate = new Date().toISOString();
  }
}
