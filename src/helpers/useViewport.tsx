import {useState, useEffect} from 'react';

const useViewport = () => {
  const [WidthMoreThanHeight, setWidthMoreThanHeight] = useState<boolean>(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= window.innerHeight) {
        setWidthMoreThanHeight(true);
      } else {
        setWidthMoreThanHeight(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return WidthMoreThanHeight;
}

export default useViewport;
