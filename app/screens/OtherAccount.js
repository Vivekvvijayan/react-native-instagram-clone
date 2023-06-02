import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, TouchableNativeFeedback } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Images } from '../../utils/Images'
import { Button } from '@rneui/themed'

const OtherAccount = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: true,
        headerTitle: () => <Text style={{ fontSize: 22, fontWeight: 'bold' }}>_vivek_</Text>,
        headerRight: () => {

            return (
                <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-around', width: '25%' }}>

                    <Image
                        source={Images.dots}
                        style={{ width: 23, height: 23 }}
                    />
                </View>

            )
        }


    })
  },[navigation])
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>


                <TouchableOpacity style={{ width: 80, height: 80 }}>
                    <Image
                        source={{ uri: Images.user }}
                        style={{ width: '100%', height: '100%', borderRadius: 50 }}
                    />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '60%' }}>

                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.topRightText}>19</Text>
                        <Text>Posts</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.topRightText}>650</Text>
                        <Text>Followers</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.topRightText}>100</Text>
                        <Text>Following</Text>
                    </View>


                </View>
            </View>

            <View style={{ paddingLeft: 15, marginTop: 10 }}>
                <Text>Vivek Aravikulathillam</Text>
                <Text style={{ color: 'gray' }}>Singer</Text>
            </View>
            <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                <View style={{ width: '80%', flexDirection: 'row' }}>

                    <Button
                        title={"Follow"}
                        containerStyle={{
                            width: '50%',
                            marginRight: 5,
                            borderRadius: 5
                        }}
                    />
                    <Button
                        title={"Message"}
                        color={"lightgray"}
                        titleStyle={{ color: 'black' }}
                        containerStyle={{
                            width: '50%',

                            marginLeft: 5,
                            borderRadius: 5
                        }}
                    />
                </View>

            </View>
        </View>
    )
}

export default OtherAccount
const styles = StyleSheet.create({
    topRightText: {
        fontSize: 17
    }
})