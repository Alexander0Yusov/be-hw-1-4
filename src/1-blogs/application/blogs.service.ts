import { WithId } from 'mongodb';
import { Blog } from '../types/blog';
import { blogsRepository } from '../repository/blogs.repository';
import { BlogQueryInput } from '../router/input/blog-query.input';

export enum DriverErrorCode {
  HasActiveRide = 'DRIVER_HAS_ACTIVE_RIDE',
}

export const blogsService = {
  async findMany(
    queryDto: BlogQueryInput,
  ): Promise<{ items: WithId<Blog>[]; totalCount: number }> {
    return blogsRepository.findMany(queryDto);
  },

  async findByIdOrFail(id: string): Promise<WithId<Blog>> {
    return blogsRepository.findByIdOrFail(id);
  },

  //   async create(dto: DriverAttributes): Promise<string> {
  //     const newDriver: Driver = {
  //       name: dto.name,
  //       phoneNumber: dto.phoneNumber,
  //       email: dto.email,
  //       vehicle: {
  //         make: dto.vehicleMake,
  //         model: dto.vehicleModel,
  //         year: dto.vehicleYear,
  //         licensePlate: dto.vehicleLicensePlate,
  //         description: dto.vehicleDescription,
  //         features: dto.vehicleFeatures,
  //       },
  //       createdAt: new Date(),
  //     };

  //     return driversRepository.create(newDriver);
  //   },

  //   async update(id: string, dto: DriverAttributes): Promise<void> {
  //     await driversRepository.update(id, dto);
  //     return;
  //   },

  //   async delete(id: string): Promise<void> {
  //     const activeRide = await ridesRepository.findActiveRideByDriverId(id);

  //     if (activeRide) {
  //       throw new DomainError(
  //         `Driver has an active ride. Complete or cancel the ride first`,
  //         DriverErrorCode.HasActiveRide,
  //       );
  //     }

  //     await driversRepository.delete(id);
  //     return;
  //   },
};
