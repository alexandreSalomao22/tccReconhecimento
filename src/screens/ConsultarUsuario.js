import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image, FlatList} from 'react-native'
import { Entypo } from '@expo/vector-icons'; 


export default class ConsultarUsuario extends Component{

    constructor (props) {
        super(props);
        this.state = {
            data: [ ]
        }
    }

    goToListUsuario = () =>{
        this.props.navigation.navigate('EditarUsuario');
    }

    loadUsers = () => {
        fetch("http://192.168.0.9:3000/user/listaUsers") 
            .then( res => res.json())
            .then(res => {
                this.setState ({
                    data: res || [ ] 
                })
            })
    }

    componentDidMount() {
        this.loadUsers();
    }


    render(){
        return(
            <View style={styles.mainView}>
                <Text style={styles.titleTxt}>Lista de Usuários</Text>
                <View style={styles.container}>
                    <FlatList
                            style={styles.flatList}
                            data={this.state.data}
                            renderItem={({item}) => (
                                <View style={styles.line}>
                                        <Entypo name="edit" size={20} color="black" style={styles.icone} />
                                                <View style ={styles.info}>
                                                    <Text style={styles.codigo}>{item.funcional}</Text>
                                                    <Text style={styles.name}>{item.nome}</Text>
                                                </View>
                                </View>
                            )}
                            keyExtractor={ item => item.funcional}
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    titleTxt:{
        fontSize: 20,
        marginTop: 30
    },

    mainView:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatList:{
        marginLeft: 0,
        paddingLeft: 0
    },  
    container: {
        marginTop: 30,
        backgroundColor: "#FFF",
        borderTopWidth:0,
        borderBottomWidth:0,
        width: '95%',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    line: {
        height: 50,
        flexDirection: "row",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    icone: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 10,
        alignSelf: "center",
        padding: 10
    },
    info: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    name: {
        fontSize: 14,
        fontWeight: "bold"
    }
})



