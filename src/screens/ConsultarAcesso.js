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

    goToListAcesso = () =>{
        this.props.navigation.navigate('EditarAcesso');
    }

    loadUsers = () => {

        fetch("http://192.168.0.47:3000/user/listaUsers") 
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
            <View style={styles.container}>
                <FlatList
                        data={this.state.data}
                        renderItem={({item}) => (
                            <View style={styles.line}>
                                    <Entypo name="edit" size={24} color="black" style={styles.icone} />
                                            <View style ={styles.info}>
                                                <Text style={styles.codigo}>{item.ra}</Text>
                                                 <Text style={styles.name}>{item.nome}</Text>
                                            </View>
                            </View>
                        )}
                        keyExtractor={ item => item.ra}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({

    container: {
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: "#FFF",
        borderTopWidth:0,
        borderBottomWidth:0
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

