"use client";

import { useState } from "react";
import { loader } from "@monaco-editor/react";
import Editor from "@monaco-editor/react";
import { parseCode } from "@/actions/parser/parse-code";
import { ubuntu } from "@/config/fonts";

interface ErrorMarker {
  message: string;
  line: number;
  column: number;
}

const defaultCode = `package main;

func main() int{

};
`;

export const CustomEditor = () => {
  const [currentErrors, setCurrentErrors] = useState<ErrorMarker[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");

  async function handleEditorChange(value:any) {
    const { message, errors } = await parseCode(value);

    if (!errors) {
      loader.init().then((monaco) => {
        monaco.editor.setModelMarkers(
          monaco.editor.getModels()[0],
          "parser",
          []
        );
      });
    } else {
      loader.init().then((monaco) => {
        monaco.editor.setModelMarkers(
          monaco.editor.getModels()[0],
          "parser",
          errors.map((error) => {
            return {
              startLineNumber: error.line,
              startColumn: error.column,
              endLineNumber: error.line,
              endColumn: error.column,
              message: error.message,
              severity: monaco.MarkerSeverity.Error,
            };
          })
        );
      });
    }

    setCurrentErrors(errors);
    setCurrentMessage(message);
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <Editor
        theme="vs-dark"
        height="50vh"
        className="rounded-lg border-4 border-slate-800 w-full h-96"
        defaultLanguage="go"
        defaultValue={defaultCode}
        onChange={handleEditorChange}
      />

      <div className=" w-full  rounded-lg border-4 border-slate-800 mt-4 bg-zinc-950">
        <h2 className="text-sm font-light p-1 ml-2 text-slate-400">Output</h2>
        <div className={`${ubuntu.className} p-2 ml-2`}>
          {currentErrors?.length > 0
            ? currentErrors.map((error, index) => {
                return (
                  <div key={index} className="text-red-600">
                    {error.message +
                      " at line " +
                      error.line +
                      " column " +
                      error.column}
                  </div>
                );
              })
            : ""}
        </div>
        <div>
          <p className={`${ubuntu.className} p-2 ml-2 text-amber-600`}>
            {currentMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
