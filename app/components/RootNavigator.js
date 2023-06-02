import { createStackNavigator } from "@react-navigation/stack";

import BottomTab from "./BottomTab";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ProfileUpdate from "../screens/ProfileUpdate";
import Comment from "../screens/Comment";
import Chat from "../screens/Chat";
import ChatMessage from "../screens/ChatMessage";
import OtherAccount from "../screens/OtherAccount";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { memo, useEffect } from "react";
import { setLoader, setToken, setUser } from "../slice/userSlice";
import { doc } from "firebase/firestore";
import Userid from "../screens/Userid";
import Welcome from "../screens/Welcome";
import { Image, Text, View } from "react-native";
import { Images } from "../../utils/Images";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Stack = createStackNavigator()

const RootNavigator = () => {
    const dispatch = useDispatch()
    const TOKEN = useSelector(state => state.authUser.TOKEN)
    const loader = useSelector(state => state.authUser.loader)



    const fetchToken = async () => {
       
            dispatch(setLoader(true))
            const token = await AsyncStorage.getItem('accessToken');
           
            dispatch(setToken(token))
            dispatch(setLoader(false))
        
    }
   

    useEffect(() => {
        
        fetchToken()

    }, [TOKEN])





    if (loader) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={Images.insta}
                    style={{ width: 70, height: 70 }}
                />
            </View>
        )
    }


    return (

        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureVelocityImpact:0,
           
        }}>

            {
                TOKEN === undefined || TOKEN === null ? (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} options={{
                            presentation: 'modal'
                        }} />
                        <Stack.Screen name="Welcome" component={Welcome} />
                        <Stack.Screen name="Userid" component={Userid} options={{
                            presentation: 'modal'
                        }} />
                    </>
                ) :
                    (
                        <>

                            <Stack.Screen name="BottomTab" component={BottomTab} />
                            <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} options={{
                                presentation: 'transparentModal',
                                cardOverlayEnabled: true,

                            }} />
                            <Stack.Screen name="Comments" component={Comment} options={{
                                presentation: "modal"

                            }} />
                            <Stack.Screen name="Chat" component={Chat} options={{

                                cardStyleInterpolator: ({ current, layouts }) => {
                                    return {
                                        cardStyle: {
                                            transform: [
                                                {
                                                    translateX: current.progress.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [layouts.screen.width, 0],
                                                    }),
                                                },
                                            ],
                                        },
                                    };
                                },

                            }} />
                            <Stack.Screen name="ChatMessage" component={ChatMessage} options={{

                                cardStyleInterpolator: ({ current, layouts }) => {
                                    return {
                                        cardStyle: {
                                            transform: [
                                                {
                                                    translateX: current.progress.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [layouts.screen.width, 0],
                                                    }),
                                                },
                                            ],
                                        },
                                    };
                                },

                            }} />
                            <Stack.Screen name="OtherAccount" component={OtherAccount} options={{

                                cardStyleInterpolator: ({ current, layouts }) => {
                                    return {
                                        cardStyle: {
                                            transform: [
                                                {
                                                    translateX: current.progress.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [layouts.screen.width, 0],
                                                    }),
                                                },
                                            ],
                                        },
                                    };
                                },

                            }} />
                        </>
                    )
            }

        </Stack.Navigator>
    )
}
export default memo(RootNavigator)