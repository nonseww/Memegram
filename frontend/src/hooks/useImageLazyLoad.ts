import { useState, useRef, useEffect } from "react";

export const useImageLazyLoad = (src: string) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) return;

    setIsLoaded(false);
    setIsError(false);

    if (imageRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsLoaded(true);
    setIsError(true);
  };

  return { isLoaded, isError, imageRef, handleLoad, handleError };
};
