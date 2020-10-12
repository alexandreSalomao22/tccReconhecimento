import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'flex-end'
          }}>
          <TouchableOpacity
          style={{
            backgroundColor: '#808080',
            marginBottom: 20,
            borderRadius: 10,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicons name="md-reverse-camera" size={47} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.takePicture} style={{backgroundColor: '#696969', marginBottom: 20,  borderRadius: 10,  padding: 10,  flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Entypo name="camera" size={47} color="white" />
          </TouchableOpacity>  
        </View>
      </Camera>
    </View>
  );
}