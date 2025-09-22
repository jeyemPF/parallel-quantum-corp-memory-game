export interface KeyboardHelpItem {
  keys: string[];
  description: string;
}

export const KEYBOARD_HELP: KeyboardHelpItem[] = [
  {
    keys: ["Tab"],
    description: "to navigate",
  },
  {
    keys: ["Enter", "Space"],
    description: "to flip",
  },
  {
    keys: ["↑", "↓", "←", "→"],
    description: "for quick navigation",
  },
];
