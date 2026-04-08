// Color configuration with fun names and their DaisyUI class mappings
export const colorConfig = [
  { name: "Sunset", daisyUI: "warning", emoji: "🌅", borderClass: "border-warning" },
  { name: "Ocean", daisyUI: "info", emoji: "🌊", borderClass: "border-info" },
  { name: "Forest", daisyUI: "success", emoji: "🌲", borderClass: "border-success" },
  { name: "Lavender", daisyUI: "secondary", emoji: "💜", borderClass: "border-secondary" },
  { name: "Rose", daisyUI: "error", emoji: "🌹", borderClass: "border-error" },
  { name: "Sunshine", daisyUI: "primary", emoji: "☀️", borderClass: "border-primary" },
  { name: "Mint", daisyUI: "accent", emoji: "🍃", borderClass: "border-accent" }
];

export const getColorConfig = (colorName) => {
  return colorConfig.find(c => c.name === colorName) || colorConfig[5]; // default to Sunshine
};

export const getDaisyUIColor = (colorName) => {
  const config = getColorConfig(colorName);
  return config.daisyUI;
};

export const getBorderClass = (colorName) => {
  const config = getColorConfig(colorName);
  return config.borderClass;
};
