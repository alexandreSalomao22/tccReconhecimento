import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import commonStyles from '../commonStyles'
import Logo from '../../assets/banner.png'
import Input from '../components/Input'
import Auth from '../models/Auth'


export default class Login extends Component{

    state = {
        email: Auth.email,
        password: Auth.password
    }

    login = () =>{
        console.log(this.state.email)
        console.log(this.state.password)
        this.props.navigation.navigate('Home');
    }

    render(){
        return(
            <View style={styles.container}>
               <View style={styles.containerLogo}>
                    <Image style={styles.logo} source={Logo} />
                </View>
                <View style={styles.containerForm}>
                    <View style={styles.form}>
                        <Input placeholder="Digite seu E-mail" value={this.state.email} onChangeText={email => this.setState({email: email})} />
                        <Input secureTextEntry={true} placeholder="Digite sua Senha" value={this.state.password} onChangeText={password => this.setState({password: password})} />
                        <TouchableOpacity onPress={this.login} style={styles.touchableButton}> 
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Entrar</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                                <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                                <Text style={styles.textSignup}>Não possui conta? Cadastre-se!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.containerSignup}>
                        
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: commonStyles.colors.background
    },
    containerLogo:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo:{
        height: 260,
        width: 260,
        resizeMode: 'contain',
        marginTop: Platform.OS === 'ios' ? 50 : 0
    },
    containerForm:{
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form:{
        backgroundColor: commonStyles.colors.background,
        width: '88%',
        height: '88%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerSignup:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
    },
    forgotPassword:{
        marginTop: 30,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.primary,
        fontSize: 20
    },
    textSignup:{
        marginTop: 30,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 21
    }
})