import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt-ts";

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

// buat service "Get" (detail data) tb_user
export const GET = async (request: NextRequest, props: { params: Promise<{ id: string }> }) => {
  try {

    const params = await props.params;

    // cek apakah id ada / tidak
    const check = await prisma.tb_user.findUnique({
      where: {
        id: Number(params.id),
      }
    })

    // jika data user tidak ditemukan
    if (!check) {
      return NextResponse.json({
        metaData: {
          error: 1,
          message: "Data User Tidak di Temukan",
          status: 404
        },
      }, {
        status: 404
      })
    }

    // proses/respond API
    return NextResponse.json({
      metaData: {
        error: 0,
        masage: "null",
        status: 200
      },
      data_user: check
    }, {
      status: 200
    })
  }
  catch (e: any) {
    return NextResponse.json({
      metaData: {
        error: 1,
        message: "parameter slug harus angka !",
        status: 400
      },
    }, {
      status: 400
    })
  }
}

// buat server put (edit data) tb_user
export const PUT = async (request: NextRequest, props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  // cek apakah id ada / tidak
  const check = await prisma.tb_user.findUnique({
    where: {
      id: Number(params.id),
    }
  })

  // jika data user tidak ditemukan
  if (!check) {
    return NextResponse.json({
      metaData: {
        error: 1,
        message: "Data User Tidak di Temukan",
        status: 404
      },
    }, {
      status: 404
    })
  }

  // buat data objek untuk data isian
  const { nama_value, username_value, password_value } = await request.json()

  // cek apakah username sudah pernah ada / belum 
  const checkUsername = await prisma.tb_user.findMany({
    where: {
      username: username_value,
      NOT: { id: Number(params.id) }
    },
  });

  // jika data username ditemukan
  if (checkUsername.length >= 1) {
    return NextResponse.json(
      {
        metaData: {
          error: 1,
          message: "Data User Gagal Diubah ! Username telah terdaftar.",
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

  const edit = await prisma.tb_user.update({
    where: {
      id: Number(params.id),
    },
    data: {
      nama: nama_value,
      username: username_value,
      password: result,
    },
  })

  // proses/respond API
  return NextResponse.json({
    metaData: {
      error: 0,
      masage: "Data User Berhasil Diupdate",
      status: 200
    },
  }, {
    status: 200
  })
}
