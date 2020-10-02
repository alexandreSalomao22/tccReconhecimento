import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import Input from '../components/Input'
import UnipLogo from '../../assets/unip.png'
import commonStyles from '../commonStyles'

export default class Login extends Component{

    login = () =>{
        this.props.navigation.navigate('Home');
    }


    render(){
        return(
            <View style={styles.main}>
                <View style={styles.cabecalho}>

                </View>
                <View style={styles.infoLogin}>
                    <Image source={UnipLogo} />
                    <Input placeholder="Digite seu usuário" value="123" />
                    <Input placeholder="Digite sua senha" type="password" value="123" />
                    <TouchableOpacity onPress={this.login} style={styles.touchableButton}> 
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.rodape}>
                         <Text>Esqueceu sua senha?</Text>
                </View>
            </View>
            
        )
    }

}

const styles = StyleSheet.create({

    main:{
        width: '100%',
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column"
    },
    infoLogin:{
        flexDirection: 'column',
        flex: 3,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'

    },
    rodape:{
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        backgroundColor: 'blue',
        textAlign: 'right'
    },
    cabecalho:{
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        backgroundColor: 'red'
    },
    touchableButton:{
        width: '100%',
        marginTop: 20
    },
    button:{
        width: '100%',
        height: 55,
        borderRadius: 10,
        backgroundColor: commonStyles.colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 5,
    },
    buttonText:{
        textAlign: 'center',
        fontSize: 27,
        color: commonStyles.colors.primary
    }


})