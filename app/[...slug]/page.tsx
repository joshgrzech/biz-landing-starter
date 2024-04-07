import { client } from "../../tina/__generated__/databaseClient";
import Page from "@/CMS/CMSPage";
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
export async function generateStaticParams() {
  // Call an API endpoint to get posts
  const pagesResponse = await client.queries.pageConnection();
  const pages = pagesResponse?.data?.pageConnection?.edges || [];
  const paths = pages.map((page) => {
    const slug =
      page?.node?._sys.path.split("content/pages/")[1].split(".md")[0] ?? "";

    const slugArray = slug.split("/");

    return { slug: slugArray };
  });

  return paths;
}

async function getData(slug: string[]) {
  return await client.queries.page({
    relativePath: slug.join("/") + ".md",
  });
}

export default async function Post({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const { data, variables, query } = await getData(slug);

  return <Page data={JSON.parse(JSON.stringify(data))} />;
}
