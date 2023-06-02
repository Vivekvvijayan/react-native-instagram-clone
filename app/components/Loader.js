import { View, Text, ActivityIndicator } from 'react-native'


const Loader = () => {
  return (
    <View style={{width:'100%',flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator color={"red"} size={"small"}/>
    </View>
  )
}

export default Loader