import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define the GET function
export async function GET(request: NextRequest) {
  const users = await prisma.tb_user.findMany();
  return NextResponse.json({
    meta_data: {
      error: 0,
      list: "Data User",

    },
    data_user: users,
  },
    {
      status: 200,
    },
  );
}
