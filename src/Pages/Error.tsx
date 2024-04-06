//404 ui landing page
"use client";
import React from "react";
import { PageError } from "cms/__generated__/types";

function Error(props: {
  data: { page: PageError };
  variables: object;
  query: string;
}) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">
          {props.data.page.header?.heroText}
        </h1>
      </div>
    </div>
  );
}

export default Error;
