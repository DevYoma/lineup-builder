import React from "react";
import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";
// import { RootState } from "../../store/store";
import type { RootState } from "../../store/store";
import PlayerCard from "../PlayerCard/PlayerCard";

export default function Sidebar() {
  const players = useSelector((state: RootState) => state.lineup.players);
  const grid = useSelector((state: RootState) => state.lineup.grid);

  // Filter unassigned players
  const assignedIds = grid.map((slot) => slot.assignedPlayerId).filter(Boolean);
  const unassignedPlayers = players.filter((p) => !assignedIds.includes(p.id));

  return (
    <div className="w-1/4 h-full bg-white p-4 rounded shadow border border-red-500 flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Available Players</h2>
      <div className="space-y-2 flex-1 overflow-y-auto">
        {unassignedPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
