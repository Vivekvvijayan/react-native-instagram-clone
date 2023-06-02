import { StyleSheet, Text, View,Image } from 'react-native'
import { Images } from '../../utils/Images'


const AdminStoryCirlce = () => {
  return (
    <View style={styles.storyContainer}>
   <Image 
   source={{uri:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"}}
    style={styles.storyImage}

   />
   <Image 
   source={Images.plusStory}
   style={{
    position:'absolute',
    width:20,
    height:20,
    right:7,
    bottom:10,
    borderColor:'white',
    borderWidth:2,
    borderRadius:50
   }}
   />
<Text style={{paddingTop:10,fontSize:10}}>Your Story</Text>
    </View>
  )
}

export default AdminStoryCirlce

const styles = StyleSheet.create({
    storyImage:{
        width:'85%',
        height:'85%',
        borderRadius:50
      },
      storyContainer:{
        width:70,
        height:70,
        borderRadius:50,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        position:'relative'
        
   
    },
})