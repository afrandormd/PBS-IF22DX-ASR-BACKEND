import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Initialize Prisma Client
const prisma = new PrismaClient();

// buat service "DELETE" (parameter = id) tb_user
export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {

  // proses delete data
  const query = await prisma.tb_user.delete({
    where: {
      id: Number(params.id),
    }
  })

  // proses atau response API
  return NextResponse.json(
    {
      metaData: {
        error: 0,
        message: "Data User Berhasil di Hapus!",
        status: 200,
      },
    },
    {
      status: 200,
    }
  );

}
