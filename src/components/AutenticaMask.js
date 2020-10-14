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
      top: containerY, 
      borderWidth: 5,
      borderColor: 'red'
    }}>
      <View style = {{
        //Left
        borderLeftWidth: 50,
        // borderLeftColor: 'red',
        //Right
        borderRightWidth: 100,
        //borderRightColor: 'red',
        //Bottom
        borderBottomWidth: 100,
        //borderBottomColor: 'red',
        //Top
        borderTopWidth: 100,
        //borderTopColor: 'red'
        //backgroundColor: 'white'
       }} 
      />
    </View>
  );
};

export default AutenticaMask