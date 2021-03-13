import React from "react";
import { SocketProvider } from "./context/SocketContext";
import { MapaPage } from "./pages/MapaPage";

export const MapasApp = () => {
  return (
    <div>
      <SocketProvider>
        <MapaPage />
      </SocketProvider>
    </div>
  );
};
