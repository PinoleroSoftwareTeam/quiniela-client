import { IGame } from './IGame';

export class Game implements IGame {
  id: number;
  date: Date;
  calendarId: number;
  phaseId: number;
  team1Id: number;
  team2Id: number;
  pointTeam1: number;
  pointTeam2: number;
  groupId: number;

  constructor(
    id: number = 0,
    date: Date = new Date(),
    calendarId: number = 0,
    phaseId: number = 0,
    team1Id: number = 0,
    team2Id: number = 0,
    pointTeam1: number = 0,
    pointTeam2: number = 0,
    groupId: number = 0
  ) {
    this.id = id;
    this.date = date;
    this.calendarId = calendarId;
    this.phaseId = phaseId;
    this.team1Id = team1Id;
    this.team2Id = team2Id;
    this.pointTeam1 = pointTeam1;
    this.pointTeam2 = pointTeam2;
    this.groupId = groupId;
  }
}
