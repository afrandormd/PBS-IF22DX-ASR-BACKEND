import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

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
    status: 404,
  }
);

