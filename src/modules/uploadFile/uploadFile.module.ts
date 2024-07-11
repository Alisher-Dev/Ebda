import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { FileUploadController } from "./uploadFile.controller";

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: "./upload",
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
