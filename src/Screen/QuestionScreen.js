import React, { Component } from 'react'
import { Text, View, Platform, TextInput, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { sendAnswer } from '../redux/actions/answer'
import { ListItem, CheckBox, Input, Button } from 'react-native-elements'
import CountDown from 'react-native-countdown-component'

class QuestionScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      radioButton: false,
      checkBox: false,
      selectedItems: [],
      input: '',
      current: 1,
      questionId: null,
      answer: ''
    }
  }

  radio(item, id) {
    this.setState({
      radioButton: item,
      questionId: id,
      answer: item
    })
  }

  checkBox(item, id) {
    let temp = this.state.selectedItems
    if (temp.includes(item)) {
      temp.splice(temp.indexOf(item), 1)
    } else {
      temp.push(item)
    }
    this.setState({
      selectedItems: temp,
      questionId: id
    })
  }

  sendData() {
    this.setState({ input: '' })
  }

  takeVideo() {
      this.props.navigation.navigate('Video')
  }

  finished(){
    this.props.navigation.navigate('End')
  }

  sumbitAnswer(user, type) {
    this.setState({ current: this.state.current + 1 })
    const questionId = this.state.questionId
    const userId = user
    const answer = this.state.answer
    const input = this.state.input


    if (questionId === questionId) {
      this.props.sendAnswer({ question_id: questionId, user_id: userId, answer: answer, attachment: null })
    } else if (questionId === questionId)
      if (type === 'text') this.props.sendAnswer({ question_id: questionId, user_id: userId, answer: answer, attachment: null })
  }

  submitMultiSelect(user) {
    this.setState({ current: this.state.current + 1 })
    const questionId = this.state.questionId
    const userId = user
    const selectedItems = this.state.selectedItems.toString()

    if (questionId === questionId) {
      this.props.sendSelect({ question_id: questionId, user_id: userId, answer: selectedItems, attachment: null })
    }
  }

  splitOptions(res, type, id, timer) {
    const user = this.props.user
    console.log(user)
    if (res) {
      let arr = res.split(',')
      switch (type) {
        case 'multiple choice':
          return (
            <View>
              <CountDown
                until={timer * 30}
                size={15}
                onFinish={() => this.setState({current: this.state.current + 1})}
                digitStyle={{ backgroundColor: '#FFF' }}
                digitTxtStyle={{ color: '#1CC625' }}
                timeToShow={['M', 'S']}
                timeLabels={{ m: '', s: '' }}
              />
              <FlatList
                data={arr}
                renderItem={({ item }) => (
                  <CheckBox
                    title={item}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.state.radioButton === item}
                    onPress={() => this.radio(item, id)}
                  />
                )}
              />
              <Button title="Next"
                buttonStyle={styles.loginButton}
                onPress={() => this.sumbitAnswer(user)} />
            </View>
          )
        case 'multi select':
          return (
            <View>
              <CountDown
                until={ 30 }
                size={15}
                onFinish={() => this.setState({current: this.state.current + 1})}
                digitStyle={{ backgroundColor: '#FFF' }}
                digitTxtStyle={{ color: '#1CC625' }}
                timeToShow={['M', 'S']}
                timeLabels={{ m: '', s: '' }}
              />
              <FlatList
                data={arr}
                renderItem={({ item }) => (
                  <CheckBox
                    title={item}
                    checkedIcon='check'
                    checkedColor='blue'
                    checked={this.state.selectedItems.includes(item) ? true : false}
                    onPress={() => this.checkBox(item, id)}
                  />
                )}
              />
              <Button title="Next"
                buttonStyle={styles.loginButton}
                onPress={() => this.submitMultiSelect(user)} />
            </View>
          )
        case 'text':
          return (
            <View style={{ flex: 1 }}>
              <CountDown
                until={ 10 * timer -10}
                size={15}
                onFinish={() => this.setState({current: this.state.current + 1})}
                digitStyle={{ backgroundColor: '#FFF' }}
                digitTxtStyle={{ color: '#1CC625' }}
                timeToShow={['M', 'S']}
                timeLabels={{ m: '', s: '' }}
              />
              <TextInput style={{borderRadius: 10, borderColor: 'gray', borderWidth: 1, margin: 20, height: 100}} multiline={true} onChangeText={(text) => this.setState({ answer: text, questionId: id })} />
              <Button title="Next"
                buttonStyle={styles.loginButton}
                onPress={() => this.sumbitAnswer(user, type)} />
            </View>
          )
        case 'video recorder':
          return (
            <View style={{marginVertical: 30}}>
              <Button buttonStyle={styles.loginButton} title="Take your video" onPress={() => this.takeVideo()} />
            </View>
            
          )
        default:
          return null
      }
    }
  }


  render() {
    const question = this.props.data.data
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', margin: 20, marginVertical: 40 }}>
        <FlatList
          data={question}
          renderItem={({ item }) => {
            if (item.number === this.state.current)
              return (
                (
                  <ListItem
                    title={`${item.description}`}
                    subtitle={this.splitOptions(item.options, item.type, item.timer, item.id)}
                  />
                )
              )
          }}
          keyExtractor={(item => item.id.toString())}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    loginButton: {
        width: 100,
        alignSelf: 'flex-end',
        height: 50,
        borderRadius: 5,
        backgroundColor: "#2caf4a",
        marginTop: 8
    },
})

const mapDispatchToProps = (dispatch) => {
  return {
    sendAnswer: (question_id, user_id, answer, attachment) => dispatch(sendAnswer(question_id, user_id, answer, attachment)),
    sendSelect: (question_id, user_id, answer, attachment) => dispatch(sendAnswer(question_id, user_id, answer, attachment))
  }
}

const mapStateToProps = (state) => ({
  data: state.questionReducer.data,
  user: state.userReducer.user.id
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScreen)