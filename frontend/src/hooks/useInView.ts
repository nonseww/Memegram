import { useState, useRef, useEffect } from "react";

export const useInView = (margin: string = "350px") => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);

          if (containerRef.current) observer.unobserve(containerRef.current);
        }
      },
      {
        rootMargin: `${margin} 0px ${margin} 0px`,
      },
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [margin]);

  return { isInView, containerRef };
};
