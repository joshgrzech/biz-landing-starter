import { Collection } from "tinacms";
import { gradientSelectorField } from "../plugins/GradientSelector";
import { customTextField } from "../plugins/MigrationText";
import { iconPickerField } from "../plugins/IconSelector";

export const ComponentsCollection: Collection = {
  label: "Component",
  name: "component",
  path: "content/component",
  ui: {
    router: ({ document }) => "/preview/component/" + document._sys.filename + "",
  },
  fields: [
    {
      ...customTextField,
      label: "Title",
      name: "title",
    },
    {
      ...customTextField,
      label: "Tagline",
      name: "tagline",
    },
    {
      ...customTextField,
      label: "Body",
      name: "body",
    },
    {
      type: "object",
      name: "cta",
      label: "Call to Action",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Label",
        },
        {
          type: "string",
          name: "link",
          label: "Link",
        },
        {
          ...iconPickerField,
          label: "Service Icon",
          name: "icon",
        },
        {
          ...gradientSelectorField,
          label: "Primary Color Override",
          name: "primaryColorOverride",
        },
        {
          ...gradientSelectorField,
          label: "Secondary Color Override",
          name: "secondaryColorOverride",
        },
      ],
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
    {
      label: "Image",
      name: "image",
      type: "image",
    },
    {
      ...iconPickerField,
      label: "Service Icon",
      name: "icon",
    },
  ],
};
