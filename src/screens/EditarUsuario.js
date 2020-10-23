import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import {Picker} from '@react-native-community/picker'
import Input from '../components/Input'
import Dropdown from '../components/pickerBtn'
import unipSuperior from '../../assets/unipSuperior.png'
import commonStyles from '../commonStyles'
import {cpfMask} from '../components/mask'
import { Entypo } from '@expo/vector-icons'; 

export default class EditarUsuario extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: props.navigation.state.params.id,
            nomeCompleto: '',
            funcional: '',
            cpf: '',
            senha: '',
            senha_confirma: '',
            nivel_acesso: null,
            situacao: 0,
            situacaoext: "Desativado"
        }
    }

    componentDidMount() {
        this.getDados()
    }

    getDados = async () => {
        const BASE_URL = "http://192.168.100.5:3000/user/editUser/"+this.state.id;

        const rawResponse = await fetch (`${BASE_URL}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        var content = await rawResponse.json();

        if (content.status == 404) {
            alert(content.message)
            this.props.navigation.navigate('ConsultarAcesso');
        } else {
            let _situacaoext = ""; 
            if (content[0].situacao == 1) {
                _situacaoext = "Ativo";
            } else {
                _situacaoext = "Desativado";
            }
            this.setState({
                id: content[0].id_usuario,
                nomeCompleto: content[0].nome,
                funcional: content[0].funcional,
                cpf: ''+content[0].cpf+'',
                nivel_acesso: ''+content[0].nivel_acesso+'',
                situacao: content[0].situacao,
                situacaoext: _situacaoext
            });
        }
    }

    sendRegister = async () => {
        const BASE_URL = "http://192.168.100.5:3000/user/editUser/"+this.state.id;
        
        const rawResponse = await fetch (`${BASE_URL}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'funcional' : this.state.funcional,
                'nome': this.state.nomeCompleto,
                'senha': this.state.senha,
                'senha_confirma': this.state.senha_confirma,
                'cpf': this.state.cpf,
                'nivel_acesso': this.state.nivel_acesso
            })
        });

        var content = await rawResponse.json();
        console.log(content)
        if (content.status != 200) {
            alert(content.message)
        } else {
            
            alert(content.message)
        }
    }
    
    changeSituation = async () => {
        const BASE_URL = "http://192.168.100.5:3000/user/deleteUser/"+this.state.id;

        const rawResponse = await fetch (`${BASE_URL}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'situacao': this.state.situacao
            })
        });

        var content = await rawResponse.json();

        if (content.status != 200) {
            alert("Erro ao alterar situação. Tente novamente!")
        } else {
            if (this.state.situacao == 1) {
                this.setState({situacao: '0', situacaoext: 'Desativado'})
            } else {
                this.setState({situacao: '1', situacaoext: 'Ativo'})
            }
            alert(content.message)
        }
    }

    render(){
        return(
            <View style={styles.main}>
                <View style={styles.cabecalho}>
                    <Text style={styles.textoLogo}>Editar Usuário</Text>
                    <Text style={{marginLeft: 15, fontSize:15}}>Situação: {this.state.situacaoext}</Text>
                    <Image style={styles.logoSuperior} source={unipSuperior} />
                </View>
                <View style={styles.infoLogin}>
                    <Input placeholder=" Digite o Nome Completo" value={this.state.nomeCompleto} onChangeText={text => this.setState({nomeCompleto: text})}/>
                    <Input placeholder=" Digite a Funcional" value={this.state.funcional} onChangeText={text => this.setState({funcional: text})}/>
                    <Input placeholder=" Digite o CPF" value={this.state.cpf} onChangeText={text => this.setState({cpf: text})}/>
                    <Input placeholder=" Digite a Senha" onChangeText={text => this.setState({senha: text})}/>
                    <Input placeholder=" Repetir a Senha" onChangeText={text => this.setState({senha_confirma: text})} />
                    <View style={styles.pickerComponente} >
                        <Picker
                            style={{color:'#A9A9A9'}}
                            selectedValue={this.state.nivel_acesso}
                            onValueChange={
                                (itemValor, itemIndex) =>
                                this.setState({
                                    nivel_acesso: itemValor
                                })
                            }
                        >
                            <Picker.Item label="Escolha o Nivel de Acesso: " value="Selecionar" />
                            <Picker.Item label="Administrador" value="1" />
                            <Picker.Item label="Atendente" value="2" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.rodape}>
                    <TouchableOpacity onPress={this.sendRegister} style={styles.touchableButton}> 
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.changeSituation} style={styles.touchableButton}> 
                        <View style={styles.button}>
                            <Entypo name="block" size={24} color="black" />
                            <Text style={styles.buttonText}>Alterar Situação</Text>
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