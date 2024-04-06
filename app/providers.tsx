"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { NextFont } from "next/dist/compiled/@next/font";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  fonts?: {
    primaryFont?: NextFont;
    secondaryFont?: NextFont;
  };
}

export function Providers({ children, themeProps, fonts }: ProvidersProps) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <style jsx global>{`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: ${fonts?.primaryFont?.style.fontFamily} !important;
          }
          p,
          a,
          span,
          label,
          input,
          button,
          select,
          option,
          textarea {
            font-family: ${fonts?.secondaryFont?.style.fontFamily} !important;
          }
          nav a {
            font-family: ${fonts?.primaryFont?.style.fontFamily} !important;
          }
          nav span {
            font-family: ${fonts?.primaryFont?.style.fontFamily} !important;
          }
        `}</style>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
