import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TextInput, KeyboardAvoidingView } from 'react-native'

import { Button, Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'

import { userRegister } from '../redux/actions/user'
import { connect } from 'react-redux'

export class RegisterScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      pic: `https://www.pngrepo.com/png/228121/170/reunion-interview.png`
    }
  }

  handleInput (){
    name = this.state.name
    email = this.state.email
    phone = this.state.phone
    if( name=="" || email=="" || phone=="" ){
        alert('Inputan tidak boleh kosong')
    }else {
        this.setState({
          name:"",
          phone:"",
          phone:""
        })
       const register =  this.props.userRegister({name: name, email: email, phone: phone})
        if(register)
        this.props.navigation.navigate('Main')
    }
}

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} ref="scroll" >
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.container}>
            <Image style={styles.logo} source={{uri: this.state.pic}} />
            <Text style={styles.quotes}>INTERVIEW APP</Text>
            <TextInput style={styles.input} placeholder="Fullname" onChangeText={(text) => this.setState({name: text})} value={this.state.name} />
            <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => this.setState({email: text})} value={this.state.email} />
            <TextInput style={styles.input} placeholder="Phone" onChangeText={(text) => this.setState({phone: text})} value={this.state.phone} />
            <View>
              <Button buttonStyle={styles.loginButton} title="Masuk" onPress={() => this.handleInput()} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20
  },
  logo: {
    width: 74,
    height: 74,
    marginTop: 64
  },
  quotes: {
    width: 208,
    height: 40,
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 25,
    letterSpacing: 0,
    textAlign: "center",
    color: "#707070",
    margin: 30
  },
  input: {
    width: 280,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#2caf4a",
    marginBottom: 16
  },
  loginButton: {
    width: 303,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#2caf4a",
    marginTop: 8
  },
})

const mapDispatchToProps = (dispatch) => {
  return {
    userRegister: (name, email, phone) => dispatch(userRegister(name, email, phone))
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)