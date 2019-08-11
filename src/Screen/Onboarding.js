import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

import Onboarding from 'react-native-onboarding-swiper'

export default class index extends Component {

    state ={
        image1: `https://image.freepik.com/free-vector/reporter-with-microphone-interviews-man_107173-7438.jpg`,
        image2: `https://image.freepik.com/free-vector/successful-business-meeting-job-interview_3446-684.jpg`,
        image3: `https://image.freepik.com/free-vector/hands-with-cv-resume-clip-art_24911-44994.jpg`,
    }

    render() {
        return (
            <View style={styles.container}>
                <Onboarding pages={[
                    {
                        backgroundColor: '#fff',
                        image: <Image style={styles.images} source={{uri: this.state.image1}} />,
                        title: 'Onboarding',
                        subtitle: 'Just make a simple test to story board And make this screen be nice!',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image style={styles.images} source={{uri: this.state.image2}} />,
                        title: 'Onboarding',
                        subtitle: 'Just make a simple test to story board And make this screen be nice!',
                    },
                    {
                        backgroundColor: '#fff',
                        image: <Image style={{width: 327, height: 327, bottom: 88}} source={{uri: this.state.image3}} />,
                        title: 'Onboarding',
                        subtitle: 'Just make a simple test to story board And make this screen be nice!',
                    }]} onDone={() => this.props.navigation.navigate('Register')}
                    titleStyles={styles.title} subTitleStyles={styles.subtitle}
                    imageContainerStyles={{paddingBottom: 0, width: 366, height: 243}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        width: 100,
        height: 50,
        fontFamily: "Poppins",
        fontSize: 18,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 27,
        letterSpacing: 0,
        textAlign: "center",
        color: "#707070"
    },
    subtitle: {
        width: 226,
        height: 35,
        fontFamily: "Poppins",
        fontSize: 12,
        fontWeight: "300",
        fontStyle: "normal",
        lineHeight: 18,
        letterSpacing: 0,
        textAlign: "center",
        color: "#707070"
    },
    images: {
        width: 366,
        height: 243,
        bottom: 56
    }
})


