import { NextResponse } from "next/server";

interface Meta {
  message: string;
  code: number;
  status: string;
}

interface APIResponse {
  meta: Meta;
  data: any;
}

/**
 * Fungsi untuk membentuk response API
 * @param message Pesan dari response
 * @param code Kode status HTTP
 * @param status Status response ("OK", "ERROR", dll.)
 * @param data Data yang dikembalikan (bisa berupa objek, array, atau null)
 * @returns Response JSON dalam format standar
 */
export const apiResponse = (message: string, code: number, status: string, data: any) => {
  const response: APIResponse = {
    meta: {
      message,
      code,
      status,
    },
    data,
  };

  return NextResponse.json(response, { status: code });
};

/**
 * Fungsi untuk menangani error validasi
 * @param err Error yang terjadi
 * @returns Array string berisi pesan error
 */
export const formatValidationError = (err: any): string[] => {
  const errors: string[] = [];

  if (err instanceof Error) {
    errors.push(err.message);
  } else if (Array.isArray(err)) {
    err.forEach((e) => {
      if (typeof e === "string") {
        errors.push(e);
      } else if (e?.message) {
        errors.push(e.message);
      }
    });
  }

  return errors;
};
