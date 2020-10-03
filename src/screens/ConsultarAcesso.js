import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image,FlatList} from 'react-native'
import { Entypo } from '@expo/vector-icons'; 


export default class ConsultarAcesso extends Component{


    constructor (props) {
        super(props);
        this.state = {
            data: []
        }
    }

    loadUsers = () => {

        fetch("end..http") //alterar para  a url get (list )  da api
            .then( res => res.json())
            .then(res => {
                this.setState ({
                    data: res.results || [] //results de acordo com o nome do campo que traz na api no caso no JSON (alterar)
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
                                    <Entypo name="edit" size={24} color="black" style={style.icone} />
                                            <View style ={style.info}>
                                                <Text style={style.codigo}>{item.codigo}</Text>
                                                 <Text style={styles.name}>{item.name} {item.name.first} {item.name.last}</Text>
                                            </View>
                            </View>
                        )}
                        keyExtractor={ item => item.codigo}
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

