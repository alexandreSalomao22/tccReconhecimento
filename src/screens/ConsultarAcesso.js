import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image,FlatList} from 'react-native'
import { Entypo } from '@expo/vector-icons'; 


export default class ConsultarAcesso extends Component{
    constructor (props) {
        super(props);
        this.state = {
            data: [ ]
        }
    }

    goToListAcesso = (id) =>{
        this.props.navigation.navigate('EditarAcesso', {id: id});
    }

    loadUsers = () => {
        fetch("http://ec2-52-67-64-140.sa-east-1.compute.amazonaws.com:3000/user/getAcessos") 
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
                <Text style={styles.titleTxt}>Lista de Acessos</Text>
                <View style={styles.container}>
                    <FlatList
                            style={styles.flatList}
                            data={this.state.data}
                            renderItem={({item}) => (
                                <View style={styles.line}>
                                    <TouchableOpacity onPress={()=> this.goToListAcesso(item.id_usuario)}>
                                        <Entypo name="edit" size={24} color="black" style={styles.icone} />
                                    </TouchableOpacity>
                                                <View style ={styles.info}>
                                                    <Text style={styles.codigo}>{item.ra}</Text>
                                                    <Text style={styles.name}>{item.nome}</Text>
                                                </View>
                                </View>
                            )}
                            keyExtractor={ item => item.ra}
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
        width: '95%'
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
        alignSelf: "center"
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

