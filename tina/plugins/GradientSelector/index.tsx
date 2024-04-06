import React, { useState } from "react";
import { TinaField, wrapFieldsWithMeta } from "tinacms";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";
import { getAverageLuminance, tinaGradientToJsx } from "../../../lib/utils";

const GradientSelect = wrapFieldsWithMeta(({ field, input }) => {
  const [showPicker, setShowPicker] = useState(false);

  // Attempt to parse the input value or fall back to default values
  const initialValue = (() => {
    try {
      return JSON.parse(input.value);
    } catch {
      return { value: "rgba(255,255,255,0)", isGradient: false };
    }
  })();

  const { isGradient } = useColorPicker(initialValue.value, (value) => {
    const newValue = JSON.stringify({ value, isGradient });
    input.onChange(newValue);
  });

  const handleColorChange = (value: any) => {
    const newValue = JSON.stringify({ value, isGradient });
    input.onChange(newValue);
  };

  const togglePicker = () => setShowPicker(!showPicker);
  return (
    <div>
      <div
        onClick={togglePicker}
        style={{
          border: "none",
          color:
            getAverageLuminance(initialValue.value) > 0.5 ? "black" : "white",
          cursor: "pointer",
          padding: "10px",
          borderRadius: "5px",
          ...tinaGradientToJsx({ backgroundColor: initialValue }),
        }}
      >
        {"Click to select a color or gradient"}
      </div>

      {showPicker && (
        <div className="flex m-4 justify-center content-center items-center">
          <ColorPicker
            value={initialValue.value}
            onChange={handleColorChange}
          />
        </div>
      )}
    </div>
  );
});

export const gradientSelectorField: TinaField = {
  type: "string",
  ui: {
    component: GradientSelect as any,
    parse: (value: any) => {
      return value;
    },
  },
  name: "gradient",
};
