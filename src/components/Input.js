import React from 'react'
import {TextInput, StyleSheet} from 'react-native'


export default props =>{
    return(
        <TextInput {...props} style={[styles.input, props.customStyle]} />
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