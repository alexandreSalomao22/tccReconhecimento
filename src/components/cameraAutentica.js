import React from 'react';
import { Text, View } from 'react-native';

import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

import AutenticaMask from './AutenticaMask';
const flexStyle = { flex: 1 }
const flexCenterStyle = { flex: 1, justifyContent: 'center', alignItems: 'center' }
const BASE_URL = 'http://ec2-52-67-210-198.sa-east-1.compute.amazonaws.com:3000/face/recognize';

export default class FaceCamera extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            faces: [],
            photo: '',
            errors: 0,
            status: 0,
            message: 'Posicione o rosto na área indicada e aguarde!',
            messageColor: '#f5c542',
            timer: 5
        }
        this.camera = ""
        this.onFacesDetected = this.onFacesDetected.bind(this)
        this.onFaceDetectionError = this.onFaceDetectionError.bind(this)
        this.onCameraPermission = this.onCameraPermission.bind(this)
        this.onRecognize = this.onRecognize.bind(this)
    }

    componentDidMount() {
        Permissions
          .askAsync(Permissions.CAMERA)
          .then(this.onCameraPermission)
    }

    onCameraPermission({ status }) {
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    onRecognize = async (teste) => {
        var errors = 0;
        let foto = await this.camera.takePictureAsync({ quality: 0.2, base64: true });
        let counter = this.state.timer;
        
        const rawResponse = await fetch (`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "foto" : foto.base64
            })
        });
        var content = await rawResponse.json();

        if (content.status == 400 || content.status == 404) {
            counter = 3;
            errors++;
        }
        
        const x = setInterval(()=>{
            if (counter > 0) {
                if (errors == 0) {
                    this.setState({
                        message: counter +' - Bem-vindo ' + content.nome,
                        messageColor: '#23b823'
                    })
                } else {
                    this.setState({
                        message: counter + ' - Erro ao reconhecer o rosto!',
                        messageColor: '#cf2e1f'
                    })
                }
                counter--
            } else {
                clearInterval(x)
                this.setState({status: 0})
            }
        }, 1000)
    }

    onFacesDetected({faces}) {
        this.setState({ faces })
        if (this.state.status == 0) {
            if (faces.length == 1) {
                this.setState({
                    status: 1,
                    message: 'Verificando Rosto',
                    messageColor: '#f5c542'
                })

                this.onRecognize()
            } else {
                this.setState({
                message: 'Posicione o rosto na área indicada e aguarde!',
                messageColor: '#f5c542'
                })
            }
        }
    }

    onFaceDetectionError(error) {
        console.log(error)
    }

    render() {
        const { hasCameraPermission, faces } = this.state
    
        if (hasCameraPermission === null)
          return <View />
    
        if (hasCameraPermission === false)
          return (
            <View style={flexCenterStyle}>
              <Text>No access to camera</Text>
            </View>
            )
    
        return (
          <View style={flexStyle}>
            <View style={{height: 100, backgroundColor: this.state.messageColor}} >
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white', textAlign: 'center', marginTop: 50}}>{this.state.message}</Text>
            </View>
            <Camera
              style={flexStyle}
              type={Camera.Constants.Type.front}
              ref={ref => { this.camera = ref; }}
              faceDetectorSettings={{
                mode: FaceDetector.Constants.Mode.accurate,
                detectLandmarks: FaceDetector.Constants.Landmarks.all,
                runClassifications: FaceDetector.Constants.Classifications.all,
                minDetectionInterval: 5000
              }}
              onFacesDetected={this.onFacesDetected}
            />
            { faces.map(face => <AutenticaMask key={face.faceID} face={face} />) }
          </View>
        )
    }
}