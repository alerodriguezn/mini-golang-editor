"use client";

import { use, useCallback, useEffect, useRef, useState } from "react";
import { OnMount, loader, useMonaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import Editor from "@monaco-editor/react";
import { parseCode } from "@/actions/parser/parse-code";
import { ubuntu } from "@/config/fonts";
import { CompileButton } from "./CompileButton";
import { testFiles } from "@/utils/test-files";
import theme from "@/lib/monaco/themes/night-owl.json";
import { useFilesStore } from "@/store/files-store";

interface ErrorMarker {
  message: string;
  line: number;
  column: number;
}

type File = {
  name: string;
  content: string;
};

interface Props {
  file: File;
}

export const CustomEditor = ({ file }: Props) => {
  const [value, setValue] = useState(file.content || "");
  const [currentErrors, setCurrentErrors] = useState<ErrorMarker[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentLine, setCurrentLine] = useState(0);

  // const currentFile = useFilesStore((state) => state.currentFile);
  const updateFile = useFilesStore((state) => state.updateFile);


  const handleMount: OnMount = (editor, monaco) => {
    monaco.editor.defineTheme("night-owl", theme as any);
    monaco.editor.setTheme("night-owl");
  };


  useEffect(() => {
    setValue(file.content || "");
  }, [file]);

  useEffect(() => {
    handleEditorChange(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])




  async function handleEditorChange(value: string | undefined) {

    
    setValue(value || "");

    updateFile({ name: file.name, content: value || "" });
 
    if (!value) return;
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

  const handleMoveToError = (line: number) => {
    setCurrentLine(line);
  };
  const handleTest = (testNum: number) => {

    setValue(testFiles[testNum]);
    updateFile({ name: file.name, content: testFiles[testNum] });
    handleEditorChange(testFiles[testNum]);
    
    
  };

  return (
    <div className="flex flex-col gap-6 w-full mb-4">
      <Editor
        theme={"night-owl"}
        height="50vh"
        className="rounded-lg border-4 border-slate-800 w-full h-96"
        defaultLanguage="go"
        defaultValue={file.content || ""}
        onMount={handleMount}
        onChange={handleEditorChange}
        value={value}
        line={currentLine}
      />

      <div className=" w-full  rounded-lg border-4 border-slate-800 mt-4 bg-zinc-950">
        <h2 className="text-sm font-light p-1 ml-2 text-slate-400">Output</h2>
        <div className={`${ubuntu.className} p-2 ml-2`}>
          {currentErrors?.length > 0
            ? currentErrors.map((error, index) => {
                return (
                  <div key={index} className="text-red-600 flex ">
                    {error.message + " "}{" "}
                    <button
                      className=" underline text-amber-600"
                      onClick={() => handleMoveToError(error.line)}
                    >
                      at line {error.line}
                    </button>
                    {", column " + error.column}
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
      <div className="w-full flex justify-end items-center">
        <h4 className="font-light text-sm mr-3">
          **Archivos de Prueba, no hace falta darle a compilar, el parser se
          ejecuta cuando cambia el código{" "}
        </h4>
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded transition-all font-bold w-[15%] mr-2"
          onClick={() => handleTest(0)}
        >
          Test 1 ✅
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded transition-all font-bold w-[15%] mr-2"
          onClick={() => handleTest(1)}
        >
          Test 2 ✅
        </button>
        <button
          className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded transition-all font-bold w-[15%] mr-2"
          onClick={() => handleTest(2)}
        >
          Test Errors ❌
        </button>
        {/* <CompileButton /> */}
      </div>
    </div>
  );
};
