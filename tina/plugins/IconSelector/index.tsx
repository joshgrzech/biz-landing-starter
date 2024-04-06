import React, { useState } from "react";
import * as FontAwesomeIcons from "react-icons/fa6"; // Import everything from 'react-icons/fa'

import { TinaField, wrapFieldsWithMeta } from "tinacms";
import { iconNames } from "./iconNames";
import clsx from "clsx";

const IconSelect = wrapFieldsWithMeta(({ field, input }) => {
  const [searchText, setSearchText] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const iconsFiltered = iconNames.filter((icon) => {
    return icon.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleIconSelect = (iconName: string) => {
    input.onChange(iconName);
    setIsPopoverOpen(false); // Close the popover on icon select
  };

  const renderIcon = (iconName: string) => {
    //@ts-ignore
    const IconComponent = FontAwesomeIcons[iconName];
    if (!IconComponent) return null;

    return (
      <>
        <IconComponent size="30" className="text-gray-700 mr-2" />
        <p className="text-sm text-gray-600">{iconName.split("Fa")[1]}</p>
      </>
    );
  };

  return (
    <div>
      <div
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        className="cursor-pointer flex items-center justify-center p-2 bg-blue-500 text-white rounded-md"
      >
        {input.value ? renderIcon(input.value) : "Select an Icon"}
      </div>
      {isPopoverOpen && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-2">
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <hr className="my-2" />
          <div className="max-h-60 overflow-y-auto">
            {iconsFiltered.map((icon) => (
              <button
                key={icon}
                className={clsx(
                  `flex items-center p-2 w-full text-left ${
                    icon === input.value ? "bg-blue-100" : "hover:bg-gray-50"
                  }`
                )}
                title={icon}
                onClick={() => handleIconSelect(icon)}
              >
                {renderIcon(icon)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export const iconPickerField: TinaField = {
  type: "string",
  ui: {
    component: IconSelect as any,
    parse: (value: string) => value, // Parse the value as a string
  },
  name: "icon",
};
