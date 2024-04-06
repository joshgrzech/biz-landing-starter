import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
      red: "from-[#F85032] to-[#E73827]",
      orange: "from-[#FF7E5F] to-[#FEB47B]",
      lime: "from-[#C1DE75] to-[#A1C349]",
      teal: "from-[#64FFDA] to-[#1AEBB9]",
      magenta: "from-[#FF2184] to-[#B41470]",
      sky: "from-[#77FFD2] to-[#6297DB]",
      gold: "from-[#FFD700] to-[#F9A602]",
      indigo: "from-[#4B0082] to-[#3A2E5A]",
      sunset: "from-[#FF5E62] to-[#FF9966]",
      emerald: "from-[#50C878] to-[#046307]",
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
        "red",
        "orange",
        "lime",
        "teal",
        "magenta",
        "sky",
        "gold",
        "indigo",
        "sunset",
        "emerald",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});
