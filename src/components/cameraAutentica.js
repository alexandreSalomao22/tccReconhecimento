import React from 'react';
import { Text, View } from 'react-native';

import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

//import mask from ../mask/index.js

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
            messageColor: '#f5c542'
        }
        this.camera = ""
        this.onFacesDetected = this.onFacesDetected.bind(this)
        this.onFaceDetectionError = this.onFaceDetectionError.bind(this)
        this.onCameraPermission = this.onCameraPermission.bind(this)
        this.onRecognize = this.onRecognize.bind(this)
        this.cameraSnap = this.cameraSnap.bind(this)
    }
}