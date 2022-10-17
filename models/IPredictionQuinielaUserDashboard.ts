export interface IPredictionQuinielaUserDashboard {
  predictionId: number;
  gameId: number;
  quinielaId: number;
  team1Id: number;
  team2Id: number;
  phaseName: string;
  groupName: string;
  team1Name: string;
  team2Name: string;
  scorePredictionTeam1: number;
  scorePredictionTeam2: number;
  datePrediction: string;
  dateGame: string;
  scoreTeam1Game: number;
  scoreTeam2Game: number;
  winPoint: number;
  scorePoint: number;
  totalPoint: number;
  dateFormat: string;
}
