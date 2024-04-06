import dynamic from "next/dynamic";
import React from "react";
const TextRender = ({ string }: { string?: string | null }) => {
  const ClientMarkdownRender = dynamic(() => import("./ClientMarkdownRender"), {
    ssr: false,
    loading: () => <div>{string}</div>,
  });
  if (!string) return null;
  return (
    //@ts-ignore
    <ClientMarkdownRender string={string} />
  );
};

export default TextRender;
