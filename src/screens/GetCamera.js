import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet, ProgressBarAndroid } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default class GetCamera extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    }
    this.camera = ""
    this.onCameraPermission = this.onCameraPermission.bind(this)
  }

  componentDidMount() {
    Permissions
      .askAsync(Permissions.CAMERA)
      .then(this.onCameraPermission)
  }

  onCameraPermission({ status }) {
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  takePicture = () => {
    setTimeout(() => {
      Alert.alert(
        "inserindo imagem...",
        "...",
        [
        ],
        { cancelable: false }
      );
    }, 100);
    const options = { quality: 0.2, base64: true, fixOrientation: true, exif: true};
    if (this.camera) {
        this.camera.takePictureAsync(options).then(photo => {
          photo.exif.Orientation = 1;  
          Alert.alert(
            'FOTO TIRADA!'
          )
          //console.log(photo)
          this.return(photo);
          //console.log(photo);    
          //this.props.navigation.navigate('GetCamera', photo); 
        });    
    }
  };

  onPictureSaved = photo => {
    Alert.alert(
      'FOTO TIRADA!'
    )
  }

  return = (photo) => {
    var params = this.props.navigation.state.params;
    if (photo.base64 != undefined) {
      params.fotos.push(photo.base64)
      params.localFotos.push({"infoFoto": "foto"+Math.random()})
    }
    console.log(params.localFotos)
    //params.fotos[] = "teste";
    this.props.navigation.navigate('NovoAcesso', params);
  }

  sendRegister = async () => {
    const BASE_URL = "http://192.168.0.9:3000/user/addAcesso";

    const rawResponse = await fetch (`${BASE_URL}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'ra' : '',
            'nome': '',
            'cpf': '',
            'fotos': ''
        })
    });
    var content = await rawResponse.json();

    if (content.status != 200) {
        alert("Erro ao cadastrar usuário. Tente novamente!")
    } else {
        alert(content.message)
        this.props.navigation.navigate('NovoUsuario');
    }
  }

  render() {
    const { hasCameraPermission, type } = this.state

    if (hasCameraPermission === null) {
      return <View />;
    }

    if (hasCameraPermission === false) {
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
                if (type === Camera.Constants.Type.back) {
                  this.setState({ type: Camera.Constants.Type.front})
                } else {
                  this.setState({ type: Camera.Constants.Type.back})
                }
              }}>
              <Ionicons name="md-reverse-camera" size={47} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.return} style={{backgroundColor: '#696969', marginBottom: 20,  borderRadius: 10,  padding: 10,  flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Entypo name="ccw" size={47} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.takePicture} style={{backgroundColor: '#696969', marginBottom: 20,  borderRadius: 10,  padding: 10,  flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Entypo name="camera" size={47} color="white" />
            </TouchableOpacity>  
          </View>
        </Camera>
      </View>
    );
  }
}