import Link from "next/link";
import { getAverageLuminance } from "../../lib/utils";
import TextRender from "../TextRender";
import { Component } from "cms/__generated__/types";
import MotionDiv from "../Motion/MotionDiv";

export default function CMSComponent({ data }: { data: Component }) {
  if (!data) return <div />;
  const { primaryColorOverride, secondaryColorOverride } = data.cta ?? {};

  const lightMode =
    getAverageLuminance(
      primaryColorOverride ?? data.primaryColor ?? "rgb(0,0,0)"
    ) > 0.5;
  return (
    <MotionDiv
      layoutId="CMSComponent"
      className="w-full py-6 md:py-12 rounded-lg"
      style={{
        color: lightMode ? "black" : "inherit",
        background: primaryColorOverride ?? data.primaryColor ?? "transparent",
        overflow: "hidden",
      }}
    >
      <MotionDiv
        layoutId="CMSComponentContainer"
        className="container flex flex-col items-center gap-4 px-4 md:px-6"
      >
        <MotionDiv
          layoutId="CMSComponentContent"
          className="flex flex-col items-center gap-2 text-center"
        >
          {data.title && (
            <MotionDiv
              layoutId="CMSComponentTagline"
              className="text-5xl font-semibold tracking-tighter"
              style={{ color: lightMode ? "black" : "inherit" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { delay: 0.2, duration: 0.25 },
                },
              }}
            >
              <TextRender string={data.title} />
            </MotionDiv>
          )}
          {data.tagline && (
            <MotionDiv
              layoutId="CMSComponentTagline"
              className="text-3xl font-semibold tracking-tighter"
              style={{ color: lightMode ? "black" : "inherit" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { delay: 0.2, duration: 0.25 },
                },
              }}
            >
              <TextRender string={data.tagline} />
            </MotionDiv>
          )}
          {data.body && (
            <MotionDiv
              layoutId="CMSComponentBody"
              className="text-2xl tracking-tighter"
              style={{ color: lightMode ? "black" : "inherit" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { delay: 0.2, duration: 0.25 },
                },
              }}
            >
              <TextRender string={data.body} />
            </MotionDiv>
          )}
        </MotionDiv>
        {data.cta && (
          <Link
            className="inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href={data.cta?.link ?? "/"}
            style={{
              color:
                getAverageLuminance(
                  secondaryColorOverride ??
                    data.secondaryColor ??
                    "rgb(255,255,255)"
                ) > 0.5
                  ? "black"
                  : "inherit",
            }}
          >
            {data.cta?.label ?? "Click Here"}
          </Link>
        )}
      </MotionDiv>
    </MotionDiv>
  );
}
