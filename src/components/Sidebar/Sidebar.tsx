import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { removePlayerFromSlot } from "../../store/lineupSlice";
import PlayerCard from "../PlayerCard/PlayerCard";
import { useDrop } from "react-dnd";

export default function Sidebar() {
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.lineup.players);
  const grid = useSelector((state: RootState) => state.lineup.grid);

  // Filter unassigned players
  const assignedIds = grid.map((slot) => slot.assignedPlayerId).filter(Boolean);
  const unassignedPlayers = players.filter((p) => !assignedIds.includes(p.id));

  // Drop zone for removing players from grid
  const [{ isOver }, drop] = useDrop({
    accept: "PLAYER",
    drop: (item: { id: string; fromSlot?: string }) => {
      if (item.fromSlot) {
        // Remove player from grid slot back to sidebar
        dispatch(removePlayerFromSlot({ slotId: item.fromSlot }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`w-1/4 h-full bg-white p-4 rounded shadow border border-red-500 flex flex-col transition-colors ${
        isOver ? "bg-red-50 border-red-400" : ""
      }`}
    >
      <h2 className="text-lg font-semibold mb-2">
        Available Players
        {isOver && <span className="text-red-600 ml-2">(Drop to remove)</span>}
      </h2>
      <div className="space-y-2 flex-1 overflow-y-auto">
        {unassignedPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
