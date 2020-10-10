import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class CameraCadastro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null
    }
  }

  componentDidMount() {
    Permissions
      .askAsync(Permissions.CAMERA)
      .then(this.onCameraPermission)
  }

  onCameraPermission({ status }) {
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  takePicture = async () => { 
    try {
      if (this.camera) {
        const options = {
          quality: 0.2,
          base64: true,
          forceUpOrientation: true,
          fixOrientation: true
        };
        const { uri } = await this.camera.takePictureAsync(options);
        setImageUri(uri);

        alert("ok");
      }
    } catch (err) {
      alert(err.message);
    }
  }

  render() {
    const { hasCameraPermission } = this.state
    
    if (hasCameraPermission === null)
      return <View />

    if (hasCameraPermission === false)
      return (
        <View>
          <Text>Sem Permissão</Text>
        </View>
      )

    return (
      <Camera
        ref={camera => { this.camera = camera; }}
        style={styles.camera}
        type={Camera.Constants.Type.front}
        autoFocus={Camera.Constants.AutoFocus.on}
        //flashMode={Camera.Constants.FlashMode.off}
        permissionDialogTitle={"Permission to use camera"}
        permissionDialogMessage={"We need your permission to use your camera phone"}
      >
        <TouchableOpacity onPress={takePicture} style={styles.button}>
          <Text>PICTURE</Text>
        </TouchableOpacity>
      </Camera>
    )
  }
}

const styles = StyleSheet.create({
  camera: {
    flex: 1
  },
  button: {
    alignSelf: "center",
    backgroundColor: "blue",
    color: "#fff"
  }
});