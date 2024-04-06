import { TinaUserCollection } from "tinacms-authjs/dist/tinacms";
import { defineConfig } from "tinacms";
import { PageCollection } from "./collections/page";
import { ComponentsCollection } from "./collections/component";
import { ConfigCollection } from "./collections/config";
import { iconPickerField } from "./plugins/IconSelector";
import { gradientSelectorField } from "./plugins/GradientSelector";
import { fontPickerField } from "./plugins/FontSelector";
import { customTextField } from "./plugins/MigrationText";

export default defineConfig({
  token: process.env.TINA_CLOUD_TOKEN,
  clientId: process.env.TINA_CLOUD_CLIENT_ID,
  branch: "main",
  cmsCallback(cms) {
    cms.fields.add(iconPickerField);
    cms.fields.add(gradientSelectorField);
    cms.fields.add(fontPickerField);
    cms.fields.add(customTextField);
  },
  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },
  schema: {
    collections: [
      TinaUserCollection,
      PageCollection,
      ComponentsCollection,
      ConfigCollection,
    ],
  },
});
