"use client";

import { motion } from "framer-motion";
import { BaseMotionDivProps, baseProps } from "../MotionDiv";
import clsx from "clsx";
const ClientDiv = ({
  children,
  layoutId,
  initial,
  animate,
  exit,
  className,
  style,
  variants,
}: BaseMotionDivProps) => {
  if (window?.location.pathname.includes("preview")) {
    return (
      <div className={clsx(className)} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      layoutId={layoutId}
      initial={initial ?? baseProps.initial}
      animate={animate ?? baseProps.animate}
      exit={exit ?? baseProps.exit}
      className={clsx(className)}
      style={style}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ClientDiv;
