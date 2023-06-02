import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, TouchableNativeFeedback, ScrollView, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Images } from '../../utils/Images'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth } from 'firebase/auth'
import { auth, db } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setCurrentUser, setToken, setUser } from '../slice/userSlice'
import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { setUserPost } from '../slice/postSlice'


const Account = ({ navigation }) => {

  const currentUser = useSelector(state => state.authUser.currentUser)
  const userPosts = useSelector(state => state.feed.userPosts)
  const token = useSelector(state => state.authUser.TOKEN)
  const dispatch = useDispatch()

  const [loader, setLoader] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{currentUser?.accId}</Text>,
      headerRight: () => {

        return (
          <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-around', width: '25%' }}>
            <TouchableNativeFeedback onPress={() => {

              getAuth().signOut(auth).then(() => {
                AsyncStorage.removeItem('accessToken').then(() => {
                  dispatch(setToken(null))
                  dispatch(setUser([]))
                  dispatch(setCurrentUser({}))
                  navigation.navigate('Login')

                })
              })

            }}>

              <Image
                source={Images.powerOff}
                style={{ width: 23, height: 23 }}
              />
            </TouchableNativeFeedback>
            <Image
              source={Images.dots}
              style={{ width: 23, height: 23 }}
            />
          </View>

        )
      }

    })

  }, [])

  useEffect(() => {

    setLoader(true)

    fetchData()

    setLoader(false)


  }, [userPosts.length])

  const fetchData = () => {

    const docRef = doc(db, "users", token);
    getDoc(docRef).then(doc => {

      dispatch(setCurrentUser(doc?.data()))



    }).catch(err => console.log(err))
  }



  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView contentContainerStyle={{
        backgroundColor: 'white',
        marginTop: 5,
     
       paddingBottom:10
     
      }}>
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>


          <TouchableOpacity style={{ width: 80, height: 80 }}>
            <Image
              source={{ uri: currentUser?.profileURL }}
              style={{ width: '100%', height: '100%', borderRadius: 50 }}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '60%' }}>

            <View style={{ alignItems: 'center' }}>
              <Text style={styles.topRightText}>{currentUser?.posts?.length}</Text>
              <Text>Posts</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.topRightText}>{currentUser?.followers?.length}</Text>
              <Text>Followers</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.topRightText}>{currentUser?.following?.length}</Text>
              <Text>Following</Text>
            </View>


          </View>
        </View>

        <View style={{ paddingLeft: 15, marginTop: 10 }}>
          <Text>{currentUser?.displayName}</Text>
          {/* <Text style={{color:'gray'}}>Singer</Text> */}
        </View>
        <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>

          <Pressable onPress={() => navigation.navigate('ProfileUpdate')} android_ripple={{ color: 'gray' }} style={{ width: '90%', height: 35, borderRadius: 10, backgroundColor: '#e3e9ed', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Edit profile</Text>
          </Pressable>
        </View>

{/* <View style={{width:'100%',justifyContent:'center',backgroundColor:'red'}}> */}



        <View style={{ width: '100%', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: 20, flexDirection: 'row', padding: 5, alignItems: 'center' }}>

          {
            !loader ? userPosts?.map(((userPostItem, i) => <PostImage key={i} {...userPostItem} />)) : (
              <View style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={"black"} size={"large"} />
              </View>
            )
          }


        </View>
        {/* </View> */}
      </ScrollView>
    </View>
  )
}

export default Account
const styles = StyleSheet.create({
  topRightText: {
    fontSize: 17
  }
})

const PostImage = ({ id, image, likes, timeStamp }) => {
  return (
    <View
      style={{

        width: "32.5%",
        height: 150,
        margin: 1.5,
    
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        resizeMode='cover'
        resizeMethod='resize'
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  )
}