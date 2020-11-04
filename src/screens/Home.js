import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import Input from '../components/Input'
import UnipLogo from '../../assets/unip.png'

export default class Home extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={styles.homeStyle}>
                <View>
                    <Text style={styles.txtHome}>Biometria Facial</Text>
                </View>
                <View >
                    <Image style={styles.imgHome} source={UnipLogo} />
                </View>
                <Text style={{justifyContent: 'center', alignItems: 'center'}}>
                    Faça um movimento de arrastar da esquerda
                </Text>
                <Text>para direita para abrir o menu</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    homeStyle:{
        flexDirection: 'column',
        flex: 3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtHome: {
        fontSize: 30
    },
    imgHome:{
        width: 250,
        height: 250,
        resizeMode: 'contain'
    }
})
