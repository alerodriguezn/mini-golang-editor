"use server";

interface ErrorMarker {
  message: string;
  line: number;
  column: number;
}

interface ParserResponse {
  message: string;
  errors: ErrorMarker[];
}

export const parseCode = async (code: string) => {
  try {
    const response = await fetch("http://ec2-18-191-238-90.us-east-2.compute.amazonaws.com:8000/api/parser", {
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

    return {
      message: data.message,
      errors: data.errors,
    };
  } catch (error) {
    return {
      message: "Error occurred while parsing code",
      errors: [],
    };
  }
};
