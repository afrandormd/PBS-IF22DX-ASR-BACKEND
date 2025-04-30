import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt-ts";

export const prisma = new PrismaClient();

// buat response untuk user tidak ditemukan
export const getResponseUserNotFound = NextResponse.json(
  {
    metaData: {
      error: 1,
      message: process.env.USER_NOT_FOUND_MESSAGE,
      status: 404,
    },
  },
  {
    status: 200,
  }
);

// buat fungsi bcrypt
export const setBcrypt = (real_password: string) => {
  // buat bcrypt
  const salt_password = genSaltSync(10);
  const hash_password = hashSync(real_password, salt_password);

  return hash_password
}
