import { IKVideo } from "imagekitio-react";
import { urlEndpoint } from "../utils/constants";
import { IKVideoProps } from "imagekitio-react/dist/types/components/IKVideo/combinedProps";

const VideoKit: React.FC<IKVideoProps> = (props) => {
  return <IKVideo urlEndpoint={urlEndpoint} {...props} />;
};

export default VideoKit;
