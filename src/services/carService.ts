import notFoundError from "../errors/notFoundError.js";
import conflictError from "../errors/conflictError.js";
import carRepository from "../repository/carRepository.js";
import { cars } from "@prisma/client";

async function getCars() {
  const cars = await carRepository.getCars();
  return cars;
}

async function getCar(id: number) {
  const car = await carRepository.getCar(id);
  if (!car) {
    throw notFoundError();
  }

  return car;
}

async function createCar(model: string, licensePlate: string, year: number, color: string) {
  const car = await carRepository.getCarWithLicensePlate(licensePlate);
  if (car) {
    throw conflictError(`Car with license plate ${licensePlate} already registered.`);
  }

  await carRepository.upsertCar(model, licensePlate, year, color);
}

async function updateCar({
  color,
  licensePlate,
  model,
  year,
  id
}: Omit<cars, 'createAt'>): Promise<void> {
  const car = await carRepository.getCar(id);
  if (!car) throw notFoundError();

  await carRepository.upsertCar(model, licensePlate, year, color, id);
}

async function deleteCar(id: number) {
  await getCar(id);
  await carRepository.deleteCar(id);
}

const carService = {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar
};

export default carService;