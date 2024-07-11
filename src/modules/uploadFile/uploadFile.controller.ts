import { Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from "express";
import * as fs from "fs";
import * as path from "path";
import { apiResponse } from "src/helpers/apiResponse";

@Controller("upload")
export class FileUploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./upload",
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          cb(null, randomName + extname(file.originalname));
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    return apiResponse(`http://localhost:7777/upload/${file.filename}`);
  }

  @Get(":filename")
  async getFile(@Param("filename") filename: string, @Res() res: Response) {
    const uploadDir = path.join(__dirname, "..", "..", "..", "upload");
    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(filePath)) {
      console.error("File not found:", fs.existsSync(filePath));
      return res.status(404).json({ message: "File not found" });
    }

    res.sendFile(filePath);
  }
}
