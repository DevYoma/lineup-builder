import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { GridSlot, LineupState } from "../types/types";

// Define formations
export const formations: Record<string, GridSlot[]> = {
  "4-4-2": [
    { id: "gk", x: 2, y: 0, position: "GK" },
    { id: "lb", x: 0, y: 1, position: "LB" },
    { id: "cb1", x: 1, y: 1, position: "CB" },
    { id: "cb2", x: 3, y: 1, position: "CB" },
    { id: "rb", x: 4, y: 1, position: "RB" },
    { id: "lm", x: 0, y: 2, position: "LM" },
    { id: "cm1", x: 1, y: 2, position: "CM" },
    { id: "cm2", x: 3, y: 2, position: "CM" },
    { id: "rm", x: 4, y: 2, position: "RM" },
    { id: "st1", x: 1, y: 3, position: "ST" },
    { id: "st2", x: 3, y: 3, position: "ST" },
  ],
  "4-3-3": [
    { id: "gk", x: 2, y: 0, position: "GK" },
    { id: "lb", x: 0, y: 1, position: "LB" },
    { id: "cb1", x: 1, y: 1, position: "CB" },
    { id: "cb2", x: 3, y: 1, position: "CB" },
    { id: "rb", x: 4, y: 1, position: "RB" },
    { id: "cm1", x: 1, y: 2, position: "CM" },
    { id: "cm2", x: 2, y: 2, position: "CM" },
    { id: "cm3", x: 3, y: 2, position: "CM" },
    { id: "lw", x: 0, y: 3, position: "LW" },
    { id: "st", x: 2, y: 3, position: "ST" },
    { id: "rw", x: 4, y: 3, position: "RW" },
  ],
  "3-5-2": [
    { id: "gk", x: 2, y: 0, position: "GK" },
    { id: "cb1", x: 1, y: 1, position: "CB" },
    { id: "cb2", x: 2, y: 1, position: "CB" },
    { id: "cb3", x: 3, y: 1, position: "CB" },
    { id: "lwb", x: 0, y: 2, position: "LWB" },
    { id: "cm1", x: 1, y: 2, position: "CM" },
    { id: "cm2", x: 2, y: 2, position: "CM" },
    { id: "cm3", x: 3, y: 2, position: "CM" },
    { id: "rwb", x: 4, y: 2, position: "RWB" },
    { id: "st1", x: 1, y: 3, position: "ST" },
    { id: "st2", x: 3, y: 3, position: "ST" },
  ],
  "4-2-3-1": [
    { id: "gk", x: 2, y: 0, position: "GK" },
    { id: "lb", x: 0, y: 1, position: "LB" },
    { id: "cb1", x: 1, y: 1, position: "CB" },
    { id: "cb2", x: 3, y: 1, position: "CB" },
    { id: "rb", x: 4, y: 1, position: "RB" },
    { id: "cdm1", x: 1, y: 2, position: "CDM" },
    { id: "cdm2", x: 3, y: 2, position: "CDM" },
    { id: "cam", x: 2, y: 3, position: "CAM" },
    { id: "lw", x: 0, y: 4, position: "LW" },
    { id: "rw", x: 4, y: 4, position: "RW" },
    { id: "st", x: 2, y: 10, position: "ST" }, // why is 5 not working? y: 5 is the bottom!
  ],
  "3-4-3": [
    { id: "gk", x: 2, y: 0, position: "GK" },
    { id: "cb1", x: 1, y: 1, position: "CB" },
    { id: "cb2", x: 2, y: 1, position: "CB" },
    { id: "cb3", x: 3, y: 1, position: "CB" },
    { id: "lm", x: 0, y: 2, position: "LM" },
    { id: "cm1", x: 1, y: 2, position: "CM" },
    { id: "cm2", x: 3, y: 2, position: "CM" },
    { id: "rm", x: 4, y: 2, position: "RM" },
    { id: "lw", x: 0, y: 3, position: "LW" },
    { id: "st", x: 2, y: 3, position: "ST" },
    { id: "rw", x: 4, y: 3, position: "RW" },
  ],
  // Add more as needed
};

const initialState: LineupState = {
  players: [
    { id: "p1", name: "Ederson", position: "Goalkeeper", number: 31 },
    { id: "p2", name: "Kyle Walker", position: "Defender", number: 2 },
    { id: "p3", name: "Rúben Dias", position: "Defender", number: 3 },
    { id: "p4", name: "Joško Gvardiol", position: "Defender", number: 24 },
    { id: "p5", name: "Manuel Akanji", position: "Defender", number: 25 },
    { id: "p6", name: "John Stones", position: "Defender", number: 5 },
    { id: "p7", name: "Rodri", position: "Midfielder", number: 16 },
    { id: "p8", name: "Kevin De Bruyne", position: "Midfielder", number: 17 },
    { id: "p9", name: "Phil Foden", position: "Midfielder", number: 47 },
    { id: "p12", name: "Erling Haaland", position: "Forward", number: 9 },
    { id: "p10", name: "Bernardo Silva", position: "Midfielder", number: 20 },
    { id: "p11", name: "Julián Álvarez", position: "Forward", number: 19 },
    { id: "p13", name: "Jack Grealish", position: "Midfielder", number: 10 },
    { id: "p14", name: "Matheus Nunes", position: "Midfielder", number: 27 },
    { id: "p15", name: "Mateo Kovačić", position: "Midfielder", number: 8 },
    { id: "p16", name: "Sergio Gómez", position: "Defender", number: 21 },
    { id: "p17", name: "Stefan Ortega", position: "Goalkeeper", number: 18 },
    { id: "p18", name: "Oscar Bobb", position: "Forward", number: 52 },
    { id: "p19", name: "Rico Lewis", position: "Defender", number: 82 },
    { id: "p20", name: "Jérémy Doku", position: "Forward", number: 11 },
    { id: "p21", name: "Kalvin Phillips", position: "Midfielder", number: 4 },
    { id: "p22", name: "Scott Carson", position: "Goalkeeper", number: 33 },
  ],
  grid: formations["4-4-2"].map((slot) => ({
    ...slot,
    assignedPlayerId: undefined,
  })),
};

console.log(initialState);

export const lineupSlice = createSlice({
  name: "lineup",
  initialState,
  reducers: {
    assignPlayerToSlot(
      state,
      action: PayloadAction<{ slotId: string; playerId: string }>
    ) {
      const slot = state.grid.find((s) => s.id === action.payload.slotId);
      if (slot) {
        slot.assignedPlayerId = action.payload.playerId;
      }
    },
    removePlayerFromSlot(state, action: PayloadAction<{ slotId: string }>) {
      const slot = state.grid.find((s) => s.id === action.payload.slotId);
      if (slot) {
        slot.assignedPlayerId = undefined;
      }
    },
    resetLineup(state) {
      state.grid.forEach((slot) => {
        slot.assignedPlayerId = undefined;
      });
    },
    setFormation(state, action: PayloadAction<GridSlot[]>) {
      // Reset grid to new formation, clear assignments
      state.grid = action.payload.map((slot) => ({
        ...slot,
        assignedPlayerId: undefined,
      }));
    },
    loadLineup(state, action: PayloadAction<GridSlot[]>) {
      state.grid = action.payload;
    },
    autoAssign(state) {
      // Clear existing assignments
      state.grid.forEach((slot) => {
        slot.assignedPlayerId = undefined;
      });

      // Get available players grouped by position
      const availablePlayersByPosition = {
        Goalkeeper: state.players.filter((p) => p.position === "Goalkeeper"),
        Defender: state.players.filter((p) => p.position === "Defender"),
        Midfielder: state.players.filter((p) => p.position === "Midfielder"),
        Forward: state.players.filter((p) => p.position === "Forward"),
      };

      console.log(availablePlayersByPosition);

      // Position mapping for grid slots to player positions
      const positionMapping: Record<string, string> = {
        GK: "Goalkeeper",
        LB: "Defender",
        CB: "Defender",
        RB: "Defender",
        LWB: "Defender",
        RWB: "Defender",
        CDM: "Midfielder",
        CM: "Midfielder",
        CAM: "Midfielder",
        LM: "Midfielder",
        RM: "Midfielder",
        ST: "Forward",
        LW: "Forward",
        RW: "Forward",
      };

      // Track used players
      const usedPlayerIds = new Set<string>();
      console.log(usedPlayerIds);

      // Auto-assign players to grid slots
      state.grid.forEach((slot) => {
        const requiredPosition = positionMapping[slot.position];
        if (requiredPosition) {
          const availablePlayers =
            availablePlayersByPosition[
              requiredPosition as keyof typeof availablePlayersByPosition
            ];
          const unassignedPlayer = availablePlayers.find(
            (p) => !usedPlayerIds.has(p.id)
          );

          if (unassignedPlayer) {
            slot.assignedPlayerId = unassignedPlayer.id;
            usedPlayerIds.add(unassignedPlayer.id);
          }
        }
      });
    },
  },
});

export const { assignPlayerToSlot, removePlayerFromSlot, resetLineup, setFormation, loadLineup, autoAssign } =
  lineupSlice.actions;
export default lineupSlice.reducer;
