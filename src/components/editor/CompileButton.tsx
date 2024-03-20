"use client";

export const CompileButton = () => {
  return (
    <button
      disabled
      className="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded transition-all font-bold w-[15%] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Compile Code
    </button>
  );
};
