import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import StoryItems from './StoryItems'
import AdminStoryCirlce from './AdminStoryCirlce'
import InstaStory from 'react-native-insta-story'
import { data } from '../../utils/Storyss'

const StoryItem = () => {
    return (
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{
            height: '100%',
            padding: 10,
            marginLeft: 4,
            marginTop: 5,
            alignItems: 'center',
            paddingRight: 10,

        }} horizontal>
          

            <AdminStoryCirlce />
       
            <InstaStory
                data={data}
                duration={10}
                
                
                />
                

   </ScrollView> 
    )
}

export default StoryItem

const styles = StyleSheet.create({})