import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'

import FaceCamera from '../components/CameraAutentica'

export default class Autenticar extends Component{
    
    render(){
        return(
            <FaceCamera />
        )
    }

}

