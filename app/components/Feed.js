import { StyleSheet, Text, View, Image, TextInput, TouchableWithoutFeedback, TouchableOpacity, Dimensions, StatusBar } from 'react-native'
import { Images } from '../../utils/Images'
// import { Image } from 'expo-image'
import uuid from 'react-native-uuid'
import { Icons } from '../../utils/Size'
import { TapGestureHandler } from 'react-native-gesture-handler';
import { memo, useEffect, useId, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { handleInteraction, postComment } from '../slice/postSlice';
import { collection, deleteDoc, doc, getDoc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import ContentLoader from 'react-content-loader';
import { BottomSheet } from '@rneui/themed';
let moment = require('moment');

const win = Dimensions.get('window');
const ratio = win.width / 541;
const Feed = ({ userID, id, image, timeStamp, comments, postLikedBy, caption }) => {

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [accId, setaccId] = useState('')
    const [dp, setDp] = useState(Images.user)
    const [sheetOpen, setSheetOpen] = useState(false)

    const currentUser = useSelector(state => state.authUser.currentUser) //future use for loading liked by and other logic for filter interaction
    const [loader, setLoader] = useState(false)


    const [userComment, setUserComment] = useState('')



    useEffect(() => {
        setLoader(true)
        getUserProfile()
        setLoader(false)



    }, [id])

    const getUserProfile = async () => {
        try {

            const docRef = doc(db, "users", userID);
            const PROFILE = await getDoc(docRef);

            setaccId(PROFILE.data().accId);

            setDp(PROFILE.data().profileURL);
        } catch (err) {
            alert('Error')
        }

    }

    const handleLike = () => {
        if (!postLikedBy.includes(currentUser.email)) {

            updateDoc(doc(db, "posts", id), {
                postLikedBy: [...postLikedBy, currentUser?.email]
            })


            const docRef = doc(db, "users", userID);
            getDoc(docRef).then(data => {
                const { posts } = data.data()
                data.data().posts.forEach((post, index) => {
                    if (post.id === id) {

                        posts[index].postLikedBy = [...posts[index].postLikedBy, currentUser.email]
                        updateDoc(doc(db, "users", userID), {
                            posts
                        });
                    }
                })

            }).catch(err => {
                alert(err)
            })

        }
    }
    const handleUnlike = () => {

        if (postLikedBy.includes(currentUser.email)) {



            updateDoc(doc(db, "posts", id), {
                postLikedBy: postLikedBy.filter((user) => user !== currentUser?.email)
            })



            const docRef = doc(db, "users", userID);
            getDoc(docRef).then(data => {
                const { posts } = data.data()
                data.data().posts.forEach((post, index) => {
                    if (post.id === id) {

                        posts[index].postLikedBy = posts[index].postLikedBy.filter((e) => e != currentUser?.email)

                        updateDoc(doc(db, "users", userID), {
                            posts
                        });
                    }
                })

            }).catch(err => console.log(err))
        }
    }

    // handle feed commenting
    const handleComment = async () => {

        const commentID = uuid.v4() //generating comment id
        try {

            if (userComment != "") {


                updateDoc(doc(db, "posts", id), {
                    comments: [...comments, {
                        commentID,
                        userID: currentUser?.email,
                        message: userComment,
                        commentLikesBy: [],
                        timeStamp: new Date().getTime()
                    }]
                })

                setUserComment("");
            }

        }
        catch (err) {
            alert(err)
        }
    };

    return (
        <View style={styles.feedContainer}>

            <View style={{
                height: 50,
                flexDirection: 'row',

                justifyContent: 'space-between',
                paddingHorizontal: 10,
                alignItems: 'center',
   

            }}>

                {
                    loader ? <MyLoader /> :
                        <View style={{ flexDirection: 'row', paddingLeft: 3, alignItems: 'center' }}>
                            <Image
                                source={{ uri: dp }}
                                style={{ width: 30, height: 30, borderRadius: 50, borderColor: 'black', borderWidth: 0.1 }}
                            />
                            <Text style={{ marginLeft: 7 }} onPress={() => navigation.navigate('OtherAccount')}>{accId}</Text>
                        </View>
                }

                <TouchableOpacity style={{padding:10,justifyContent:'center',alignItems:'center'}} onPress={() =>setSheetOpen(true)}>

                <Image
                    source={Images.dots}
                    style={{ width: Icons.iconsSize,height:25 }}
                    resizeMode='center'
                    />
                    </TouchableOpacity>
            </View>
            {/* post image */}
            <View style={styles.postImageContainer}>


                <TapGestureHandler numberOfTaps={2} onActivated={handleLike}>

                    <Image
                        source={{ uri: image }}

                        style={styles.postImage}
                        resizeMode='cover'
                    />
                </TapGestureHandler>


            </View>

            {/* reactions */}
            <BottomSheetsComponent postId={id} userId={userID} setSheetOpen={setSheetOpen} sheetOpen={sheetOpen} />

            <View style={{ flexDirection: 'row', height: 60, justifyContent: 'space-between', paddingHorizontal: 5, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', width: '30%', justifyContent: 'space-around', alignItems: 'center',marginLeft:5 }}>
                    <TouchableOpacity onPress={() => postLikedBy?.includes(currentUser.email) ? handleUnlike() : handleLike()}>

                        <Image
                            source={!postLikedBy?.includes(currentUser.email) ? Images.heartOutline : Images.heartFill}
                            style={{ width: Icons.iconsSize - 4, height: Icons.iconsSize - 4 }}
                            resizeMode='center'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Comments', { postId: id, isView: true })}>
                        <Image
                            source={Images.comment}
                            style={{ width: Icons.iconsSize - 2, height: Icons.iconsSize - 2, tintColor: '#252525' }}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <Image
                        source={Images.send}
                        style={{ width: Icons.iconsSize, height: Icons.iconsSize, tintColor: '#252525' }}
                        resizeMode='center'
                    />
                </View>
                <Image
                    source={Images.save}
                    style={{ width: Icons.iconsSize, height: Icons.iconsSize, marginRight: 5, tintColor: '#252525' }}
                    resizeMode='center'
                />
            </View>

            {/* likes */}
            {

                postLikedBy.length > 0 && <Text style={{ paddingLeft: 15, paddingTop: 5 }}>{postLikedBy.length} {postLikedBy.length > 1 ? 'likes' : 'like'}</Text>
            }

            {
                caption != "" && (
                    <View style={{ flexDirection: 'row', marginHorizontal: 15, marginTop: 4 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{accId}</Text>
                        <Text style={{ paddingLeft: 5, fontSize: 12 }}>{caption}</Text>
                    </View>
                )
            }

            {
                comments.length > 0 && <Text style={{ paddingLeft: 15, color: 'gray', marginTop: 7 }} onPress={() => navigation.push('Comments', { postId: id, isView: false })}>View all {comments.length} comments</Text>

            }

            <View style={{ flexDirection: 'row', paddingLeft: 15, paddingVertical: 10, justifyContent: 'space-around', alignItems: 'center' }}>
                <Image
                    source={{ uri: currentUser?.profileURL }}
                    style={{ width: 30, height: 30, borderRadius: 50, marginLeft: 5 }}
                />
                <TextInput
                    placeholder='Add a comment...'
                    style={{ paddingHorizontal: 15, width: '85%', marginLeft: 10 }}
                    onChangeText={text => setUserComment(text)}
                    value={userComment}
                    multiline


                />
                <Text style={{ marginRight: 10, fontSize: 15, padding: 8, color: '#56b7f2', paddingRight: 10 }} onPress={handleComment}>Post</Text>
            </View>

            <Text style={{ paddingLeft: 15, color: 'gray', fontSize: 12 }}>{moment(new Date(timeStamp)).utc().fromNow()}.</Text>

        </View>
    )
}

export default Feed

const MyLoader = () => (
    <ContentLoader
        height={140}
        speed={1}
        backgroundColor={'#333'}
        foregroundColor={'#999'}
        viewBox="0 0 380 70"

    >
        {/* Only SVG shapes */}
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    </ContentLoader>
)

const BottomSheetsComponent = ({ postId, userId, setSheetOpen,sheetOpen }) => {
    const handleDeletePost = async () => {
        try {

            await deleteDoc(doc(db, "posts", postId))

            setSheetOpen(false)

        } catch (err) {
            alert(err)
        }
    }
    return (
        <BottomSheet isVisible={sheetOpen} containerStyle={{ width: '100%' }} onBackdropPress={() =>setSheetOpen(false)}>

            <View style={{ width: '100%', height: 150, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableWithoutFeedback onPress={handleDeletePost}>

                    <View style={{ width: '90%', flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
                        <Image source={Images.pencil} style={{ width: 27, height: 27 }} />
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>Edit</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>

                    <View style={{ width: '90%', flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <Image source={Images.delete} style={{ width: 27, height: 27, tintColor: '#FD1D1D' }} />
                        <Text style={{ marginLeft: 10, fontSize: 16, color: '#FD1D1D' }}>Delete Post</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>

        </BottomSheet>
    )
}


const styles = StyleSheet.create({
    feedContainer: {
        height: 'auto',
        marginBottom: 15

    },
    postImageContainer: {
        width: win.width,
        height: undefined,
        justifyContent: 'center'
    }
    ,
    postImage: {
        width: win.width,
        height: 512 * ratio



    }
})