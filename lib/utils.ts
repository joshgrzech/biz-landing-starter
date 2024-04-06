import { SiteConfigBackgroundImage } from 'cms/__generated__/types';
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

export function formatMenuItems(items: string[]): MenuItem[] {
  const result: MenuItem[] = [];

  // Helper function to capitalize and format label
  const formatLabel = (str: string): string =>
    str
      .split("/")
      .pop()!
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  // Helper function to ensure proper href format
  const formatHref = (path: string): string => {
    return `/${path}`;
  };

  // Recursive function to build nested structure
  const buildStructure = (basePath: string, paths: string[]): MenuItem[] => {
    const children: MenuItem[] = [];
    paths.forEach((path) => {
      const relativePath = path.replace(`${basePath}/`, "");
      const parts = relativePath.split("/");
      if (parts.length > 1) {
        // Find or create parent item
        const parentLabel = parts[0];
        let parent = children.find(
          (child) => child.label === formatLabel(parentLabel)
        );
        if (!parent) {
          parent = {
            label: formatLabel(parentLabel),
            href: formatHref(`${basePath}/${parentLabel}`),
            children: [],
          };
          children.push(parent);
        }
        parent.children = parent.children || [];
        parent.children.push({
          label: formatLabel(parts[1]),
          href: formatHref(path),
        });
      } else {
        children.push({ label: formatLabel(path), href: formatHref(path) });
      }
    });
    return children;
  };

  // Group items by their first segment to handle multiple prefixes like "services/"
  const groupedItems: Record<string, string[]> = {};
  items.forEach((item) => {
    const [firstSegment] = item.split("/");
    if (!groupedItems[firstSegment]) {
      groupedItems[firstSegment] = [];
    }
    groupedItems[firstSegment].push(item);
  });

  Object.keys(groupedItems).forEach((key) => {
    const paths = groupedItems[key];
    if (paths.length > 1 && key !== "home") {
      // More than one item under this prefix, build structure recursively
      result.push({
        label: formatLabel(key),
        href: formatHref(key),
        children: buildStructure(key, paths),
      });
    } else {
      // Single item, directly add to result
      paths.forEach((path) => {
        result.push({ label: formatLabel(path), href: formatHref(path) });
      });
    }
  });

  return result;
}

export function splitArrayEvenly(arr: any[]) {
  // Calculate the split index
  const splitIndex = Math.ceil(arr.length / 2);

  // Split the array into two parts
  const firstHalf = arr.slice(0, splitIndex);
  const secondHalf = arr.slice(splitIndex);

  // Return the two halves
  return [firstHalf, secondHalf];
}

export function getAverageLuminance(cssString: string) {
  const rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/g;
  let matches;
  let totalLuminance = 0;
  let count = 0;

  while ((matches = rgbaRegex.exec(cssString)) !== null) {
    const r = parseInt(matches[1]);
    const g = parseInt(matches[2]);
    const b = parseInt(matches[3]);
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    totalLuminance += luminance / 255; // Normalize luminance to be between 0 and 1
    count++;
  }

  const averageLuminance = totalLuminance / count;
  return averageLuminance;
}

  export const tinaGradientToJsx = ({
    backgroundImage,
    backgroundColor,
  }: {
    backgroundImage?: SiteConfigBackgroundImage;
    backgroundColor?: any;
  }) => {
    if (backgroundImage?.src)
      return {
        backgroundImage: `url(${backgroundImage.src})`,
      };
    if (!backgroundColor) return {};
    if (!backgroundColor?.value) return {};
    if (backgroundColor.isGradient) {
      return {
        background: backgroundColor.value,
      };
    } else {
      return {
        backgroundColor: backgroundColor.value,
      };
    }
  };