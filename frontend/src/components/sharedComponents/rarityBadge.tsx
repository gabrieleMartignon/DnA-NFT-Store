import type { rarities } from "../directPurchasePage/directPurchasePage";

type ColorMap = {
  [key: string]: {
    bg: string;
    text: string;
    shadow: string;
  };
};

const colorMap: ColorMap = {
  Legendary: {
    bg: "bg-linear-to-b from-amber-200/50 to-amber-400/50",
    text: "text-amber-600",
    shadow: "hover:shadow-amber-500/50",
  },
  Epic: {
    bg: "bg-linear-to-b from-purple-200/50 to-purple-400/50",
    text: "text-purple-600",
    shadow: "hover:shadow-purple-500/50",
  },
  Rare: {
    bg: "bg-linear-to-b from-blue-200/50 to-blue-400/50",
    text: "text-blue-600",
    shadow: "hover:shadow-blue-500/50",
  },
  Uncommon: {
    bg: "bg-linear-to-b from-emerald-200/50 to-emerald-400/50",
    text: "text-emerald-600",
    shadow: "hover:shadow-emerald-500/50",
  },
  Common: {
    bg: "bg-linear-to-b from-gray-200/50 to-gray-400/50",
    text: "text-gray-600",
    shadow: "hover:shadow-gray-500/50",
  },
};

type Props = {
  size: string;
  rarity: rarities;
  onSelect?: () => void | undefined;
  isSelected?: boolean;
};

export default function RarityBadge({ size, rarity, onSelect, isSelected }: Props) {
  const colors = colorMap[rarity];
  if (!colors) return null;

  return (
    <button
      className={`flex items-center justify-center relative h-auto overflow-hidden rounded-xl ${colors.bg} px-4 py-1 w-20 ${colors.text} text-xs font-bold  transition-all opacity-100 duration-500 hover:shadow-lg ${colors.shadow} border-none ${size} ${isSelected ? "scale-130 lg:scale-170 outline-1" : ""}`}
      onClick={() => {
        onSelect?.();
      }}
    >
      {rarity}
    </button>
  );
}
