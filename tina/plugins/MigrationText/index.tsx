import React, { useState, useEffect } from "react";
import data from "./scraped_data.json";
import { TinaField, wrapFieldsWithMeta } from "tinacms";
import MDEditor from "@uiw/react-md-editor";
import clsx from "clsx";

// Assuming the shape of your data, you might need to adjust these types
interface DataItem {
  urls: string[];
  div: {
    content: {
      text: string;
      element: string;
    }[];
  };
}

interface AccordionData {
  url: string;
  contents: {
    text: string;
    element: string;
  }[];
}

interface MigrationSelectorProps {
  field: any; // Adjust according to the actual field type from TinaCMS
  input: {
    value: string;
    onChange: (value: string) => void;
  };
}

// Main Accordion Component with TypeScript
const MigrationSelector: React.FC<MigrationSelectorProps> = ({
  field,
  input,
}) => {
  const [accordions, setAccordions] = useState<AccordionData[]>([]);
  const [showMigration, setShowMigration] = useState<boolean>(false);
  const [openTab, setOpenTab] = useState<string | null>(null);

  useEffect(() => {
    const uniqueUrls: {
      [key: string]: Set<{ text: string; element: string }>;
    } = {};

    data.forEach((item: DataItem) => {
      item.urls.forEach((url) => {
        if (!uniqueUrls[url]) {
          uniqueUrls[url] = new Set<{ text: string; element: string }>();
        }
        item.div.content.forEach((content) => {
          if (content.text.split(" ").length > 1) {
            uniqueUrls[url].add(content);
          }
        });
      });
    });

    const accordionData: AccordionData[] = Object.entries(uniqueUrls).map(
      ([url, contentSet]) => ({
        url,
        contents: Array.from(contentSet),
      })
    );

    const deduplicatedAccordionData = accordionData.map((item) => {
      // Create a new Set to track unique texts.
      const uniqueTexts = new Set();
      const uniqueContents = item.contents.filter((content) => {
        // Check if we've seen this text before.
        if (!uniqueTexts.has(content.text)) {
          uniqueTexts.add(content.text);
          return true; // Keep this item, it's unique.
        }
        // Duplicate based on text, filter it out.
        return false;
      });

      // Return a new object for the accordion item with deduplicated contents.
      return {
        ...item,
        contents: uniqueContents,
      };
    });

    setAccordions(deduplicatedAccordionData);
  }, []);

  const handleTabClick = (url: string) => {
    setOpenTab(openTab === url ? null : url);
  };

  return (
    <div className="space-y-2 my-10">
      <div className="text-lg font-medium">
        {field.label} {field.description && <span>({field.description})</span>}
      </div>

      <MDEditor
        preview="edit"
        height={150}
        value={input.value}
        onChange={(value) => input.onChange(value ?? "")}
      />
      <button
        onClick={() => setShowMigration(!showMigration)}
        className="bg-blue-500 text-white rounded-md p-2"
      >
        Click to select text from your previous website
      </button>
      {showMigration && (
        <div>
          <div className="flex space-x-2 overflow-auto">
            {accordions.map((accordion, index) => (
              <div
                key={index}
                className={clsx(
                  `cursor-pointer py-2 px-4 text-lg font-medium ${
                    openTab === accordion.url
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600"
                  }`
                )}
                onClick={() => handleTabClick(accordion.url)}
              >
                {accordion.url}
              </div>
            ))}
          </div>
          {accordions.map((accordion, index) =>
            openTab === accordion.url ? (
              <div
                key={index}
                className="mt-2 p-4 border rounded-lg shadow-sm bg-gray-50"
              >
                {accordion.contents.map((content, contentIndex) => (
                  <div
                    key={contentIndex}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                    onClick={() => {
                      input.onChange(content.text);
                      setShowMigration(false);
                      setOpenTab(null);
                    }}
                  >
                    {content.element === "h1" ? (
                      <h1 className="text-2xl font-bold">{content.text}</h1>
                    ) : content.element === "p" ? (
                      <p className="text-lg">{content.text}</p>
                    ) : (
                      content.text
                    )}
                  </div>
                ))}
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export const customTextField: TinaField = {
  type: "string",
  ui: {
    component: MigrationSelector as any, // Casting as any to bypass the type check; adjust if you have a more specific type
    parse: (value: string) => value,
  },
  name: "migration",
};
