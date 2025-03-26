import { NextRequest, NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { getResponseUserNotFound, prisma } from "../general";


// Define the GET function
export async function GET(request: NextRequest) {
  const users = await prisma.tb_user.findMany({});
  // jika data tidak ada
  if (users.length === 0) {
    return getResponseUserNotFound
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
  const { nama_value, username_value, password_value } = await request.json();

  // cek apakah username sudah pernah dibuat atau belum
  const check = await prisma.tb_user.findMany({
    where: {
      username: username_value,
    },
  });

  // jika data username ditemukan
  if (check.length === 1) {
    return NextResponse.json(
      {
        metaData: {
          error: 1,
          message: "Data User Gagal Disimpan ! Username telah terdaftar.",
          status: 409,
        },
      },
      {
        status: 409,
      }
    );
  }

  // buat bcrypt
  const salt = genSaltSync(10);
  const result = hashSync(password_value, salt);

  // simpan datanya
  const save = await prisma.tb_user.create({
    data: {
      nama: nama_value,
      username: username_value,
      password: result,
    },
  });

  // proses atau response API
  return NextResponse.json(
    {
      metaData: {
        error: 0,
        message: "Data user berhasil disimpan",
        status: 201,
      },
    },
    {
      status: 201,
    }
  );
};
