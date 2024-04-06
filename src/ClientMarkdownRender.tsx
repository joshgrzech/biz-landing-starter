"use client";
import React from "react";
import Markdown from "react-markdown";
const ClientMarkdownRender = ({ string }: { string: string }) => {
  return (
    <Markdown
      components={{
        h1: "h2",
      }}
    >
      {string}
    </Markdown>
  );
};

export default ClientMarkdownRender;
