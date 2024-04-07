import { client } from "cms/__generated__/databaseClient";
import BasePreview from "@/CMS/Preview/PreviewComponent";

export async function generateStaticParams() {
  // Call an API endpoint to get posts
  const pagesResponse = await client.queries.componentConnection();
  const pages = pagesResponse?.data?.componentConnection?.edges || [];
  const paths = pages.map((component) => {
    const slug =
      component?.node?._sys.path
        .split("content/component/")[1]
        .split(".md")[0] ?? "";

    return { slug };
  });

  return paths;
}

async function getData(slug: string) {
  return await client.queries.component({
    relativePath: slug + ".md",
  });
}

export default async function Post({
  params: { slug },
}: {
  params: { slug: string };
}) {
  console.log("slug", slug);
  const { data, variables, query } = await getData(slug);

  return (
    <BasePreview
      data={JSON.parse(JSON.stringify(data))}
      query={query}
      variables={variables}
    />
  );
}
