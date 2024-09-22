import { IKImage } from "imagekitio-react";
import { IKImageProps } from "imagekitio-react/dist/types/components/IKImage/combinedProps";
import { urlEndpoint } from "../utils/constants";

const ImageKit: React.FC<IKImageProps> = (props) => {
  return <IKImage urlEndpoint={urlEndpoint} {...props} />;
};

export default ImageKit;
