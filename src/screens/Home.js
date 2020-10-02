import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import Input from '../components/Input'
import UnipLogo from '../../assets/unip.png'

export default class Home extends Component{


    render(){
        return(
            <View style={styles.homeStyle}>
                <Image source={UnipLogo} />
            </View>
            
        )
    }

    

}

const styles = StyleSheet.create({

    homeStyle:{
        flexDirection: 'column',
        flex: 3,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'

    }

})
