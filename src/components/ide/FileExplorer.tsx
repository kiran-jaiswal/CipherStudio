import { useState } from "react";
import { FileNode } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileCode2,
  Folder,
  FolderOpen,
  Plus,
  Trash2,
  Edit2,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileExplorerProps {
  files: FileNode[];
  activeFileId: string | null;
  onFileSelect: (fileId: string) => void;
  onFileCreate: (name: string) => void;
  onFileDelete: (fileId: string) => void;
  onFileRename: (fileId: string, newName: string) => void;
}

export const FileExplorer = ({
  files,
  activeFileId,
  onFileSelect,
  onFileCreate,
  onFileDelete,
  onFileRename,
}: FileExplorerProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [newFileName, setNewFileName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      onFileCreate(newFileName.trim());
      setNewFileName("");
      setIsCreating(false);
    }
  };

  const handleRename = (fileId: string) => {
    if (editName.trim()) {
      onFileRename(fileId, editName.trim());
      setEditingId(null);
      setEditName("");
    }
  };

  const startEditing = (file: FileNode) => {
    setEditingId(file.id);
    setEditName(file.name);
  };

  const renderFile = (file: FileNode, depth = 0) => {
    const isActive = file.id === activeFileId;
    const isEditing = editingId === file.id;
    const paddingLeft = `${depth * 1.5 + 0.5}rem`;

    if (file.type === "folder") {
      const isExpanded = expandedFolders.has(file.id);
      return (
        <div key={file.id}>
          <div
            className={cn(
              "flex items-center gap-2 py-1.5 px-2 cursor-pointer hover:bg-hover text-sm transition-colors",
              isActive && "bg-active"
            )}
            style={{ paddingLeft }}
            onClick={() => toggleFolder(file.id)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
            {isExpanded ? (
              <FolderOpen className="h-4 w-4 text-primary" />
            ) : (
              <Folder className="h-4 w-4 text-primary" />
            )}
            <span className="flex-1">{file.name}</span>
          </div>
          {isExpanded && file.children?.map((child) => renderFile(child, depth + 1))}
        </div>
      );
    }

    return (
      <div
        key={file.id}
        className={cn(
          "flex items-center gap-2 py-1.5 px-2 cursor-pointer hover:bg-hover text-sm transition-colors group",
          isActive && "bg-active"
        )}
        style={{ paddingLeft }}
        onClick={() => !isEditing && onFileSelect(file.id)}
      >
        <FileCode2 className="h-4 w-4 text-muted-foreground" />
        {isEditing ? (
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRename(file.id);
              if (e.key === "Escape") setEditingId(null);
            }}
            onBlur={() => handleRename(file.id)}
            className="h-6 text-xs flex-1"
            autoFocus
          />
        ) : (
          <>
            <span className="flex-1">{file.name}</span>
            <div className="opacity-0 group-hover:opacity-100 flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  startEditing(file);
                }}
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileDelete(file.id);
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 border-b border-sidebar-border">
        <span className="text-sm font-semibold text-sidebar-foreground">FILES</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => setIsCreating(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isCreating && (
          <div className="flex items-center gap-2 py-1.5 px-2">
            <FileCode2 className="h-4 w-4 text-muted-foreground" />
            <Input
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateFile();
                if (e.key === "Escape") setIsCreating(false);
              }}
              onBlur={handleCreateFile}
              className="h-6 text-xs flex-1"
              placeholder="filename.jsx"
              autoFocus
            />
          </div>
        )}
        {files.map((file) => renderFile(file))}
      </div>
    </div>
  );
};
