"use client";
import { Component, Page } from "cms/__generated__/types";
import CMSPage from "../CMSPage";
import { useTina } from "tinacms/dist/react";

export default function BasePreview(props: {
  data: { page: Page };
  variables: any;
  query: any;
}) {
  const { data } = useTina(props);
  return <CMSPage data={data} />;
}
