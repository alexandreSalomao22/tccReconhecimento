import React, {Component} from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native'
import {Picker} from '@react-native-community/picker'
import Input from '../components/Input'
import Dropdown from '../components/pickerBtn'
import unipSuperior from '../../assets/unipSuperior.png'
import commonStyles from '../commonStyles'
import {cpfMask} from '../components/mask'
import { Entypo } from '@expo/vector-icons'; 
import CameraCadastro from '../components/CameraCadastro'

export default class NovoUsuario extends Component{
    login = () =>{
    {/* this.props.navigation.navigate('Home'); //navegação do botão */}
    }

    /*goToImg = () =>{
        this.props.navigation.navigate('GetCamera');
    }*/

    sendRegister = async () => {
        const BASE_URL = "http://192.168.0.9:3000/user/addUser";

        const rawResponse = await fetch (`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'funcional' : this.state.funcional,
                'nome': this.state.nomeCompleto,
                'senha': this.state.senha,
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
        usuario: '',
        senha: '',
        nivelAcesso: ''
    }

    render(){
        return(
            <View style={styles.main}>
                <View style={styles.cabecalho}>
                    <Text style={styles.textoLogo}>Cadastrar Usuário</Text>
                    <Image style={styles.logoSuperior} source={unipSuperior} />
                </View>
                <View style={styles.infoLogin}>
                    <Input placeholder=" Digite o Nome Completo" onChangeText={text => this.setState({nomeCompleto: text})}/>
                    <Input placeholder=" Digite a Funcional" onChangeText={text => this.setState({funcional: text})}/>
                    <Input placeholder=" Digite o CPF" onChangeText={text => this.setState({cpf: text})}/>
                    <Input placeholder=" Digite a Senha" onChangeText={text => this.setState({senha: text})}/>
                    <Input placeholder=" Repetir a Senha" />
                    <View style={styles.pickerComponente} >
                        <Picker
                            style={{color:'#A9A9A9'}}
                            selectedValue={this.state.nivelAcesso}
                            onValueChange={
                                (itemValor, itemIndex) =>
                                    this.setState({
                                        nivelAcesso: itemValor
                                    })
                            }
                        >
                            <Picker.item label="Escolha o Nivel de Acesso: " value="Selecionar" />
                            <Picker.item label="Administrador" value="1" />
                            <Picker.item label="Atendente" value="2" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.rodape}>
                    <TouchableOpacity onPress={this.sendRegister} style={styles.touchableButton}> 
                        <View style={styles.buttonInferior}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.touchableButton}> 
                        <View style={styles.buttonInferior}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pickerComponente:{
        width: '90%',
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