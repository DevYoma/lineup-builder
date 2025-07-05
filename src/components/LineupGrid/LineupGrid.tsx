import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import type { GridSlot, Player } from "../../types/types";
import {
  setFormation,
  formations,
  assignPlayerToSlot,
  removePlayerFromSlot,
} from "../../store/lineupSlice";
import { useDrop, useDrag } from "react-dnd";

export default function LineupGrid() {
  const dispatch = useDispatch();
  const grid = useSelector((state: RootState) => state.lineup.grid);
  const players = useSelector((state: RootState) => state.lineup.players);

  const getPlayer = (playerId?: string) =>
    players.find((p) => p.id === playerId);

  function handleFormationChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const formation = formations[e.target.value];
    if (formation) {
      dispatch(setFormation(formation));
    }
  }

  return (
    <div className="w-full border border-yellow-500 overflow-clip">
      {/* Formation selector above the grid */}
      <div className="mb-4">
        <select onChange={handleFormationChange} className="p-2 rounded border">
          {Object.keys(formations).map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <div
        className="p-6 rounded shadow w-full h-full"
        style={{
          background: "linear-gradient(135deg, #228B22 80%, #006400 100%)",
          width: "100%",
          height: "60%",
          display: "grid",
          gridTemplateRows: "repeat(4, 1fr)",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "16px",
          alignItems: "center",
          justifyItems: "center",
          border: "4px solid #fff",
          boxShadow: "0 0 24px #228B22",
        }}
      >
        {grid.map((slot) => (
          <Slot
            key={slot.id}
            slot={slot}
            player={getPlayer(slot.assignedPlayerId)}
            dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  );
}

type SlotProps = {
  slot: GridSlot;
  player?: Player;
  dispatch: ReturnType<typeof useDispatch>;
};

function Slot({ slot, player, dispatch }: SlotProps) {
  // Drop functionality for receiving players
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "PLAYER",
    drop: (item: { id: string; fromSlot?: string }) => {
      if (item.fromSlot) {
        // Player is being moved from another grid slot
        // First remove from old slot
        dispatch(removePlayerFromSlot({ slotId: item.fromSlot }));
      }
      // Then assign to new slot
      dispatch(assignPlayerToSlot({ slotId: slot.id, playerId: item.id }));
    },
    canDrop: () => !player, // Only allow drop if slot is empty
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // Drag functionality for assigned players
  const [{ isDragging }, drag] = useDrag({
    type: "PLAYER",
    item: player ? { id: player.id, fromSlot: slot.id } : null,
    canDrag: () => !!player, // Only allow drag if player exists
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Combine drag and drop refs
  const dragDropRef = (node: HTMLDivElement | null) => {
    drag(node);
    drop(node);
  };

  return (
    <div
      ref={dragDropRef}
      style={{
        gridRow: 4 - slot.y,
        gridColumn: slot.x + 1,
        background: isOver && canDrop ? "#bbf7d0" : "rgba(255,255,255,0.9)",
        borderRadius: 8,
        minWidth: 80,
        minHeight: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        border: isOver && canDrop ? "2px solid #22c55e" : undefined,
        transition: "background 0.2s, border 0.2s",
        opacity: isDragging ? 0.5 : 1,
        cursor: player ? "grab" : "default",
      }}
    >
      <div className="text-xs text-gray-500 mb-1">{slot.position}</div>
      {player ? (
        <div className="font-semibold text-center">
          {player.name} #{player.number}
        </div>
      ) : (
        <div className="text-gray-400">Empty</div>
      )}
    </div>
  );
}
