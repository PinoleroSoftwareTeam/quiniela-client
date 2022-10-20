export interface IGame {
  id: number;
  date: Date;
  calendarId: number;
  phaseId: number;
  team1Id: number;
  team2Id: number;
  pointTeam1: number;
  pointTeam2: number;
  groupId: number;
  winPenaltiesTeam1: boolean;
  winPenaltiesTeam2: boolean;
}
