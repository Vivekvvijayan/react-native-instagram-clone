import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image } from 'react-native'
import Home from '../screens/Home'
import Search from '../screens/Search'
import Account from '../screens/Account'
import Reels from '../screens/Reels'
import Add from '../screens/Add'
import { Images } from '../../utils/Images'
import { Icons } from '../../utils/Size'
const Bottomtab = createBottomTabNavigator()


import * as ImagePicker from 'expo-image-picker';

import {  useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setToken, setUser } from '../slice/userSlice'

const BottomTab = ({navigation}) => {
    const [picked, setPicked] = useState(false)
    const [file, setFile] = useState([])
    const dispatch = useDispatch()
    const currentUser  = useSelector(state => state.authUser.currentUser)
  

    
    const pickDocument = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
           aspect:[4,5],
            quality: 1,
            selectionLimit:1,
           
        })
        
        if (!result.canceled) {
            
            setFile(result)
            setPicked(true)  
        }else{
            
            navigation.goBack()
        }
        
    }

    return (
        <Bottomtab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarIcon:{
                    width:'18%'
                },
                tabBarHideOnKeyboard:true,
                tabBarStyle:{
                    elevation:0,
                   height:50
                    
                 
                },
              
           
            })}
            
        >
            <Bottomtab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ focused }) => <Image source={focused ? Images.homeFill : Images.homeOutline} style={{ width: Icons.tabSize + 2, height: Icons.tabSize }} />,
                
              
                
          }} />
            <Bottomtab.Screen name="Search" component={Search}
                options={{
                    tabBarIcon: ({ focused }) => <Image source={focused ? Images.searchFill : Images.search} style={{ width: Icons.tabSize, height: Icons.tabSize }} />
                }}
            />
            <Bottomtab.Screen name="Add" children={(props) => <Add {...props} file={file} picked={picked} setPicked={setPicked} />}
                listeners={{ tabPress: () => !picked && pickDocument() }}
                options={{
                    tabBarIcon: () => <Image source={Images.plus} style={{ width: Icons.tabSize, height: Icons.tabSize }} />


                }}

            />
            <Bottomtab.Screen name="Reels" component={Reels}
                options={{
                    tabBarIcon: ({ focused }) => <Image source={focused ? Images.reelsFill : Images.reelsOutline} style={{ width: Icons.tabSize, height: Icons.tabSize }} />,
                   
                  
                
                }}
            />
            <Bottomtab.Screen name="Account" component={Account}
                options={{
                    tabBarIcon: ({ focused }) => <Image source={{ uri: currentUser?.profileURL }} style={{ width: Icons.tabSize, height: Icons.tabSize, borderWidth: focused ? 1 : 0, borderRadius: 50, borderColor: "#000" }} />,
                    
                }}
            />
          
        </Bottomtab.Navigator>
    )
}

export default BottomTab


