import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar, Button } from '@rneui/themed';
import { Images } from '../../utils/Images';
const ProfileUpdate = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '90%', marginTop: 20, height: 300, backgroundColor: 'white', paddingVertical: 10, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 10, borderRadius: 10 }}>
                <Text style={{ fontSize: 17 }}>Edit profile</Text>

                <Avatar
                    size={68}
                    rounded
                    source={{ uri: Images.user }}
                    containerStyle={{ marginTop: 20 }}

                />

                <TextInput
                    placeholder='Username'
                    style={styles.textInput}
                    placeholderTextColor={"gray"}
                    
                />

                <Button
                    title={"Save"}
                    containerStyle={{
                        width: '100%',
                        marginTop: 10,

                    }}

                />
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', right: 10, top: 10, }}>

                    <Image source={{ uri: "https://icons-for-free.com/download-icon-close+icon-1320184117228553763_512.png" }}
                        style={{ width: 30, height: 30, tintColor: 'gray' }}
                        onMagicTap={() => navigation.goBack()}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProfileUpdate

const styles = StyleSheet.create({
    textInput: {
        width: "100%",
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginTop: 15,
        color: 'black',
        borderRadius: 5
    }
})