//buat variable prisma

import { apiResponse } from "@/utils/response";
import { PrismaClient } from "@prisma/client";
import { get } from "http";
import { NextRequest, NextResponse } from "next/server";

//buat variable prisma
const prisma = new PrismaClient

export const GET = async (request: NextRequest) => {
    try {
      // Ambil semua data dari tabel tb_user
      const users = await prisma.tb_user.findMany();
  
      // Gunakan apiResponse untuk membentuk response API
      return apiResponse("Success", 200, "OK", users);
  
    } catch (error) {
      console.error("Error fetching users:", error);
  
      return apiResponse("Internal Server Error", 500, "ERROR", null);
    }
  };