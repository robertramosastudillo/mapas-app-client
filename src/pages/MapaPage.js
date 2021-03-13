import React, { useEffect } from "react";
import { useMapbox } from "../hooks/useMapbox";

const puntoInicial = {
  lng: -76.2192,
  lat: 3.0975,
  zoom: 5,
};

export const MapaPage = () => {
  const { coords, setRef, nuevoMarcador$, movimientoMarcador$ } = useMapbox(
    puntoInicial
  );

  useEffect(() => {
    nuevoMarcador$.subscribe((marcador) => {
      console.log(marcador);
    });
  }, [nuevoMarcador$]);

  useEffect(() => {
    movimientoMarcador$.subscribe((marcador) => {
      console.log(marcador);
    });
  }, [movimientoMarcador$]);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom},
      </div>
      <div ref={setRef} className="mapContainer"></div>
    </>
  );
};
