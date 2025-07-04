import React from "react";
import type { Player } from "../../types/types";
import { useDrag } from "react-dnd";

interface Props {
  player: Player;
}

export default function PlayerCard({ player }: Props) {

  const [{ isDragging }, drag] = useDrag({
    type: "PLAYER",
    item: { id: player.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="bg-blue-500 text-white p-2 rounded shadow cursor-pointer hover:bg-blue-600 transition"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span className="font-semibold">{player.name}</span> #{player.number}
    </div>
  );
}
