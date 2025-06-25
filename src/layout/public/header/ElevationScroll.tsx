import React, { type ReactElement } from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger'; 
import { type AppBarProps } from '@mui/material/AppBar';

interface ElevationScrollProps {
  /** Debe ser un único elemento hijo con props de AppBar */
  children: ReactElement<AppBarProps>;
}

/**
 * Eleva el AppBar cuando el usuario hace scroll.
 * El truco está en tipar `children` como ReactElement<AppBarProps>,
 * así TS reconoce la prop `elevation`. 
 */
export default function ElevationScroll({
  children,
}: ElevationScrollProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  }); // Devuelve true si el scroll supera el umbral :contentReference[oaicite:0]{index=0}

  // Clona el AppBar inyectando la prop elevation correctamente tipada :contentReference[oaicite:1]{index=1}
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
