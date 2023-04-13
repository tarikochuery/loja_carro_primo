import { cars } from "@prisma/client";
import prisma from "../config/database.js";

async function getCars(): Promise<cars[]> {
  return await prisma.cars.findMany();
}

async function getCar(id: number): Promise<cars | null> {
  return await prisma.cars.findUnique({
    where: {
      id
    }
  });
}

async function getCarWithLicensePlate(licensePlate: string): Promise<cars | null> {
  return await prisma.cars.findUnique({
    where: {
      licensePlate
    }
  });
}

async function upsertCar(model: string, licensePlate: string, year: number, color: string, id?: number): Promise<cars> {
  return await prisma.cars.upsert({
    create: {
      color,
      licensePlate,
      model,
      year
    },
    update: {
      color,
      licensePlate,
      model,
      year
    },
    where: {
      id: id || 0
    }
  });
}

async function deleteCar(id: number): Promise<cars> {
  return await prisma.cars.delete({
    where: {
      id
    }
  });
}

const carRepository = {
  getCar,
  getCarWithLicensePlate,
  getCars,
  upsertCar,
  deleteCar
};

export default carRepository;