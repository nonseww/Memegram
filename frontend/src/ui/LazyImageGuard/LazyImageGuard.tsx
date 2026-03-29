import { useImageLazyLoad } from "@/hooks/useImageLazyLoad";
import { useInView } from "@/hooks/useInView";
import { Box, display, positions } from "@mui/system";
import type { ReactNode } from "react";

interface LazyImageGuardProps {
  src: string;
  skeleton: ReactNode;
  children: (props: any) => ReactNode;
  minHeight: number | string;
  viewHeight: string;
}

export const LazyImageGuard = ({
  src,
  skeleton,
  children,
  minHeight,
  viewHeight,
}: LazyImageGuardProps) => {
  const { isInView, containerRef } = useInView(viewHeight);
  const { isLoaded, isError, imageRef, handleLoad, handleError } =
    useImageLazyLoad(isInView && src ? src : "");

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        minHeight: isLoaded ? "auto" : minHeight,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {(!isInView || !isLoaded) && skeleton}

      {isInView &&
        children({
          ref: imageRef,
          onLoad: handleLoad,
          onError: handleError,
          sx: {
            opacity: isLoaded ? 1 : 0,
            position: isLoaded ? "static" : "absolute",
            top: 0,
            left: 0,
            transition: "opacity 0.2s ease-in-out",
          },
        })}
    </Box>
  );
};
