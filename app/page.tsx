import { client } from "cms/__generated__/databaseClient";
import CMSPage from "@/CMS/CMSPage";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  const pageResponse = await client.queries.page({
    relativePath: "home.md",
  });

  if (pageResponse.errors || !pageResponse) return (await parent) as Metadata;

  const resolvedParent = await parent;
  return {
    title: pageResponse.data.page.seoTitle ?? resolvedParent.title,
    description:
      pageResponse.data.page.seoDescription ?? resolvedParent.description,
  };
}

async function getData() {
  const response = await client.queries.page({
    relativePath: "home.md",
  });
  const parsed = JSON.parse(JSON.stringify(response));
  return {
    data: parsed.data,
    query: parsed.query,
    variables: parsed.variables,
  };
}

export default async function Post() {
  const { data } = await getData();
  return <CMSPage data={data} />;
}
