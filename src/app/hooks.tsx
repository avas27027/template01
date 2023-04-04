import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useEffect, useState } from 'react';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
  
    useEffect(() => {
      const updatePosition = () => {
        setScrollPosition(window.pageYOffset);
      }
      window.addEventListener("scroll", updatePosition);
      updatePosition();
      return () => window.removeEventListener("scroll", updatePosition);
    }, []);
  
    return scrollPosition;
  };
  