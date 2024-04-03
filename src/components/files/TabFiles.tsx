"use client";

import { Tab } from "@headlessui/react";
import { CustomEditor } from "../editor/CustomEditor";
import { useFilesStore } from "@/store/files-store";
import Image from "next/image";
import { IoTrash } from "react-icons/io5";
import { useEffect } from "react";


export const TabFiles = () => {

  const files = useFilesStore((state) => state.files);
  //const setCurrentFile = useFilesStore((state) => state.setCurrentFile);
  const deleteFile = useFilesStore((state) => state.deleteFile);

 
  // useEffect(() => {
  //   if (files.length) {
  //     setCurrentFile(files[0]);
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [files]);


  const handleTabChange = (name: string) => {
    // const file = files.find((f) => f.name === name);
    // if (!file) return;
    // setCurrentFile(file);

  };

  if (!files.length) {
    return (
      <div className="flex p-3 justify-center items-center text-center mt-24 rounded-md font-semibold border-2 border-dashed border-zinc-600">
        <h3>No files to display (Create New File)</h3>
      </div>
    );
  }

  return (
    <div className="w-full mt-4 ">
      <Tab.Group>
        <Tab.List
          className={"flex gap-4 space-x-1 rounded-lg border-4 border-slate-800 p-1 "}
        >
          {files.map((file, index) => (
            <div key={index} className="flex gap-2">
              <Tab
                className={
                  "flex h-6 gap-2 items-center w-full rounded-lg text-sm leading-5 font-semibold"
                }
                onClick={() => handleTabChange(file.name)}
              >
                <Image
                  src={"/imgs/go-logo.png"}
                  alt="Go Logo"
                  width={20}
                  height={20}
                  className="my-6"
                />
                {file.name}.mg
              </Tab>
              <button 
                onClick={() => deleteFile(file.name)}
              >
                <IoTrash width={20} height={20} color="red" />
              </button>
            </div>
          ))}
        </Tab.List>
        <Tab.Panels>
          {files.map((file, index) => (
            <Tab.Panel key={index}>
              <CustomEditor file={file} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
