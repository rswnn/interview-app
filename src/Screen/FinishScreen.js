import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { getQuestion } from '../redux/actions/question'
import { Button } from 'react-native-elements'


export class MainScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            loading: true,
            pic: `https://cdn-images-1.medium.com/max/1200/1*7ugSMISUo8vYf9ILG6VmuQ.png`
        }
    }

    componentDidMount(){
        this.props.getQuestion()
        setTimeout(() => {
            this.setState({ loading: false})
        }, 1500)
    }

    handleInput() {
        this.props.navigation.navigate('Quest')
    }

    render() {
        if (this.state.loading === true){
            return (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator animating={this.state.loading} size="large" color="gray" />
                    </View>
            )
        } else {
            return(
                <View style={[styles.container, styles.centered]}>
                    <Image style={styles.logo} source={{uri: this.state.pic}}/>
                    <Text style={styles.quotes}>Terima Kasih</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    centered: {
        alignItems: 'center'
    },
    logo: {
        width: 250,
        height: 100
    },
    quotes: {
        width: 320,
        height: 80,
        fontFamily: "Poppins",
        fontSize: 20,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#707070",
        margin: 10
      },
      large: {
        width: 320,
        height: 30,
        fontFamily: "Poppins",
        fontSize: 20,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#707070",
      },
    multiLine: {
        width: 300,
        height: 280,
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        borderColor: 'gray'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    },
    loginButton: {
        width: 303,
        height: 40,
        borderRadius: 5,
        backgroundColor: "#2caf4a",
        marginTop: 8
      }
  })

  const mapDispatchToProps = (dispatch) => {
    return {
      getQuestion: () => dispatch(getQuestion())
    }
  }
  
  const mapStateToProps = (state) => ({
    data: state.questionReducer.data,
    user: state.userReducer.user
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)