import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <DropdownMenuItem
      onSelect={() => {
        toggleTheme();
      }}
    >
      Toggle Theme
    </DropdownMenuItem>
  );
}
