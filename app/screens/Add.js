import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator,TouchableHighlight } from 'react-native'
import React, { useId, useState } from 'react'
import { useLayoutEffect } from 'react'
import { Button, Divider } from '@rneui/themed'
import uuid from 'react-native-uuid';

import { useEffect } from 'react';
import { Images } from '../../utils/Images';
import { useDispatch, useSelector } from 'react-redux';
import { postImage, setUserPost } from '../slice/postSlice';
import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebase';


const Add = ({ navigation, file, setPicked, picked }) => {
  const currentUser = useSelector(state => state.authUser.currentUser)
  const [loader, setLoader] = useState(false)
  const userPosts = useSelector(state => state.feed.userPosts)
  const [caption,setCaption] = useState('')

  const dispatch = useDispatch()


  const id = uuid.v4()

  useEffect(() => {

    if (file?.canceled) setPicked(false)

  }, [])

  // handleposting


  const submitPost = async () => {
    if(!picked) return  
    const { accId, email } = currentUser
    const postRef = ref(storage, `posts/${accId}/${id}`)


    setLoader(true)
    //  create image blob file
    try {

      const res = await fetch(file?.assets[0]?.uri)

      const blob = await res.blob()


      // upload to storage
      uploadBytes(postRef, blob).then((snapshot) => {


        getDownloadURL(postRef).then(postURL => {


          if (picked) {

            // update Doc setting

            updateDoc(doc(db, "users", email), {
              posts: [...userPosts, {
                id: id,
                accId,
                image: postURL,
                caption,
                comments: [],
                timeStamp: new Date().getTime(),
                postLikedBy: []
              }],
            });



            // add doc into posts

            setDoc(doc(db, "posts", id), {
              userID: currentUser?.email,
              id: id,
              accId,
              image: postURL,
              caption,
              comments: [],
              timeStamp: new Date().getTime(),
              postLikedBy: []
            })

            setPicked(false)
            setLoader(false)
            setCaption('')
            navigation.navigate('Home')
          }

        }).catch(err => {
          setLoader(false)
          console.log(err);
          alert('Upload failed ')

        })
      })
    }
    catch (err) {
      console.log(err);
      setLoader(false)
      alert('Upload failed')

    }

    // upload the image

    // set download url in prfileURL


  }


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => {
        return (
          <View>
            <Text style={{ fontSize: 20 }}>New Post</Text>

          </View>
        )
      },
      headerLeft: () => <TouchableHighlight onPress={() =>{
       
        navigation.goBack();
       setPicked(false)
      }
      } 
      activeOpacity={0.6} underlayColor="lightgray" style={{marginLeft:10,justifyContent:'center',alignItems:'center',padding:7}}>
        <Image source={Images.arrow} style={{width:26,height:26}}/>
      </TouchableHighlight>,
      headerRight: () =>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

      
                       {

              !loader ? 
              <TouchableHighlight onPress={() =>{
        
                  if(!picked) return
                
                    submitPost()
                    
                  
                }
                }
                 activeOpacity={0.6} underlayColor="lightgray" style={{marginRight:10,justifyContent:'center',alignItems:'center',padding:7}}>
                <Image source={Images.arrow} style={{width:26,height:26,tintColor:"#458eff",transform:[{rotate:"-180deg"}]}}/>
              </TouchableHighlight>
                : <ActivityIndicator color={"#0a95ff"} style={{marginRight:10}}/>
            }
         
        </View>
    })


  })

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row',paddingLeft:10 }}>

        <Image
          source={{ uri: picked && file?.assets[0]?.uri || Images.user }}
          alt='image'
          style={{ width: 70, height: 70, marginLeft: 10, shadowColor: 'black' }}
        />

        <TextInput
          placeholder='Write a caption...'
          style={{ marginLeft: 10, height: 'auto', width: '60%' }}
          multiline
          
          onChangeText={text => setCaption(text)}
        />
      </View>
      <Divider style={{marginTop:15}}/>


    </View>
  )
}

export default Add