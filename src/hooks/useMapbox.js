import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { v4 } from "uuid";

mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9iZXJ0cmFtb3Nhc3R1ZGlsbG8iLCJhIjoiY2ttNWNuM3ltMGQycjJ3cXJpNnM4ZzU4ZSJ9.UhQxoQ82O09Dn_L6I88x0A";

export const useMapbox = (puntoInicial) => {
  const mapaDiv = useRef();
  const setRef = useCallback((node) => {
    mapaDiv.current = node;
  }, []);

  const marcadores = useRef({});

  const mapa = useRef();
  const [coords, setCoords] = useState(puntoInicial);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    });
    mapa.current = map;
  }, [puntoInicial]);

  useEffect(() => {
    mapa.current?.on("move", () => {
      const { lng, lat } = mapa.current.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.current.getZoom().toFixed(2),
      });
    });
  }, []);

  useEffect(() => {
    mapa.current?.on("click", (ev) => {
      const { lng, lat } = ev.lngLat;
      const marker = new mapboxgl.Marker();
      marker.id = v4();
      marker.setLngLat([lng, lat]).addTo(mapa.current).setDraggable(true);

      marcadores.current[marker.id] = marker;
    });
  }, []);

  return {
    coords,
    setRef,
    marcadores,
  };
};
