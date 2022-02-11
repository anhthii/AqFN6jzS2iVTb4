import ffmpeg from "fluent-ffmpeg";
import stream from "stream";
import { ExtractFrameParams } from "./params";

/**
 * extract an frame image from a video at a specific timestamp
 * @param videoUrl
 * @param timestamp in seconds
 */
const extractFrame = async ({
  videoUrl,
  timestamp,
}: ExtractFrameParams): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const bufferStream = new stream.PassThrough();
    // Read the passthrough stream
    const buffers: any = [];
    bufferStream.on("data", function (buf) {
      buffers.push(buf);
    });

    bufferStream.on("end", function () {
      const outputBuffer = Buffer.concat(buffers);
      resolve(outputBuffer);
    });

    ffmpeg()
      .input(videoUrl)
      .inputOptions(`-ss ${timestamp}`)
      .outputOption("-vframes 1")
      .outputOption("-an")
      .videoCodec("png")
      .format("image2pipe")
      .on("end", function () {
        // swalllow
      })
      .on("error", function (err) {
        console.error(err);
        reject(err);
      })
      .writeToStream(bufferStream, { end: true });
  });
};

export { extractFrame };
