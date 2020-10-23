import React from 'react'

import { View } from 'react-native';

const AutenticaMask = ({
  face: {
    bounds: {
      origin: { x: containerX, y: containerY },
      size: { width: faceWidth }
    },
    leftEyePosition,
    noseBasePosition,
    rightEyePosition
  }
}) => {
  return (
    <View style={{
      position: 'absolute',
      opacity: 0.5,
      backgroundColor: 'transparent',
      left: containerX,
      top: containerY*1.8, 
      width: faceWidth,
      height: faceWidth,
      borderWidth: 5,
      borderColor: 'red'
    }} />
  );
};

export default AutenticaMask