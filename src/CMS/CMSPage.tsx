import {
  Component,
  Page,
  SiteConfigBackgroundImage,
} from "../../tina/__generated__/types";
import Image from "next/image";
import { title, subtitle } from "../primitives";
import { getAverageLuminance, tinaGradientToJsx } from "../../lib/utils";
import React from "react";
import CMSComponent from "./CMSComponent";
import MotionDiv from "../Motion/MotionDiv";

import clsx from "clsx";

export function getHeaderVariantClass(variant?: string | null) {
  let classNames = {
    containerVariant: "",
    headerTextVariant: "",
    subheaderTextVariant: "",
  };

  switch (variant) {
    case "variantOne":
      classNames.containerVariant = "text-center";
      classNames.headerTextVariant = "text-4xl font-semibold";
      classNames.subheaderTextVariant = "text-lg font-light mt-2";
      break;
    case "variantTwo":
      classNames.containerVariant = "text-left";
      classNames.headerTextVariant = "text-3xl font-bold mt-1";
      classNames.subheaderTextVariant =
        "text-base font-medium uppercase tracking-wide";
      break;
    case "variantThree":
      classNames.containerVariant = "text-right";
      classNames.headerTextVariant = "text-4xl font-bold";
      classNames.subheaderTextVariant = "text-md font-light mt-1";
      break;
    case "variantFour":
      classNames.containerVariant = "relative text-center";
      classNames.headerTextVariant = "text-5xl font-bold z-10 relative";
      classNames.subheaderTextVariant =
        "text-xl font-light absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-75";
      break;
    default:
      classNames.containerVariant =
        "inline text-center justify-center px-20 py-10 rounded-lg";
      classNames.headerTextVariant = title();
      classNames.subheaderTextVariant = subtitle();
      break;
  }

  return classNames;
}

function CMSPage(props: { data: { page: Page } }) {
  const page = props.data.page;
  const { backgroundImage, header } = page;
  const { containerVariant, headerTextVariant, subheaderTextVariant } =
    getHeaderVariantClass(header?.variant);
  const backgroundColorObject = page.backgroundColor
    ? JSON.parse(page.backgroundColor)
    : {};
  const headerBackgroundColorObject = header?.headerContainerBackground
    ? JSON.parse(header.headerContainerBackground)
    : {};
  const headerHighlightTextColorObject = header?.heroHighlightTextColor
    ? JSON.parse(header.heroHighlightTextColor)
    : {};

  return (
    <MotionDiv
      layoutId="CMSPage"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        paddingTop: 100,
        color: page.backgroundImage?.src
          ? page.backgroundImage.lightContent
            ? "black"
            : "white"
          : getAverageLuminance(backgroundColorObject.value ?? "rgb(0,0,0)") >
            0.5
          ? "black"
          : "inherit",
        ...tinaGradientToJsx({
          backgroundColor: backgroundColorObject,
          backgroundImage: page.backgroundImage as SiteConfigBackgroundImage,
        }),
      }}
    >
      {backgroundImage?.src && (
        <Image
          src={backgroundImage.src}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="Background Image"
          style={{
            zIndex: -1,
            filter: `blur(${backgroundImage.blur}px)`,
            opacity: backgroundImage.opacity
              ? backgroundImage.opacity * 0.01
              : 1,
          }}
        />
      )}
      <MotionDiv
        layoutId="CMSPageContainer"
        className="flex flex-col items-center justify-center gap-20 py-8 md:py-10 z-20 mx-4"
      >
        <MotionDiv
          layoutId="CMSPageHeader"
          className={containerVariant}
          style={{
            color:
              getAverageLuminance(headerBackgroundColorObject.value) > 0.5
                ? "black"
                : "inherit",
            ...tinaGradientToJsx({
              backgroundColor: headerBackgroundColorObject,
            }),
          }}
        >
          <MotionDiv layoutId="CMSPageHeaderText" className={headerTextVariant}>
            {header?.heroText + " "}
            <span
              style={{
                ...tinaGradientToJsx({
                  backgroundColor: headerHighlightTextColorObject,
                }),
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                display: "inline",
              }}
            >
              {header?.heroHighlightText}
            </span>
          </MotionDiv>
          <br />

          <MotionDiv
            layoutId="CMSPageSubHeaderText"
            className={subheaderTextVariant}
            style={{
              color: "inherit",
            }}
          >
            {header?.subHeroText}
          </MotionDiv>
        </MotionDiv>
        <MotionDiv layoutId="CMSPageContent" className="flex flex-col gap-8">
          {page.components?.map((component, i: number) => {
            return (
              <CMSComponent key={i} data={component?.component as Component} />
            );
          })}
        </MotionDiv>
      </MotionDiv>
    </MotionDiv>
  );
}

export default CMSPage;
