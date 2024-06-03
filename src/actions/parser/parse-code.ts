"use server";

interface ErrorMarker {
  message: string;
  line: number;
  column: number;
}

interface ParserResponse {
  message: string;
  errors: ErrorMarker[];
  output: string;
  ll : string;

}

export const parseCode = async (code: string) => {
  try {
    const response = await fetch("http://localhost:8000/api/parser", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data: ParserResponse = await response.json();

    console.log(data);

    return {
      message: data.message,
      errors: data.errors,
      output: data.output,
      ll : data.ll
    };
  } catch (error) {
    return {
      message: "Error occurred while parsing code",
      errors: [],
    };
  }
};
