import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';


class VideoScreen extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            recording: false,
            processing: false
        }
    }

    finished() {
        this.props.navigation.navigate('End')
    }

    async startRecording() {
        this.setState({ recording: true });
        // default to mp4 for android as codec is not set
        const { uri, codec = "mp4" } = await this.camera.recordAsync();
        this.setState({ recording: false, processing: true });

        AsyncStorage.setItem('@video', uri).then( res => {
            alert('Success')
            Alert.alert(
                'Apakah anda sudah yakin?',
                'Ulangi Video?',
                [
                  {
                    text: 'Input',
                    onPress: () => this.finished(),
                    style: 'cancel',
                  },
                  {text: 'Cancel', onPress: () => console.log('kwkwkkw')},
                ],
                {cancelable: false},
              );
            this.setState({processing: false})
        })



    }
    
    stopRecording() {
        this.camera.stopRecording();
    }

    render() {
        const { recording, processing } = this.state;
    
        let button = (
          <TouchableOpacity
            onPress={this.startRecording.bind(this)}
            style={styles.capture}
          >
            <Text style={{ fontSize: 14 }}> RECORD </Text>
          </TouchableOpacity>
        );
    
        if (recording) {
          button = (
            <TouchableOpacity
              onPress={this.stopRecording.bind(this)}
              style={styles.capture}
            >
              <Text style={{ fontSize: 14 }}> STOP </Text>
            </TouchableOpacity>
          );
        }
    
        if (processing) {
          button = (
            <View style={styles.capture}>
              <ActivityIndicator animating size={18} />
            </View>
          );
        }
    
        return (
          <View style={styles.container}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.front}
              flashMode={RNCamera.Constants.FlashMode.off}
              permissionDialogTitle={"Permission to use camera"}
              permissionDialogMessage={
                "We need your permission to use your camera phone"
              }
            />
            <View
              style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
            >
              {button}
            </View>
          </View>
        );
      }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default VideoScreen