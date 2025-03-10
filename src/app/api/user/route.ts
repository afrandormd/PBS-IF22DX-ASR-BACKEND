import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define the GET function
export async function GET(request: NextRequest) {
  const users = await prisma.tb_user.findMany({});
  //jika data tidak ada
  if (users.length == 0) {
    return NextResponse.json(
      {
        metaData: {
          error: 1,
          message: "Data User Tidak Ditemukan",
          status: 404,
        },
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      metaData: {
        error: 0,
        message: null,
        status: 200,
      },

      data_user: users,
    },
    {
      status: 200,
    }
  );
}
