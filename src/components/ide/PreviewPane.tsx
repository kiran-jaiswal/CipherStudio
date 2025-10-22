import { useEffect, useState } from "react";
import { SandpackProvider, SandpackPreview, SandpackLayout } from "@codesandbox/sandpack-react";
import { FileNode } from "@/types/project";
import { RefreshCw, Smartphone, Monitor, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PreviewPaneProps {
  files: FileNode[];
  refreshKey: number;
}

type ViewportSize = "mobile" | "tablet" | "desktop";

export const PreviewPane = ({ files, refreshKey }: PreviewPaneProps) => {
  const [viewport, setViewport] = useState<ViewportSize>("desktop");
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [refreshKey]);

  // Convert FileNode[] to Sandpack files format
  const sandpackFiles = files.reduce((acc, file) => {
    if (file.type === "file" && file.content !== undefined) {
      acc[`/${file.name}`] = { code: file.content };
    }
    return acc;
  }, {} as Record<string, { code: string }>);

  const getViewportWidth = () => {
    switch (viewport) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      case "desktop":
        return "100%";
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
        <span className="text-sm font-semibold text-foreground">PREVIEW</span>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-secondary rounded-md p-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 w-7 p-0",
                viewport === "mobile" && "bg-active"
              )}
              onClick={() => setViewport("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 w-7 p-0",
                viewport === "tablet" && "bg-active"
              )}
              onClick={() => setViewport("tablet")}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 w-7 p-0",
                viewport === "desktop" && "bg-active"
              )}
              onClick={() => setViewport("desktop")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => setKey((prev) => prev + 1)}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-muted p-4 flex items-start justify-center">
        <div
          style={{
            width: getViewportWidth(),
            height: viewport === "desktop" ? "100%" : "667px",
            maxWidth: "100%",
            transition: "width 0.3s ease",
          }}
          className="bg-background rounded-lg shadow-lg overflow-hidden"
        >
          <SandpackProvider
            key={key}
            template="react"
            files={sandpackFiles}
            theme="dark"
            options={{
              externalResources: [],
            }}
          >
            <SandpackLayout>
              <SandpackPreview
                showOpenInCodeSandbox={false}
                showRefreshButton={false}
                style={{ height: "100%", border: "none" }}
              />
            </SandpackLayout>
          </SandpackProvider>
        </div>
      </div>
    </div>
  );
};
