import React, {Component} from 'react'
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, Image, FlatList, Button, Alert} from 'react-native'
import Input from '../components/Input'
import unipSuperior from '../../assets/unipSuperior.png'
import commonStyles from '../commonStyles'
import {cpfMask} from '../components/mask'
import { Entypo } from '@expo/vector-icons'; 
import { Camera } from 'expo-camera';
let {width} = Dimensions.get('window')

let numberGrid = 2
let widthGrid = width / numberGrid

export default class EditarAcesso extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.navigation.state.params.id,
            nomeCompleto: '',
            ra: '',
            cpf: '',
            situacao: '',
            situacaoext: '',
            fotos: [],
            localFotos: [],
            nivelAcesso: null
        }
    }

    componentDidMount(){
        if (this.props.navigation.state.params.nomeCompleto == undefined) {
            this.getDados()
        } else {
            const params = this.props.navigation.state.params;
            this.setState({
                id: params.id,
                nomeCompleto: params.nomeCompleto,
                ra: params.ra,
                cpf: ''+params.cpf+'',
                fotos: params.fotos,
                situacao: params.situacao,
                situacaoext: params.situacaoext
            });
        }
    }

    goToImg = () =>{
        this.props.navigation.navigate('GetCamera', this.state);
    }

    getDados = async () => {
        const BASE_URL = "https://tcc-reconhecientounip.herokuapp.com/user/editAcesso/"+this.state.id;

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
                nomeCompleto: content[0].nomeCompleto,
                ra: content[0].ra,
                cpf: ''+content[0].cpf+'',
                fotos: content[0].fotos,
                situacao: content[0].situacao,
                situacaoext: _situacaoext
            });
        }
    }

    sendRegister = async () => {
        const BASE_URL = "http://192.168.100.5:3000/user/editAcesso/"+this.state.id;

        const rawResponse = await fetch (`${BASE_URL}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'ra' : this.state.ra,
                'nome': this.state.nomeCompleto,
                'cpf': this.state.cpf,
                'fotos': this.state.fotos,
                'situacao': this.state.situacao
            })
        });
        var content = await rawResponse.json();

        if (content.status != 200) {
            alert("Erro ao alterar usuário. Tente novamente!")
        } else {
            alert(content.message)
        }
    }

    alertImage = (item) => e => {
        Alert.alert(
            "Remover",
            "Deseja remover essa imagem?",
            [
                {
                    text: "Sim",
                    onPress: () => this.removeImage(item)
                },
                {
                    text: "Não",
                    onPress: () => console.log("Não")
                }
            ],
            { cancelable: false }
        );
    }

    removeImage = (image) =>{
        this.state.fotos.pop(image)
        const teste = this.state.fotos
        this.setState({fotos: teste})
    }

    changeSituation = async () => {
        const BASE_URL = "http://192.168.100.5:3000/user/deleteAcesso/"+this.state.id;

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

    renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={this.alertImage(item)} key={(_, index) => index} >
                <Image source={{uri: 'data:image/jpeg;base64,'+ item}} style={styles.itemImage}/>
            </TouchableOpacity>
        )
    }
    
    render(){
        const { fotos } = this.state

        return(
            <View style={styles.main}>
                <View style={styles.cabecalho}>
                        <Text style={styles.textoLogo}>Editar Acesso</Text>
                        <Text style={{marginLeft: 15, fontSize:15}}>Situação: {this.state.situacaoext}</Text>
                        <Image style={styles.logoSuperior} source={unipSuperior} />
                </View>
                <View style={styles.infoLogin}>
                    <Input placeholder="Digite o Nome Completo" value={this.state.nomeCompleto} onChangeText={text => this.setState({nomeCompleto: text})}/>
                    <Input placeholder="Digite o CPF" value={this.state.cpf} onChangeText={text => this.setState({cpf: text})}/>
                    <Input placeholder="RA / Funcional" value={this.state.ra} onChangeText={text => this.setState({ra: text})}/>
                    <TouchableOpacity onPress={this.changeSituation} style={styles.touchableButton}> 
                        <View style={styles.button}>
                            <Entypo name="block" size={24} color="black" />
                            <Text style={styles.buttonText}>Alterar Situação</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.goToImg} style={styles.touchableButton}> 
                        <View style={styles.button}>
                        <Entypo name="camera" size={24} color="black" />
                            <Text style={styles.buttonText}>Capturar Imagens</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textoLogo}>Imagens</Text>
                <View style={styles.conteudoImagens}>
                    <FlatList  
                        keyExtractor={(_, index) => index} 
                        numColumns={numberGrid} data={fotos} 
                        renderItem={this.renderItem} style={{
                            backgroundColor: 'white',
                        }}/>
                </View>
                <View style={styles.rodape}>
                    <TouchableOpacity onPress={this.sendRegister} style={styles.touchableButton}> 
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Editar Acesso</Text>
                        </View>
                    </TouchableOpacity>
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
    conteudoImagens:{
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
    },
    itemImage:{
        width: widthGrid,
        height: 124,
        justifyContent: 'center'
    }
})