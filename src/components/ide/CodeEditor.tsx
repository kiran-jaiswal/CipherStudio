import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { FileCode2 } from "lucide-react";

interface CodeEditorProps {
  fileName: string;
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

export const CodeEditor = ({ fileName, value, onChange, language = "javascript" }: CodeEditorProps) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const getLanguageFromFileName = (name: string): string => {
    const ext = name.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "jsx":
      case "js":
        return "javascript";
      case "tsx":
      case "ts":
        return "typescript";
      case "css":
        return "css";
      case "html":
        return "html";
      case "json":
        return "json";
      default:
        return "javascript";
    }
  };

  return (
    <div className="h-full flex flex-col bg-editor">
      <div className="flex items-center gap-2 px-4 py-2 bg-card border-b border-border">
        <FileCode2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-foreground">{fileName}</span>
      </div>
      
      <div className="flex-1">
        <Editor
          height="100%"
          language={getLanguageFromFileName(fileName)}
          value={value}
          onChange={(value) => onChange(value || "")}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            padding: { top: 16 },
          }}
        />
      </div>
    </div>
  );
};
