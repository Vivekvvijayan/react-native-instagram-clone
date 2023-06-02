import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import React from 'react'
import { Images } from '../../utils/Images'

const ReelItem = () => {
    return (



        <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80" }}
            style={{
                height: '100%',

            }}
        >


<View style={{position:'absolute',bottom:20,right:20,height:200,justifyContent:'space-around'}}>
    <View style={{alignItems:'center'}}>
        <Image 
        source={Images.heartFill}
        style={{width:25,height:25,tintColor:'red'}}
        />
        <Text style={{color:'white',fontSize:13,marginTop:5}}>26k</Text>
    </View>
    <View style={{alignItems:'center'}}>
        <Image 
        source={Images.comment}
        style={{width:25,height:25,tintColor:'white'}}
        />
        <Text style={{color:'white',fontSize:13,marginTop:5}}>26</Text>
    </View>
    <View style={{alignItems:'center'}}>
        <Image 
        source={Images.send}
        style={{width:25,height:25,tintColor:'white'}}
        />
        <Text style={{color:'white',fontSize:13,marginTop:5}}>2k</Text>
    </View>
 
</View>
        </ImageBackground>



    )
}

export default ReelItem

