import "styles/globals.css";
import { siteConfig } from "../lib/config/site";
import { Providers } from "./providers";
import { Navbar } from "@/SiteNavbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { client } from "../tina/__generated__/databaseClient";
import TinaIcon from "@/TinaIcon";
import { getAverageLuminance, tinaGradientToJsx } from "../lib/utils";
import type { Metadata, ResolvingMetadata } from "next";
import {
  SiteConfigNavbar,
  SiteConfigSocialLinks,
} from "../tina/__generated__/types";
import { fontObjects } from "../lib/fonts";
import { NextFont } from "next/dist/compiled/@next/font";
import dynamic from "next/dynamic";

const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

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

  const configResponse = await client.queries.siteConfig({
    relativePath: "config.md",
  });
  if (configResponse.errors) return metadata;

  const config = configResponse.data?.siteConfig;
  return {
    title: config.title,
    description: config.description,
    icons: config.favicon,
  };
}

async function getData() {
  const pagesResponse = await client.queries.pageConnection();
  const pages = pagesResponse?.data?.pageConnection?.edges || [];
  const paths = pages.map((page) => {
    const slug =
      page?.node?._sys.path.split("content/pages/")[1].split(".md")[0] ?? "";

    return slug;
  });
  const configResponse = await client.queries.siteConfig({
    relativePath: "config.md",
  });

  const socialLinks = configResponse?.data?.siteConfig?.socialLinks ?? [];

  const siteFont = configResponse?.data?.siteConfig?.fontPair
    ? JSON.parse(configResponse?.data?.siteConfig?.fontPair)
    : null;
  const primaryFont = fontObjects[siteFont?.primary];
  const secondaryFont = fontObjects[siteFont?.secondary];
  const configBackground = configResponse?.data?.siteConfig?.backgroundColor
    ? JSON.parse(configResponse?.data?.siteConfig?.backgroundColor)
    : {};

  const backgroundImage = configResponse?.data?.siteConfig?.backgroundImage;

  const navbar = configResponse?.data?.siteConfig?.navbar;
  const logo = configResponse?.data?.siteConfig?.logo;
  const props = JSON.parse(
    JSON.stringify({
      paths,
      socialLinks,
      configBackground,
      siteFont,
      primaryFont,
      secondaryFont,
      backgroundImage,
      navbar,
      logo,
    })
  );
  return props;
}

interface CMSData {
  paths: string[];
  socialLinks: SiteConfigSocialLinks[];
  configBackground: any;
  siteFont: {
    primary: string;
    secondary: string;
  };
  primaryFont: NextFont;
  secondaryFont: NextFont;
  backgroundImage: any;
  navbar: SiteConfigNavbar;
  logo: string;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    paths,
    socialLinks,
    configBackground,
    siteFont,
    primaryFont,
    secondaryFont,
    backgroundImage,
    navbar,
    logo,
  }: CMSData = await getData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx("min-h-screen bg-background antialiased")}>
        <div
          style={{
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backdropFilter: "blur(10px)",
            backgroundBlendMode: "overlay",
            position: "absolute",
            height: "100%",
            width: "100%",
            filter: "blur(15px) ",
            opacity: 0.5,
            ...tinaGradientToJsx({
              backgroundColor: configBackground,
              backgroundImage: backgroundImage ?? {},
            }),
          }}
          className={"z-0"}
        />
        <div className="relative flex flex-col h-screen shadow-lg">
          <Providers
            themeProps={{ attribute: "class" }}
            fonts={{
              primaryFont,
              secondaryFont,
            }}
          >
            <Navbar
              pages={paths}
              data={{
                siteConfig: {
                  navbar: navbar as SiteConfigNavbar,
                  socialLinks: socialLinks as SiteConfigSocialLinks[],
                  logo: logo as string,
                },
              }}
            />
            <main
              className="container mx-auto max-w-7xl pt-16 px-6 flex-grow"
              style={{
                color: backgroundImage?.src
                  ? backgroundImage.lightContent
                    ? "black"
                    : getAverageLuminance(configBackground.value) > 0.5
                    ? "black"
                    : "inherit"
                  : "inherit",
              }}
            >
              {children}
            </main>

            <footer className="hidden md-sm:flex w-full items-center justify-center py-3 gap-4 absolute bottom-0">
              {socialLinks.map((link, i) => {
                if (link?.url && link?.icon) {
                  return (
                    <Link
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TinaIcon
                        name={link.icon}
                        color={
                          getAverageLuminance(configBackground.value) > 0.5
                            ? "rgba(0,0,0,0.75)"
                            : "rgba(255,255,255,0.75)"
                        }
                      />
                    </Link>
                  );
                }
              })}
            </footer>
          </Providers>
        </div>
      </body>
    </html>
  );
}
