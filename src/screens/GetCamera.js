import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';

takePicture = () => {
  const options = { quality: 1, base64: true, fixOrientation: true, 
    exif: true};
  if (this.camera) {
      this.camera.takePictureAsync(options).then(photo => {
        photo.exif.Orientation = 1;  
        Alert.alert(
          'FOTO TIRADA!'
       )          
         console.log(photo);            
      });    
  }
};

onPictureSaved = photo => {
  Alert.alert(
    'FOTO TIRADA!'
 )
  console.log(photo);
} 

export default function GetCamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={(ref) => { this.camera = ref }}>
        <View>
          <TouchableOpacity onPress={this.takePicture}>
            <Text style={{ fontSize: 50, marginBottom: 10, color: 'white' }}> TIRAR FOTO </Text>
          </TouchableOpacity>  
        </View>  
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}