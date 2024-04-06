"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

const ClientLink = ({ href, label }: { href?: string; label: string }) => {
  const path = usePathname();

  const isActive =
    href === "/"
      ? path === "/"
      : href
      ? path?.includes(href)
      : path?.includes(label);

  const itemVariants = {
    hover: { scale: 1.1 },
    active: { scale: 1.1 },
    inactive: { scale: 1 },
  };

  return (
    <motion.div
      layoutId={label}
      whileHover="hover"
      animate={isActive ? "active" : "inactive"}
      variants={itemVariants}
    >
      {href ? (
        <Link href={href}>
          <span className={clsx(isActive ? "font-bold" : "font-normal")}>
            {label}
          </span>
        </Link>
      ) : (
        <span className={clsx(isActive ? "font-bold" : "font-normal")}>
          {label}
        </span>
      )}
    </motion.div>
  );
};

export default ClientLink;
