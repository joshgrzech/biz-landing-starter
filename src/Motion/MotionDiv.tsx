import clsx from "clsx";
import ClientDiv from "./DynamicComponents/ClientDiv";
export interface BaseMotionDivProps {
  children: React.ReactNode;
  layoutId: string;
  initial?: any;
  animate?: any;
  exit?: any;
  style?: React.CSSProperties;
  className?: string;
  variants?: any;
}

export const baseProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { delay: 0.5, duration: 0.25, easing: "easeInOut" },
};

const MotionDiv = ({
  children,
  layoutId,
  initial,
  animate,
  exit,
  style,
  className,
  variants,
}: BaseMotionDivProps) => {
  const isClient = typeof window !== "undefined";

  if (!isClient)
    return (
      <div className={clsx(className)} style={style}>
        {children}
      </div>
    );

  return (
    <ClientDiv
      layoutId={layoutId}
      initial={initial ?? baseProps.initial}
      animate={animate ?? baseProps.animate}
      exit={exit ?? baseProps.exit}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </ClientDiv>
  );
};

export default MotionDiv;
