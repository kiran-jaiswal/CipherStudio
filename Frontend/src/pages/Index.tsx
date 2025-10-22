import { useState, useEffect } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Toolbar } from "@/components/ide/Toolbar";
import { FileExplorer } from "@/components/ide/FileExplorer";
import { CodeEditor } from "@/components/ide/CodeEditor";
import { PreviewPane } from "@/components/ide/PreviewPane";

import { Project, FileNode, DEFAULT_FILES } from "@/types/project";
import { toast } from "@/hooks/use-toast";


const Index = () => {
  const [project, setProject] = useState<Project>(() => {
    const saved = localStorage.getItem("cipherstudio-project");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      id: "default-project",
      name: "My React App",
      files: DEFAULT_FILES,
      activeFileId: "app-jsx",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const activeFile = project.files.find((f) => f.id === project.activeFileId);

  const saveProject = () => {
    const updated = { ...project, updatedAt: Date.now() };
    localStorage.setItem("cipherstudio-project", JSON.stringify(updated));
    setProject(updated);
  };

  const handleProjectNameChange = (name: string) => {
    setProject((prev) => ({ ...prev, name }));
  };

  const handleFileSelect = (fileId: string) => {
    setProject((prev) => ({ ...prev, activeFileId: fileId }));
  };

  const handleFileContentChange = (content: string) => {
    setProject((prev) => ({
      ...prev,
      files: prev.files.map((f) =>
        f.id === prev.activeFileId ? { ...f, content } : f
      ),
    }));
  };

  const handleFileCreate = (name: string) => {
    const newFile: FileNode = {
      id: `file-${Date.now()}`,
      name,
      type: "file",
      content: "// Start coding...\n",
    };
    setProject((prev) => ({
      ...prev,
      files: [...prev.files, newFile],
      activeFileId: newFile.id,
    }));
    toast({
      title: "File created",
      description: `${name} has been created.`,
    });
  };

  const handleFileDelete = (fileId: string) => {
    const file = project.files.find((f) => f.id === fileId);
    setProject((prev) => {
      const newFiles = prev.files.filter((f) => f.id !== fileId);
      const newActiveId = prev.activeFileId === fileId 
        ? (newFiles[0]?.id || null) 
        : prev.activeFileId;
      return {
        ...prev,
        files: newFiles,
        activeFileId: newActiveId,
      };
    });
    toast({
      title: "File deleted",
      description: `${file?.name} has been deleted.`,
      variant: "destructive",
    });
  };

  const handleFileRename = (fileId: string, newName: string) => {
    setProject((prev) => ({
      ...prev,
      files: prev.files.map((f) =>
        f.id === fileId ? { ...f, name: newName } : f
      ),
    }));
    toast({
      title: "File renamed",
      description: `File renamed to ${newName}`,
    });
  };

  const handleRun = () => {
    setRefreshKey((prev) => prev + 1);
    toast({
      title: "Running project",
      description: "Your React app is being executed.",
    });
  };

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveProject();
    }, 30000);
    return () => clearInterval(interval);
  }, [project]);

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      <Toolbar
        projectName={project.name}
        onProjectNameChange={handleProjectNameChange}
        onSave={saveProject}
        onRun={handleRun}
      />

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <FileExplorer
            files={project.files}
            activeFileId={project.activeFileId}
            onFileSelect={handleFileSelect}
            onFileCreate={handleFileCreate}
            onFileDelete={handleFileDelete}
            onFileRename={handleFileRename}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={45} minSize={30}>
          {activeFile ? (
            <CodeEditor
              fileName={activeFile.name}
              value={activeFile.content || ""}
              onChange={handleFileContentChange}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-editor text-muted-foreground">
              Select a file to start coding
            </div>
          )}
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={35} minSize={25}>
          <PreviewPane files={project.files} refreshKey={refreshKey} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;
