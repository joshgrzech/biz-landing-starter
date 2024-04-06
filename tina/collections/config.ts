import { Collection } from "tinacms";
import { gradientSelectorField } from "../plugins/GradientSelector";
import { iconPickerField } from "../plugins/IconSelector";
import { fontPickerField } from "../plugins/FontSelector";
import { customTextField } from "../plugins/MigrationText";

export const ConfigCollection: Collection = {
  label: "Site Config",
  name: "siteConfig",
  path: "content/siteConfig",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      ...customTextField,

      label: "SEO Title",
      name: "title",
    },
    {
      ...customTextField,

      label: "SEO Description",
      name: "description",
    },
    {
      label: "Site Logo",
      name: "logo",
      type: "image",
    },
    {
      label: "Site Favicon",
      name: "favicon",
      type: "image",
    },
    {
      type: "object",
      name: "navbar",
      label: "Navbar",
      fields: [
        {
          type: "object",
          list: true,
          name: "navLinks",
          label: "Nav Links",
          ui: {
            itemProps: (item) => {
              return item;
            },
          },
          fields: [
            { ...customTextField, name: "label", label: "Label" },
            { ...customTextField, name: "href", label: "Link" },
          ],
        },
        {
          ...gradientSelectorField,
          name: "color",
          label: "Color",
        },
        {
          type: "string",
          name: "shape",
          label: "Shape",
          options: [
            { value: "variantOne", label: "Variant #1" },
            { value: "variantTwo", label: "Variant #2" },
            { value: "variantThree", label: "Variant #3" },
            { value: "variantFour", label: "Variant #4" },
          ],
        },
        {
          name: "sticky",
          label: "Sticky",
          type: "boolean",
        },
        {
          name: "hideOnScroll",
          label: "Hide On Scroll",
          type: "boolean",
        },
        {
          name: "bordered",
          label: "Bordered",
          type: "boolean",
        },

        {
          name: "blurred",
          label: "Blurred",
          type: "boolean",
        },
      ],
    },
    {
      label: "Social Media Links",
      name: "socialLinks",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            key: item.name,
            label: item.name,
          };
        },
      },
      fields: [
        {
          type: "string",
          label: "Social Media Name",
          name: "name",
        },
        {
          label: "Social Media URL",
          name: "url",
          type: "string",
        },
        {
          ...iconPickerField,
          label: "Icon",
          name: "icon",
        },
      ],
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
      ...gradientSelectorField,
      label: "Global Background Color",
      name: "backgroundColor",
    },
    {
      ...fontPickerField,
      label: "Font Pair",
      name: "fontPair",
    },
  ],
};
