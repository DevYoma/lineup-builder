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
    { id: "u1", name: "Altay Bayındır", position: "Goalkeeper", number: 1 },
    { id: "u2", name: "Tom Heaton", position: "Goalkeeper", number: 22 },
    { id: "u3", name: "André Onana", position: "Goalkeeper", number: 24 },
    { id: "u4", name: "Diogo Dalot", position: "Defender", number: 2 },
    { id: "u5", name: "Matthijs de Ligt", position: "Defender", number: 4 },
    { id: "u6", name: "Leny Yoro", position: "Defender", number: 15 },
    { id: "u7", name: "Harry Maguire", position: "Defender", number: 5 },
    { id: "u8", name: "Patrick Dorgu", position: "Defender", number: 13 },
    { id: "u9", name: "Ayden Heaven", position: "Defender", number: 26 },
    { id: "u10", name: "Diego León", position: "Defender", number: 30 },
    { id: "u11", name: "Tyrell Malacia", position: "Defender", number: 12 },
    { id: "u12", name: "Noussair Mazraoui", position: "Defender", number: 3 },
    { id: "u13", name: "Bruno Fernandes", position: "Midfielder", number: 8 },
    { id: "u14", name: "Casemiro", position: "Midfielder", number: 18 },
    { id: "u15", name: "Manuel Ugarte", position: "Midfielder", number: 25 },
    { id: "u16", name: "Kobbie Mainoo", position: "Midfielder", number: 37 },
    { id: "u17", name: "Sékou Koné", position: "Midfielder", number: 42 },
    { id: "u18", name: "Jack Fletcher", position: "Midfielder", number: 38 },
    { id: "u19", name: "Bendito Mantato", position: "Midfielder", number: 70 },
    { id: "u20", name: "Rasmus Højlund", position: "Forward", number: 9 },
    { id: "u21", name: "Matheus Cunha", position: "Forward", number: 10 },
    { id: "u22", name: "Joshua Zirkzee", position: "Forward", number: 11 },
    { id: "u23", name: "Amad", position: "Forward", number: 16 },
    { id: "u24", name: "Alejandro Garnacho", position: "Forward", number: 17 },
    { id: "u25", name: "Bryan Mbeumo", position: "Forward", number: 19 },
    { id: "u26", name: "Benjamin Šeško", position: "Forward", number: 30 }
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
