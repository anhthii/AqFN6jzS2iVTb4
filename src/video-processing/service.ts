import { extractFrame } from "./processor";
import { ExtractFrameParams } from "./params";

/* VideoProcessingService contains a list of utilities to con
 *
 *
 */
export default class VideoProcessingService {
  public static async extractFrameInBase64(
    params: ExtractFrameParams
  ): Promise<string> {
    const buffers: Buffer = await extractFrame(params);
    const base64 = buffers.toString("base64");
    return base64;
  }
}
