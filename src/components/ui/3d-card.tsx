"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useIsTouch } from "@/components/motion/Reveal";

import React, {
  createContext,
  useState,
  useContext,
  useRef,
} from "react";

type CardCtx = {
  isMouseEntered: boolean;
  /** false em touch ou prefers-reduced-motion: o efeito 3D fica desligado. */
  enabled: boolean;
};

const MouseEnterContext = createContext<CardCtx | undefined>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const reduced = useReducedMotion();
  const touch = useIsTouch();
  // Só ativa o tilt em dispositivos com hover real e sem redução de movimento.
  const enabled = !reduced && !touch;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseEnter = () => {
    if (!enabled) return;
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    if (!enabled || !containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={{ isMouseEntered, enabled }}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={enabled ? { perspective: "1000px" } : undefined}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative transition-transform duration-200 ease-out",
            className,
          )}
          style={enabled ? { transformStyle: "preserve-3d" } : undefined}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: unknown;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isMouseEntered, enabled } = useMouseEnter();

  React.useEffect(() => {
    if (!ref.current) return;
    // Sem 3D (touch / reduced-motion) o item nunca sai do plano: fica estático.
    if (enabled && isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = "";
    }
  }, [isMouseEntered, enabled, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Tag
      ref={ref}
      className={cn("transition-transform duration-200 ease-out", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Hook para consumir o contexto do cartão.
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a CardContainer");
  }
  return context;
};
