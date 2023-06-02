import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'


const StoryItems = () => {
  return (
    <View style={{justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity>
    <View style={styles.storyContainer}>

      <Image 
      source={{uri:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"}}
      resizeMode='center'
      style={styles.storyImage}
      />
   
    </View>
      </TouchableOpacity>
      </View>
  )
}

export default StoryItems

const styles = StyleSheet.create({
    storyContainer:{
        width:60,
        height:60,
        borderRadius:50,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor:'red',
        borderWidth:2,
        marginLeft:8
   
    },
    storyImage:{
      width:'90%',
      height:'90%',
      borderRadius:50
    }
})