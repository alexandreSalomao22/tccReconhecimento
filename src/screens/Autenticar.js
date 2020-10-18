import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'

import FaceCamera from '../components/cameraAutentica'

export default class Autenticar extends Component{
    
    render(){
        return(
            <FaceCamera />
        )
    }

}

