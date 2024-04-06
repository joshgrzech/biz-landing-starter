export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Last Mile Solutions",
  description: "Professional handyman services for your home or office.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Our Services",
      href: "/services",
      items: [
        {
          label: "Handyman Services",
          href: "/services/handyman-services",
        },
        {
          label: "Custom Fittings",
          href: "/services/custom-fittings",
        },
        {
          label: "Design Consultation",
          href: "/services/design-consultation",
        },
        {
          label: "Rennovation Services",
          href: "/services/rennovation-services",
        },
      ],
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  links: {
    facebook: "https://github.com/nextui-org/nextui",
    instagram: "https://twitter.com/getnextui",
    yelp: "https://nextui.org",
  },
};
