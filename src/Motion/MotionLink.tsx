import Link from "next/link";
import dynamic from "next/dynamic";
import { FaChevronDown } from "react-icons/fa6";

const MotionLink = ({ href, label }: { href?: string; label: string }) => {
  const ClientLink = dynamic(() => import("./DynamicComponents/ClientLink"), {
    ssr: false,
    loading: () => {
      return <a href={href}>{label}</a>;
    },
  });
  return (
    //@ts-ignore
    <ClientLink href={href} label={label} />
  );
};

export default MotionLink;
