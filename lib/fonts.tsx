import { NextFont } from "next/dist/compiled/@next/font";
import {
  Alegreya,
  Archivo,
  Bitter,
  Cabin,
  Cormorant,
  DM_Sans,
  Domine,
  EB_Garamond,
  Epilogue,
  Expletus_Sans,
  Inconsolata,
  Inter,
  Josefin_Sans,
  Josefin_Slab,
  Karla,
  Kreon,
  Lora,
  Montserrat,
  Mulish,
  Noto_Serif,
  Nunito,
  Nunito_Sans,
  Open_Sans,
  Oswald,
  Pontano_Sans,
  Raleway,
  Red_Hat_Display,
  Roboto_Condensed,
  Roboto_Slab,
  Rubik,
  Source_Sans_3,
  Source_Serif_4,
  Syne,
  Teko,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const alegreya = Alegreya({
  subsets: ["latin"],
  variable: "--font-alegreya",
  display: "swap",
});
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});
export const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
  display: "swap",
});
export const cabin = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin",
  display: "swap",
});
export const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});
export const dm_sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
export const domine = Domine({
  subsets: ["latin"],
  variable: "--font-domine",
  display: "swap",
});
export const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});
export const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
});
export const expletus_sans = Expletus_Sans({
  subsets: ["latin"],
  variable: "--font-expletus-sans",
  display: "swap",
});
export const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
  display: "swap",
});
export const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin-sans",
  display: "swap",
});
export const josefin_slab = Josefin_Slab({
  subsets: ["latin"],
  variable: "--font-josefin-slab",
  display: "swap",
});
export const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});
export const kreon = Kreon({
  subsets: ["latin"],
  variable: "--font-kreon",
  display: "swap",
});
export const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});
export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
export const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});
export const noto_serif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
});
export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});
export const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});
export const open_sans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});
export const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});
export const pontano_sans = Pontano_Sans({
  subsets: ["latin"],
  variable: "--font-pontano-sans",
  display: "swap",
});
export const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});
export const red_hat_display = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat-display",
  display: "swap",
});
export const roboto_condensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-roboto-condensed",
  display: "swap",
});
export const roboto_slab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  display: "swap",
});
export const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});
export const source_sans_pro = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-pro",
  display: "swap",
});
export const source_serif_pro = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif-pro",
  display: "swap",
});
export const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});
export const teko = Teko({
  subsets: ["latin"],
  variable: "--font-teko",
  display: "swap",
});

export const fontObjects: { [key: string]: NextFont } = {
  Inter: inter,
  Alegreya: alegreya,
  Archivo: archivo,
  Bitter: bitter,
  Cabin: cabin,
  Cormorant: cormorant,
  "DM Sans": dm_sans,
  Domine: domine,
  "EB Garamond": eb_garamond,
  Epilogue: epilogue,
  "Expletus Sans": expletus_sans,
  Inconsolata: inconsolata,
  "Josefin Sans": josefin_sans,
  "Josefin Slab": josefin_slab,
  Karla: karla,
  Kreon: kreon,
  Lora: lora,
  Montserrat: montserrat,
  Mulish: mulish,
  "Noto Serif": noto_serif,
  Nunito: nunito,
  "Nunito Sans": nunito_sans,
  "Open Sans": open_sans,
  Oswald: oswald,
  "Pontano Sans": pontano_sans,
  Raleway: raleway,
  "Red Hat Display": red_hat_display,
  "Roboto Condensed": roboto_condensed,
  "Roboto Slab": roboto_slab,
  Rubik: rubik,
  "Source Sans Pro": source_sans_pro,
  "Source Serif Pro": source_serif_pro,
  Syne: syne,
  Teko: teko,
};
