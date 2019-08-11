import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import Onboarding from './Screen/Onboarding'
import RegisterScreen from './Screen/RegisterScreen'
import MainScreen from './Screen/MainScreen'
import QuestionScreen from './Screen/QuestionScreen'
import FinishScreen from './Screen/FinishScreen'
import VideoScreen from './Screen/VideoScreen'

const Main = createSwitchNavigator({
    Auth: Onboarding,
    Register: RegisterScreen,
    Main: MainScreen,
    Quest: QuestionScreen,
    End: FinishScreen,
    Video: VideoScreen
},{
    initialRouteName: 'Auth'
})

export default Root = createAppContainer(Main)