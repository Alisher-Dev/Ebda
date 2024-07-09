import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Media } from "./entities/media.entity";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { FindAllDto } from "src/helpers/dto";
import { Pagination } from "src/helpers/pagination";
import { apiResponse } from "src/helpers/apiResponse";

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) {}

  async create(createMediaDto: CreateMediaDto) {
    const { type, url } = createMediaDto;
    const newMedia = new Media();

    newMedia.type = type;
    newMedia.url = url;

    const createdMedia = await this.mediaRepository.save(newMedia);

    return apiResponse(createdMedia);
  }

  async findAll({ page, limit }: FindAllDto) {
    const totalItems = await this.mediaRepository.count();
    const pagination = new Pagination(totalItems, page, limit);

    const media = await this.mediaRepository.find({
      skip: pagination.offset,
      take: pagination.limit,
    });

    return apiResponse(media, pagination);
  }

  async findOne(id: number) {
    const media = await this.mediaRepository.findOne({
      where: { id },
    });

    if (!media) {
      throw new NotFoundException(`media with id ${id} not found`);
    }

    return apiResponse(media);
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const media = (await this.findOne(id)).data;

    media.type = updateMediaDto.type ?? updateMediaDto.type;
    media.url = updateMediaDto.url ?? updateMediaDto.url;

    const updatedMedia = await this.mediaRepository.save(media);

    return apiResponse(updatedMedia);
  }

  async remove(id: number) {
    const media = (await this.findOne(id)).data;
    await this.mediaRepository.delete(media.id);

    return apiResponse(`media with id ${id} removed`);
  }
}
