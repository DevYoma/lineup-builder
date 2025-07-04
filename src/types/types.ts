export type Player = {
  id: string;
  name: string;
  position: string;
  number: number;
}

export type GridSlot = {
  id: string;
  x: number; // column 
  y: number; // row 
  assignedPlayerId?: string;
  position: string;
}

export type LineupState = {
  players: Player[];
  grid: GridSlot[];
}
