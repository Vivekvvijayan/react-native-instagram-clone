import { View, Text, Image } from 'react-native'
import React from 'react'
import { Images } from '../../utils/Images'

const UserCircle = ({ url }) => {
  return (
    <View style={{width:35,height:35,borderRadius:50,marginRight:10}}>
      <Image 
      source={{uri:url || Images.user}}
      style={{width:'100%',height:'100%',borderRadius:50}}
      />
    </View>
  )
}

export default UserCircle