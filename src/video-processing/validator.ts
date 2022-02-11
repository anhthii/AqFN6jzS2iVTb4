import { isURL } from "../common/utils/http";
import { isPositiveInteger } from "../common/utils/math";
import * as path from "path";

interface fieldValidator {
  fieldName: string;
  validate: (field: any) => boolean;
  message: string;
}

interface validatorResult {
  valid: boolean;
  error: string;
}

const VIDEO_EXTENSIONS = {
  MP4: "mp4",
  WEBM: "webm",
};

const validateExtractFrameParams = (params: any): validatorResult => {
  const validators: fieldValidator[] = [
    {
      fieldName: "videoUrl",
      validate: (url: string) => {
        const extname = path.extname(url);
        return (
          isURL(url) &&
          (extname.endsWith(VIDEO_EXTENSIONS.MP4) ||
            extname.endsWith(VIDEO_EXTENSIONS.WEBM))
        );
      },
      message: "Invalid video URL",
    },
    {
      fieldName: "timestamp",
      validate: isPositiveInteger,
      message: "Timestamp is not a positive integer",
    },
  ];

  for (const validator of validators) {
    if (!validator.validate(params[validator.fieldName])) {
      return {
        valid: false,
        error: `Error validating ${validator.fieldName}: ${validator.message}`,
      };
    }
  }

  return {
    valid: true,
    error: "",
  };
};

export { validateExtractFrameParams };
