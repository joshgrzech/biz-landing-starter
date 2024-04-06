import React, { useState } from "react";
import { TinaField, wrapFieldsWithMeta } from "tinacms";
import fontPairs from "../../../lib/fontPairs.json";

const FontSelect = wrapFieldsWithMeta(({ field, input }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleFontSelect = (font: { primary: string; secondary: string }) => {
    input.onChange(JSON.stringify(font));
    setIsPopoverOpen(false); // Close the popover on font select
  };

  const currentObject = input.value
    ? JSON.parse(input.value)
    : { primary: "", secondary: "" };

  const currentFontPair = fontPairs.find(
    (font) => font.primary === currentObject.primary
  );

  return (
    <div>
      <div
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        className="cursor-pointer flex items-center justify-center p-2"
      >
        {input.value && currentFontPair ? (
          <div className="flex items-center">
            <div
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className="flex-1 p-2 cursor-pointer"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: `
                        <style>
                          @import url('https://fonts.googleapis.com/css2?family=${currentFontPair.primary.replace(
                            / /g,
                            "+"
                          )}:wght@400..700&display=swap');
                          @import url('https://fonts.googleapis.com/css2?family=${currentFontPair.secondary.replace(
                            / /g,
                            "+"
                          )}:wght@400..700&display=swap');
                          .${currentFontPair.primary.replace(
                            / /g,
                            "-"
                          )} { font-family: '${
                    currentFontPair.primary
                  }', sans-serif; 
                        font-size: 32px;
                        font-weight: 700;
                      }
                          .${currentFontPair.secondary.replace(
                            / /g,
                            "-"
                          )} { font-family: '${
                    currentFontPair.secondary
                  }', sans-serif; 
                        font-size: 20px;
                        font-weight: 400;
                      }
                        </style>
                        <div>
                        <h1 class="${currentFontPair.primary.replace(
                          / /g,
                          "-"
                        )}"
                        >${currentFontPair.primary}</h1>
                        <p class="${currentFontPair.secondary.replace(
                          / /g,
                          "-"
                        )}"
                        >${currentFontPair.secondary}</p>
                        </div>
                        `,
                }}
              />
            </div>
          </div>
        ) : (
          "Select a font"
        )}
      </div>
      {isPopoverOpen && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="max-h-60 overflow-y-auto">
            {fontPairs.map((fontPairObject) => {
              return (
                <div
                  key={JSON.stringify(fontPairObject)}
                  className="flex items-center"
                >
                  <div
                    onClick={() => handleFontSelect(fontPairObject)}
                    className="flex-1 p-2 cursor-pointer"
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `
                        <style>
                          @import url('https://fonts.googleapis.com/css2?family=${fontPairObject.primary.replace(
                            / /g,
                            "+"
                          )}:wght@400..700&display=swap');
                          @import url('https://fonts.googleapis.com/css2?family=${fontPairObject.secondary.replace(
                            / /g,
                            "+"
                          )}:wght@400..700&display=swap');
                          .${fontPairObject.primary.replace(
                            / /g,
                            "-"
                          )} { font-family: '${
                          fontPairObject.primary
                        }', sans-serif; 
                        font-size: 32px;
                        font-weight: 700;
                      }
                          .${fontPairObject.secondary.replace(
                            / /g,
                            "-"
                          )} { font-family: '${
                          fontPairObject.secondary
                        }', sans-serif; 
                        font-size: 20px;
                        font-weight: 400;
                      }
                        </style>
                        <div>
                        <h1 class="${fontPairObject.primary.replace(/ /g, "-")}"
                        >${fontPairObject.primary}</h1>
                        <p class="${fontPairObject.secondary.replace(
                          / /g,
                          "-"
                        )}"
                        >${fontPairObject.secondary}</p>
                        </div>
                        `,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});

export const fontPickerField: TinaField = {
  type: "string",
  ui: {
    component: FontSelect as any,
    parse: (value: string) => value, // Parse the value as a string
  },
  name: "font",
};
