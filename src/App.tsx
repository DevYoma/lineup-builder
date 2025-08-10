import { useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Controls from "./components/Controls/Controls";
import LineupGrid from "./components/LineupGrid/LineupGrid";
import { useDispatch } from "react-redux";
import { loadLineup } from "./store/lineupSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("lineup");
    if (saved) {
      dispatch(loadLineup(JSON.parse(saved)));
    }
  })

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Lineup Builder</h1>
      <div className="flex flex-1 gap-4 border border-gray-300 p-4 rounded-lg h-[700px]">
        <Sidebar />
        <LineupGrid />
      </div>
      <Controls />
    </div>
  );
}
