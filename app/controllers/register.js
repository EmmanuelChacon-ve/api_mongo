import { json } from "express";
import RegisterService from "../services/register.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  var sliceSize = 1024;
  var byteCharacters = atob(base64Data);
  var bytesLength = byteCharacters.length;
  var slicesCount = Math.ceil(bytesLength / sliceSize);
  var byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    var begin = sliceIndex * sliceSize;
    var end = Math.min(begin + sliceSize, bytesLength);

    var bytes = new Array(end - begin);
    for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

async function saveBlobToFile(blob, filePath) {
  const buffer = Buffer.from(await blob.arrayBuffer());
  await fs.promises.writeFile(filePath, buffer);
}

const RegisterController = {
  async registerUser(req, res) {
    try {
      let filePath;

      if (req.body.image) {
        const imgJson = JSON.parse(req.body.image);
        const { base64, mimeType: imageFormato } = imgJson;
        const imagenBlob = base64toBlob(base64, imageFormato);
        const imgcat = `${Date.now()}.png`;
        filePath = path.join(process.cwd(), "uploads", imgcat);

        // Ensure the upload directory exists
        const dir = path.dirname(filePath);
        await fs.promises.mkdir(dir, { recursive: true });

        if (imagenBlob) {
          await saveBlobToFile(imagenBlob, filePath);
        }
      }

      const userData = {
        ...req.body,
        image: filePath ? filePath : undefined,
      };

      const newUser = await RegisterService.createUser(userData);
      console.log(newUser.image);
      res.status(201).json({
        success: true,
        message: "Usuario registrado exitosamente",
        data: newUser,
      });
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      res.status(err.statusCode || 500).json({
        success: false,
        message: err.statusCode ? err.message : "Error al registrar usuario",
        error: {
          message: err.message || "Error desconocido",
          status: err.statusCode || 500,
        },
      });
    }
  },
};

export default RegisterController;