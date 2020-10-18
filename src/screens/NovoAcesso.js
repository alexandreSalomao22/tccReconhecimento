import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import Input from '../components/Input'
import unipSuperior from '../../assets/unipSuperior.png'
import commonStyles from '../commonStyles'
import {cpfMask} from '../components/mask'
import { Entypo } from '@expo/vector-icons'; 
import GridFotos from '../components/GridFotos'

export default class NovoAcesso extends Component{

    login = () =>{
    {/* this.props.navigation.navigate('Home'); //navegação do botão */}
    }

    goToImg = () =>{
        this.props.navigation.navigate('GetCamera');
    }

    sendRegister = async () => {
        const BASE_URL = "http://192.168.100.5:3000/user/addUser";

        const rawResponse = await fetch (`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'funcional' : this.state.funcional,
                'nome': this.state.nomeCompleto,
                'cpf': this.state.cpf,
                'nivel_acesso': this.state.nivelAcesso
            })
        });
        var content = await rawResponse.json();
        
        if (content.status != 200) {
            alert("Erro ao cadastrar usuário. Tente novamente!")
        } else {
            alert(content.message)
            this.props.navigation.navigate('NovoUsuario');
        }
    }

    state = {
        nomeCompleto: '',
        funcional: '',
        cpf: '',
        nivelAcesso: null
    }

    render(){
        return(
            <View style={styles.main}>
                <View style={styles.cabecalho}>
                        <Text style={styles.textoLogo}>Cadastrar Acesso</Text>
                         <Image style={styles.logoSuperior} source={unipSuperior} />
                </View>
                <View style={styles.infoLogin}>
                    
                    <Input placeholder="Digite o Nome Completo" />
                    <Input placeholder="Digite o CPF" />
                    <Input placeholder="RA / Funcional" />
                    <TouchableOpacity onPress={this.goToImg} style={styles.touchableButton}> 
                        <View style={styles.button}>
                        <Entypo name="camera" size={24} color="black" />
                            <Text style={styles.buttonText}>Capturar Imagens</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.rodape}>
                    <GridFotos />
                    {/*renderItem={({item})=> ( 
                                <Image 
                                source={{uri: item.picture.user}} 
                                />
                    )}  */}
                </View>
            </View>
            
        )
    }

}

const styles = StyleSheet.create({

    logoSuperior:{
        marginLeft: 250,
        marginTop: -40
    },
    textoLogo:{
        marginTop: 30,
        marginLeft: 10,
        fontSize: 30
    },
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
        textAlign: 'right'
    },
    cabecalho:{
        flexDirection: 'column',
        flex: 1,
        width: '100%',
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
        fontSize: 20,
        color: commonStyles.colors.primary
    },

    buttonInferior:{
        width: '45%',
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
    }


})