"use client";
import { Component } from "cms/__generated__/types";
import { useTina } from "tinacms/dist/react";
import CMSComponent from "../CMSComponent";
export default function BasePreview(props: {
  data: { component: Component };
  variables: any;
  query: any;
}) {
  const { data } = useTina(props);
  return <CMSComponent data={data.component} />;
}
