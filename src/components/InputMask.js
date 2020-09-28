import React from 'react'
import {StyleSheet} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'


export default props =>{
    return(
        <TextInputMask {...props} style={[styles.input, props.customStyle]}/>
    )   
}

const styles = StyleSheet.create({
    input:{
        width: '95%',
        backgroundColor: '#fff',
        height: 50,
        marginBottom: 20,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 5,
    },
})