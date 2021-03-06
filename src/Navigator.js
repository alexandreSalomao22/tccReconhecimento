//IMPORTS DO REACT
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput} from 'react-native';
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack"
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

//IMPORTS TELAS
import Home from './screens/Home'
import Autenticar from './screens/Autenticar'
import NovoAcesso from './screens/NovoAcesso'
import ConsultarAcesso from './screens/ConsultarAcesso'
import NovoUsuario from './screens/NovoUsuario'
import ConsultarUsuario from './screens/ConsultarUsuario'
import Sair from './screens/Sair'

class Sidebar extends React.Component {
  state = {
      routes:[
          {
              name:"Home",
              icon:"home",
              text:"Home"
          },
          {
              name:"Autenticar",
              icon:"face-recognition",
              text:"Autenticar"
          },
          {
             name:"NovoAcesso",
              icon:"format-horizontal-align-center",
              text:"Cadastrar Novo Acesso"
         },
         {
              name:"ConsultarAcesso",
             icon:"cloud-search",
             text:"Consultar Acesso"
          },
         {
             name:"NovoUsuario",
              icon:"account-plus",
              text:"Cadastrar Novo Usuário"
          },
         {
             name:"ConsultarUsuario",
              icon:"account-search",
              text:"Consultar Usuário"
          },
          {
              name:"Sair",
              icon:"exit-to-app",
              text:"Sair"
          },
      ]
  }

  
  render(){
      return (
          <View style={styles.container}>
              <Image source={require("./assets/profile.jpg")} style={styles.profileImg}/>
              <Text style={{fontWeight:"bold",fontSize:16,marginTop:10}}>Reconhecimento Facial</Text>
              <Text style={{color:"gray",marginBottom:10}}>reconhecimento@unip.com.br</Text>
              <View style={styles.sidebarDivider}></View>
              <FlatList
                  style={{width:"100%",marginLeft:30}}
                  data={this.state.routes}
                  renderItem={({ item }) => <Item  item={item} navigate={this.props.navigation.navigate}/>}
                  keyExtractor={item => item.name}
              />
          </View>
      )
  }
}

const Drawer = createDrawerNavigator(
  {
    Home:{ screen: Home},
    Autenticar:{ screen: Autenticar},
    NovoAcesso:{ screen: NovoAcesso},
    ConsultarAcesso:{ screen: ConsultarAcesso},
    NovoUsuario:{ screen: NovoUsuario},
    ConsultarUsuario:{ screen: ConsultarUsuario},
    Sair:{ screen: Sair}

  },
  {
    initialRouteName: "Home",
    unmountInactiveRoutes: true,
    headerMode: "none",
    contentComponent: props => <Sidebar {...props} />
  }
)

const AppNavigator = createStackNavigator(
  {
    Drawer : {screen: Drawer},
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none",
    unmountInactiveRoutes: true
  }
)

const AppContainer = createAppContainer(AppNavigator);



export default class App extends React.Component {
  render(){

    return (
      <AppContainer />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop:40,
    alignItems:"center",
    flex:1

  },
  listItem:{
      height:60,
      alignItems:"center",
      flexDirection:"row",
  },
  title:{
      fontSize:18,
      marginLeft:20
  },
  header:{
    width:"100%",
    height:60,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20
  },
  profileImg:{
    width:80,
    height:80,
    borderRadius:40,
    marginTop:20
  },
  sidebarDivider:{
    height:1,
    width:"100%",
    backgroundColor:"lightgray",
    marginVertical:10
  }
});


