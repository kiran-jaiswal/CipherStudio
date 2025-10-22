import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview } from "@codesandbox/sandpack-react";
import { FileNode } from "@/types/project";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SandpackEditorProps {
  files: FileNode[];
  onClose: () => void;
}

export const SandpackEditor = ({ files, onClose }: SandpackEditorProps) => {
  // Convert FileNode[] to Sandpack files format
  const sandpackFiles = files.reduce((acc, file) => {
    if (file.type === "file" && file.content !== undefined) {
      acc[`/${file.name}`] = { code: file.content };
    }
    return acc;
  }, {} as Record<string, { code: string }>);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Sandpack Editor
            </span>
            <span className="text-sm text-muted-foreground">
              Full-featured online IDE powered by CodeSandbox
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Close
          </Button>
        </div>

        <div className="flex-1 p-4">
          <SandpackProvider
            template="react"
            files={sandpackFiles}
            theme="dark"
          >
            <SandpackLayout
              style={{
                height: "100%",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <SandpackCodeEditor
                showTabs
                showLineNumbers
                showInlineErrors
                wrapContent
                closableTabs
                style={{ height: "100%" }}
              />
              <SandpackPreview
                showOpenInCodeSandbox
                showRefreshButton
                style={{ height: "100%" }}
              />
            </SandpackLayout>
          </SandpackProvider>
        </div>
      </div>
    </div>
  );
};
