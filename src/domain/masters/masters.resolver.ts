import { Args, Query, Resolver } from '@nestjs/graphql';
import { MastersCountService } from './masters.service';
import { MastersModel } from './schema/masters.schema';
import { GetMastersResponseDTO } from './dto/get-masters.dto';

// Masters ADD/UPDATE RESOLVER PENDING SHOULD BE WITH CURRENT DATE
@Resolver(() => MastersModel)
export class MastersResolver {
  constructor(private readonly mastersService: MastersCountService) {}

  @Query(() => GetMastersResponseDTO)
  async getCities(@Args('date', { nullable: true }) date?: string): Promise<GetMastersResponseDTO> {
    return this.mastersService.getRecords('city', date);
  }

  @Query(() => GetMastersResponseDTO)
  async getStates(@Args('date', { nullable: true }) date?: string): Promise<GetMastersResponseDTO> {
    return this.mastersService.getRecords('state', date);
  }

  @Query(() => GetMastersResponseDTO)
  async getBusinessCategories(
    @Args('date', { nullable: true }) date?: string,
  ): Promise<GetMastersResponseDTO> {
    return this.mastersService.getRecords('businessCategory', date);
  }
  // TODO: NO NEED
  @Query(() => GetMastersResponseDTO)
  async getOccupations(
    @Args('date', { nullable: true }) date?: string,
  ): Promise<GetMastersResponseDTO> {
    return this.mastersService.getRecords('occupation', date);
  }

  @Query(() => GetMastersResponseDTO)
  async getCommittees(
    @Args('date', { nullable: true }) date?: string,
  ): Promise<GetMastersResponseDTO> {
    return this.mastersService.getRecords('committee', date);
  }

  // TODO: NO NEED
  @Query(() => GetMastersResponseDTO)
  async getDesignations(
    @Args('date', { nullable: true }) date?: string,
  ): Promise<GetMastersResponseDTO> {
    return this.mastersService.getRecords('designation', date);
  }

  // TODO: NO NEED
  @Query(() => GetMastersResponseDTO)
  async getCurrentActivities(
    @Args('date', { nullable: true }) date?: string,
  ): Promise<GetMastersResponseDTO> {
    return this.mastersService.getRecords('currentActivity', date);
  }

  @Query(() => GetMastersResponseDTO)
  async getEducations(
    @Args('date', { nullable: true }) date?: string,
  ): Promise<GetMastersResponseDTO> {
    return this.mastersService.getRecords('education', date);
  }

  // TODO: NO NEED
  @Query(() => GetMastersResponseDTO)
  async getSubCommunities(
    @Args('date', { nullable: true }) date?: string,
  ): Promise<GetMastersResponseDTO> {
    return this.mastersService.getRecords('subCommunity', date);
  }

  // TODO: NO NEED
  @Query(() => GetMastersResponseDTO)
  async getLocalCommunities(
    @Args('date', { nullable: true }) date?: string,
  ): Promise<GetMastersResponseDTO> {
    return this.mastersService.getRecords('localCommunity', date);
  }

  // TODO: NO NEED
  @Query(() => GetMastersResponseDTO)
  async getNativePlaces(
    @Args('date', { nullable: true }) date?: string,
  ): Promise<GetMastersResponseDTO> {
    return this.mastersService.getRecords('nativePlace', date);
  }

  @Query(() => GetMastersResponseDTO)
  async getRelations(
    @Args('date', { nullable: true }) date?: string,
  ): Promise<GetMastersResponseDTO> {
    return this.mastersService.getRecords('relations', date);
  }

  @Query(() => GetMastersResponseDTO)
  async getGotras(@Args('date', { nullable: true }) date?: string): Promise<GetMastersResponseDTO> {
    return this.mastersService.getRecords('gotra', date);
  }

  @Query(() => GetMastersResponseDTO)
  async getSubCasts(
    @Args('date', { nullable: true }) date?: string,
  ): Promise<GetMastersResponseDTO> {
    return this.mastersService.getRecords('subCast', date);
  }
}
