// src/App.tsx
import React from "react";
import Board from "./pages/Board";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Board />
    </div>
  );
};

export default App;
