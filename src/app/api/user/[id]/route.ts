import { PrismaClient } from "@prisma/client";
import { count } from "console";
import { NextRequest, NextResponse } from "next/server";

// Initialize Prisma Client
const prisma = new PrismaClient();

//buat service delete (parameter = id) tb user
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  // cek apakah data sudah diinput
  const check = await prisma.tb_user.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  //jika data ditemukan
  if (!check) {
    return NextResponse.json(
      {
        metaData: {
          error: 1,
          message: "Data User Gagal Dihapus! ID User Tidak Ditemukan!",
          status: 404,
        },
      },
      {
        status: 404,
      }
    );
  }

  //proses delete data
  const query = await prisma.tb_user.delete({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json(
    {
      metaData: {
        error: 0,
        list: "Data User Berhasil Dihapus",
        status: 200,
      },
    },
    {
      status: 200,
    }
  );
};
