import { CustomEditor } from "../components/editor/CustomEditor";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-3/4  ">
      {/* <Background /> */}
      <div className="flex justify-center items-center gap-4">
        <h2 className="text-4xl font-bold ">
          <span className="text-red-600">Mini</span>Golang
        </h2>

        <Image
          src={"/imgs/go-logo.png"}
          alt="Go Logo"
          width={80}
          height={80}
          className="my-6"
        />
      </div>

      <CustomEditor />
    </main>
  );
}
