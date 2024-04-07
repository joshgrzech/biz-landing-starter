import { client } from "cms/__generated__/databaseClient";
import Page from "@/CMS/CMSPage";
import BasePreview from "@/CMS/Preview/PreviewPage";

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

  return (
    <BasePreview
      data={JSON.parse(JSON.stringify(data))}
      query={query}
      variables={variables}
    />
  );
}
