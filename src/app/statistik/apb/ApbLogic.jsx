import React, { useState } from "react";

export default function ApbLogic() {
  const [expandedPanels, setExpandedPanels] = useState({}); // expanded accordion

  // accordion change
  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedPanels({
      ...expandedPanels,
      [panel]: isExpanded,
    });
  };

  // style accordion open
  const handleAccordionToggle = (panel) => {
    return expandedPanels[panel]
      ? {
          backgroundColor: "#0D4581",
          borderRadius: "10px 10px 0px 0px",
          color: "white",
        }
      : {};
  };
  const menu = [
    { id: 1, value: "2023" },
    { id: 2, value: "2024" },
    { id: 3, value: "2025" },
    { id: 4, value: "2026" },
  ];

  console.log({ expandedPanels });

  return {
    value: {
      menu,
      expandedPanels,
    },
    func: { handleAccordionToggle, handleChange },
  };
}
