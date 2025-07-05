import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import { resetLineup, loadLineup, autoAssign } from "../../store/lineupSlice";
import type { RootState } from "../../store/store";
import { useState, useEffect } from "react";

export default function Controls() {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [hasSavedData, setHasSavedData] = useState(false);
  const grid = useSelector((state: RootState) => state.lineup.grid);

  // Check if saved data exists
  useEffect(() => {
    const saved = localStorage.getItem("lineup");
    setHasSavedData(!!saved);
  }, [grid]); // Re-check when grid changes (after saving)

  function handleLoad() {
    const saved = localStorage.getItem("lineup");
    if (saved) {
      dispatch(loadLineup(JSON.parse(saved)));
    }
  }

  function handleSave() {
    const allFilled = grid.every((slot) => slot.assignedPlayerId);
    if (!allFilled) {
      setError("Can't save: All grid slots must have a player assigned.");
      alert("Please assign players to all slots before saving.");
      return;
    }
    localStorage.setItem("lineup", JSON.stringify(grid));
    setError(""); // Clear error if successful
    setHasSavedData(true); // Update state to enable Load button
    alert("Lineup saved!");
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-4 justify-center">
        <Button onClick={() => dispatch(resetLineup())}>Reset</Button>
        <Button onClick={() => dispatch(autoAssign())}>Auto Assign</Button>
        <Button onClick={handleSave}>Save</Button>
        <Button
          onClick={handleLoad}
          disabled={!hasSavedData}
          className={`${!hasSavedData ? "opacity-50 cursor-not-allowed" : ""}`}
          title={!hasSavedData ? "No saved lineup found" : "Load saved lineup"}
        >
          Load
        </Button>
      </div>
      {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
    </div>
  );
}
