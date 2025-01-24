import {ImageProps, Image as RNImage} from 'react-native';
import React, {FunctionComponent} from 'react';

interface CustomImageProps extends ImageProps {
  source: number | string | FunctionComponent;
}

const Image = ({source: SourceImage, style, ...props}: CustomImageProps) => {
  if (typeof SourceImage === 'number' || typeof SourceImage === 'string' || typeof SourceImage === undefined) {
    return (
      <RNImage
        {...props}
        source={SourceImage}
        style={style}
      />
    );
  } else {
    return <SourceImage />;
  }
};

export default Image;
