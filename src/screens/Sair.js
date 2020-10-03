import React, {Component} from 'react'
import {View, StyleSheet, Text, BackHandler} from 'react-native'


export default class Sair extends Component{


    render(){
        return(
            BackHandler.exitApp()
        )
    }

}

