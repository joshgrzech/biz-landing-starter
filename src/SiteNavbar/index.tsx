import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarProps,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import {
  formatMenuItems,
  splitArrayEvenly,
  tinaGradientToJsx,
} from "../../lib/utils";
import {
  SiteConfigNavbar,
  SiteConfigSocialLinks,
} from "cms/__generated__/types";
import Image from "next/image";
import TinaIcon from "../TinaIcon";
import MotionLink from "../Motion/MotionLink";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";

export const Navbar = ({
  data,
  pages,
}: {
  data: {
    siteConfig: {
      navbar: SiteConfigNavbar;
      socialLinks: SiteConfigSocialLinks[];
      logo: string;
    };
  };

  pages: string[];
}) => {
  const {
    siteConfig: { navbar, socialLinks, logo },
  } = data;
  const menuItems = formatMenuItems(
    pages.filter((page) => page !== "error" && page !== "navbar")
  );
  const [firstHalf, secondHalf] = splitArrayEvenly(navbar.navLinks ?? []);
  const renderNavItem = (item: any, index: number) => {
    const page = menuItems.find(
      (p) => p.href === item.href || p.label === item.label
    );
    if (!page) return null;

    return (
      <NavbarItem key={index} className="text-xl">
        <MotionLink
          href={page.href === "/home" ? "/" : page.href}
          label={page.label}
        />
      </NavbarItem>
    );
  };

  const navbarProps = (config: SiteConfigNavbar) => {
    const props: NavbarProps = {};
    if (config.sticky !== undefined || config.sticky !== null) {
      props.position = config.sticky ? "sticky" : "static";
    }
    if (config.bordered !== undefined || config.bordered !== null) {
      props.isBordered = config.bordered ? true : false;
    }
    if (config.blurred !== undefined || config.blurred !== null) {
      props.isBlurred = config.blurred ? true : false;
    }
    if (config.hideOnScroll !== undefined || config.hideOnScroll !== null) {
      props.shouldHideOnScroll = config.hideOnScroll ? true : false;
    }
    return props;
  };

  const navbarClasses = (navbar: SiteConfigNavbar) => {
    const classes: NavbarProps["classNames"] = {
      base: [],
      item: [],
      brand: [],
      menu: [],
      menuItem: [],
      content: [],
      wrapper: [],
      toggle: [],
      toggleIcon: [],
    };
    if (!navbar) return classes;
    if (!navbar.shape) return classes;
    switch (navbar.shape) {
      case "variantOne":
        break;
      case "variantTwo":
        break;
      case "variantThree":
        break;
      case "variantFour":
        break;
      default:
        break;
    }
    return classes;
  };

  return (
    <NextUINavbar
      classNames={navbarClasses(navbar)}
      maxWidth="xl"
      className="py-4"
      {...navbarProps(navbar)}
      style={{
        ...tinaGradientToJsx({
          backgroundColor: navbar.color,
        }),
      }}
    >
      <NavbarContent
        className="basis-1/5 sm:basis-full items-center"
        justify="start"
      >
        <ul className="hidden md-sm:flex md:flex gap-8 justify-start">
          {firstHalf.map((item, index) => renderNavItem(item, index))}
        </ul>
        <div className="flex md-sm:hidden lg:hidden">
          <NavbarMenuToggle />
        </div>
      </NavbarContent>
      <NavbarBrand as="li" className="gap-3 max-w-fit">
        <NextLink
          className={
            "flex-col justify-center items-center content-center text-center gap-1"
          }
          href="/"
        >
          <Image src={logo} alt="Logo" width={150} height={150} />
        </NextLink>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <ul className="hidden md-sm:flex md:flex gap-8 justify-start">
          {secondHalf.map((item, index) => renderNavItem(item, index))}
        </ul>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {socialLinks?.map((link, i) => {
          if (link?.url && link?.icon) {
            return (
              <Link key={i} isExternal href={link?.url} aria-label="Twitter">
                <TinaIcon name={link.icon} color="rgba(255,255,255,0.75)" />
              </Link>
            );
          }
        })}
      </NavbarContent>

      <NavbarMenu className="h-auto">
        {[...firstHalf, ...secondHalf].map((item, index) =>
          renderNavItem(item, index)
        )}
      </NavbarMenu>
    </NextUINavbar>
  );
};
