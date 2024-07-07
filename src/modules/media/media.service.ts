import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Media } from "./entities/media.entity";
import { UpdateMediaDto } from "./dto/update-media.dto";

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

    return createdMedia;
  }

  async findAll() {
    return await this.mediaRepository.find();
  }

  async findOne(id: number) {
    const media = await this.mediaRepository.findOne({
      where: { id },
    });

    if (!media) {
      throw new NotFoundException(`media with id ${id} not found`);
    }

    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const media = await this.findOne(id);

    media.type = updateMediaDto.type ?? updateMediaDto.type;
    media.url = updateMediaDto.url ?? updateMediaDto.url;

    const updatedMedia = await this.mediaRepository.save(media);

    return updatedMedia;
  }

  async remove(id: number) {
    const media = await this.findOne(id);
    await this.mediaRepository.delete(media.id);

    return `media with id ${id} removed`;
  }
}
