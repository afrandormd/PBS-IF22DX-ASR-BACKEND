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

  // proses atau response API
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

// Buat service "POST" (tb_user)
export const POST = async (request: NextRequest) => {
  // buat object untuk data isian
  const { nama_value, username_value, password_value } = await request.json()

  // simpan datanya
  const save = await prisma.tb_user.create({
    data: {
      nama: nama_value,
      username: username_value,
      password: password_value
    },
  })

  // proses atau response API
  return NextResponse.json({
    metaData: {
      error: 0,
      message: "Data user berhasil disimpan",
      status: 201,
    }
  },
    {
      status: 201
    }
  );
}


