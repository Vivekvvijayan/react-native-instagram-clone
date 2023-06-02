import { View, Text,ImageBackground,ScrollView } from 'react-native'
import ReelItem from '../components/ReelItem'
import { useLayoutEffect } from 'react'


const Reels = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTintColor:'white',
      
    })
  })
  return (
    <View style={{flex:1}}>

    <ScrollView

    contentContainerStyle={{
      flexGrow:1,
      
    }} >

   <ReelItem />
   <ReelItem />
   <ReelItem />
  
    </ScrollView>
      </View>
  )
}

export default Reels