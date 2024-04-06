import { Collection, TinaField } from "tinacms";
import { gradientSelectorField } from "../plugins/GradientSelector";
import { customTextField } from "../plugins/MigrationText";

const baseFields: TinaField[] = [
  {
    type: "object",
    name: "header",
    label: "Header",
    fields: [
      {
        type: "string",
        name: "variant",
        label: "Header Variant",
        options: [
          { value: "variantOne", label: "Variant #1" },
          { value: "variantTwo", label: "Variant #2" },
          { value: "variantThree", label: "Variant #3" },
          { value: "variantFour", label: "Variant #4" },
        ],
      },
      {
        type: "string",
        name: "heroText",
        label: "Hero Text",
      },

      {
        type: "string",
        name: "heroHighlightText",
        label: "Hero-Highlight Text",
      },
      {
        ...gradientSelectorField,
        name: "heroHighlightTextColor",
        label: "Hero-Highlight Text Color",
      },
      {
        ...customTextField,
        name: "subHeroText",
        label: "subHeroText",
      },
      {
        ...gradientSelectorField,
        name: "headerContainerBackground",
        label: "Header Container Background Color",
      },
    ],
  },

  {
    type: "object",
    list: true,
    name: "components",
    label: "Components",
    fields: [
      {
        type: "reference",
        name: "component",
        collections: ["component"],

      },
      {
        ...gradientSelectorField,
        label: "Primary Color",
        name: "primaryColor",
      },
      {
        ...gradientSelectorField,
        label: "Secondary Color",
        name: "secondaryColor",
      },
    ],
      ui: {
        itemProps: (item) => {
          // Assuming `item` has a title property you want to display
          if (!item || !item.component) return { label: "Component" }; 
          return { label: item.component.replace("content/component/", "").replace(".md", "") };
        }
      }
  },
  {
    ...gradientSelectorField,
    name: "backgroundColor",
    label: "Page Background Color",
  },
  {
    name: "backgroundImage",
    label: "Background Image",
    type: "object",
    fields: [
      {
        type: "image",
        name: "src",
        label: "Image",
      },
      {
        type: "number",
        name: "blur",
        label: "Blur",
      },
      {
        type: "number",
        name: "opacity",
        label: "Opacity",
      },
      {
        type: "boolean",
        name: "lightContent",
        label: "Light Content",
      },
    ],
  },
  {
    name: "seoTitle",
    type: "string",
    label: "SEO Page Title",
  },
  {
    name: "seoDescription",
    type: "string",
    label: "SEO Page Description",
  }
];

export const PageCollection: Collection = {
  name: "page",
  label: "Page",
  path: "content/pages",
  format: "md",
    ui: {
    router: ({ document }) => {
      const slug = document._sys.path
        .split("content/pages/")[1]
        .split(".md")[0];
      return "/preview/page/" + slug;
    },
  },
  templates: [
    {
      name: "home",
      label: "Home",
      fields: [...baseFields],
    },
    {
      name: "about",
      label: "About",
      fields: [...baseFields],
    },
    {
      name: "services",
      label: "Services",
      fields: [...baseFields],
    },
    {
      name: "contact",
      label: "Contact",
      fields: [...baseFields],
    },
    {
      name: "blog",
      label: "Blog",
      fields: [...baseFields],
    },
    {
      name: "error",
      label: "Error",
      fields: [...baseFields],
    },
    {
      name: "serviceLanding",
      label: "Service Landing",
      fields: [...baseFields],
    },
  ],
};
