import {
  UsernamePasswordAuthJSProvider,
  TinaUserCollection,
} from "tinacms-authjs/dist/tinacms";
import { defineConfig, LocalAuthProvider } from "tinacms";

import { PageCollection } from "./collections/page";
import { ComponentsCollection } from "./collections/component";
import { ConfigCollection } from "./collections/config";
import { iconPickerField } from "./plugins/IconSelector";
import { gradientSelectorField } from "./plugins/GradientSelector";
import { fontPickerField } from "./plugins/FontSelector";
import { customTextField } from "./plugins/MigrationText";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default defineConfig({
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  contentApiUrlOverride: "/api/tina/gql",
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
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
      static: true,
    },
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
