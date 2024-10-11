"use client";
import { Editor, useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

export default function OGEditor() {
  const monaco = useMonaco();
  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("IDLE", {
        base: "vs",
        inherit: false,
        rules: [
          {
            background: "FFFFFF",
            token: "",
          },
          {
            token: "delimiter",
            foreground: "999999",
          },
          {
            token: "aaa",
            foreground: "00ff00",
          },
          {
            foreground: "919191",
            token: "comment",
          },
          {
            foreground: "00a33f",
            token: "string",
          },
          {
            foreground: "3b54bf",
            token: "number",
          },
          {
            foreground: "a535ae",
            token: "constant.language",
          },
          {
            foreground: "ff5600",
            token: "keyword",
          },
          {
            foreground: "ff5600",
            token: "storage",
          },
          {
            foreground: "21439c",
            token: "entity.name.type",
          },
          {
            foreground: "21439c",
            token: "entity.name.function",
          },
          {
            foreground: "a535ae",
            token: "support.function",
          },
          {
            foreground: "a535ae",
            token: "support.constant",
          },
          {
            foreground: "a535ae",
            token: "support.type",
          },
          {
            foreground: "a535ae",
            token: "support.class",
          },
          {
            foreground: "a535ae",
            token: "support.variable",
          },
          {
            foreground: "000000",
            background: "990000",
            token: "invalid",
          },
          {
            foreground: "990000",
            token: "constant.other.placeholder.py",
          },
        ],
        colors: {
          "editor.foreground": "#000000",
          "editor.background": "#FFFFFF",
          "editor.selectionBackground": "#BAD6FD",
          "editor.lineHighlightBackground": "#00000012",
          "editorCursor.foreground": "#000000",
          "editorWhitespace.foreground": "#BFBFBF",
        },
      });
      monaco.editor.setTheme("IDLE");
    }
  }, [monaco]);
  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0">
        <Editor
          height="100%"
          theme="IDLE"
          defaultLanguage="javascript"
          options={{
            fontFamily: "geist-mono",
            fontSize: 14,
            wordWrap: "on",
            tabSize: 2,
            minimap: {
              enabled: false,
            },
            smoothScrolling: true,
            cursorSmoothCaretAnimation: "on",
            contextmenu: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
