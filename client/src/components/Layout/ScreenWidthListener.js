import { useEffect, useState, useCallback } from 'react';

export default function ScreenWidthListener() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleWindowResize = useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  return { screenWidth };
}
