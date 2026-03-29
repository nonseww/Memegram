import { useState, useRef, useEffect } from "react";

export const useImageLazyLoad = (src: string) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) return;
    const img = imageRef.current;

    if (img && img.complete) {
      if (img.naturalWidth === 0) {
        setIsError(true);
      } else {
        setIsLoaded(true);
      }
      return;
    }

    setIsLoaded(false);
    setIsError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsLoaded(true);
    setIsError(true);
  };

  return { isLoaded, isError, imageRef, handleLoad, handleError };
};
