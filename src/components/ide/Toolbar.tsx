import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Play, FolderOpen, Code2, Sun, Moon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

interface ToolbarProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
  onSave: () => void;
  onRun: () => void;
}

export const Toolbar = ({ projectName, onProjectNameChange, onSave, onRun }: ToolbarProps) => {
  const { theme, setTheme } = useTheme();

  const handleSave = () => {
    onSave();
    toast({
      title: "Project saved",
      description: "Your project has been saved to browser storage.",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            CipherStudio
          </span>
        </div>
        
        <div className="h-6 w-px bg-border" />
        
        <Input
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          className="w-64 bg-secondary border-border"
          placeholder="Project name"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="gap-2"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {theme === "dark" ? "Light" : "Dark"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          Save
        </Button>

        <Button
          size="sm"
          onClick={onRun}
          className="gap-2 bg-success hover:bg-success/90 text-success-foreground"
        >
          <Play className="h-4 w-4" />
          Run
        </Button>
      </div>
    </div>
  );
};
