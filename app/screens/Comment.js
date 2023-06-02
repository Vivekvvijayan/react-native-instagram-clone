import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback, Pressable


} from "react-native";

import { useEffect, useLayoutEffect, useState } from "react";
import { Images } from "../../utils/Images";
import UserCircle from "../components/UserCircle";
import { useDispatch, useSelector } from "react-redux";
import uuid from 'react-native-uuid'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../components/Loader";
import moment from "moment";
import { getTimeStamp } from "../../utils/date";

const Comment = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.authUser.currentUser);
  const [userComment, setUserComment] = useState("");

  const { postId, isView } = route.params;
  const [totalComment, setTotalComments] = useState([])
  const [loader, setLoader] = useState(false)
  const [cLoader, setCLoader] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <Image
          source={Images.send}
          style={{ width: 25, height: 25, marginRight: 15 }}
        />
      ),
    
    });
  });



  useEffect(() => {

    setLoader(true)
    getCurrentComments()

    setLoader(false)
  }, [])

  const getCurrentComments = async () => {
    try {

      const currentComments = await getDoc(doc(db, "posts", postId))
      setTotalComments(currentComments.data().comments)

    } catch (err) {
      setLoader(false)
      alert(err)
    }
  }


  // handleuser commeting

  const handleComment = async () => {
    setCLoader(true)
    const commentID = uuid.v4() //generating comment id
    try {

      if (userComment != "") {

        setTotalComments(current => [...current, {
          commentID,
          userID: currentUser?.email,
          message: userComment,
          commentLikesBy: [],
          timeStamp: new Date().getTime()
        }])

        updateDoc(doc(db, "posts", postId), {
          comments: [...totalComment, {
            commentID,
            userID: currentUser?.email,
            message: userComment,
            commentLikesBy: [],
            timeStamp: new Date().getTime()
          }]
        })

        setCLoader(false)
        setUserComment("");
      }

    }
    catch (err) {
      alert(err)
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ padding: 5 }}>
        {
          !loader ?
            totalComment.map((comment, i) => (
              <CommentMessage key={i} {...comment} postId={postId} totalComments={totalComment} setTotalComments={setTotalComments} />
            )) : <Loader />

        }
      </ScrollView>

      <View
        style={{
          width: "100%",
          height: 60,
          paddingHorizontal: 5,
          borderTopColor: "#f7f7f7",
          borderWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Add a comment..."
          style={{ width: "85%", height: "100%", paddingHorizontal: 10 }}
          multiline
          onChangeText={(text) => setUserComment(text)}
          value={userComment}
          autoFocus={isView}
        />
        {
          !cLoader ? (<Text
            style={{
              marginRight: 10,
              fontSize: 17,
              padding: 10,
              color: "#56b7f2",
            }}
            onPress={handleComment}
          >
            Send
          </Text>) : <Loader />
        }
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({});




const CommentMessage = ({ commentID, userID, message, postId, timeStamp, commentLikesBy, totalComments, setTotalComments }) => {
  const [commentFocus, setCommentFocus] = useState(false);
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.authUser.currentUser)
  const [likesNumber, setLikesNumber] = useState(commentLikesBy.length)
  const [commentedUserData, setCommentedUserData] = useState({})

  const [isCurrentUserLiked, setCurrentUserLiked] = useState(commentLikesBy.includes(currentUser?.email))


  const handleDeleteComment = () => {

    const newCommentLists = totalComments.filter(comment => comment.commentID != commentID)
    setTotalComments(newCommentLists)
    updateDoc(doc(db, "posts", postId), {

      comments: newCommentLists

    })

  }

  const likeComment = async () => {
    setLikesNumber(likesNumber + 1)
    setCurrentUserLiked(true)
    try {

      totalComments.forEach((item, index) => {

        if (item.commentID === commentID) {
          console.log(totalComments[index]);
          totalComments[index].commentLikesBy = [...totalComments[index].commentLikesBy, currentUser.email]
        }

      })

      updateDoc(doc(db, "posts", postId), {

        comments: totalComments

      })

    }
    catch (err) {
      setLikesNumber(setLikesNumber - 1)
      setCurrentUserLiked(false)
      alert(err)

    }

  }


  // handle unlike

  const unLikeComment = async () => {
    setLikesNumber(likesNumber - 1)
    setCurrentUserLiked(false)
    try {

      totalComments.forEach((item, index) => {

        if (item.commentID === commentID) {
          console.log(totalComments[index]);
          totalComments[index].commentLikesBy = totalComments[index].commentLikesBy.filter((e) => e != currentUser?.email)
        }

      })

      updateDoc(doc(db, "posts", postId), {

        comments: totalComments

      })
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    fetchCommentedUserData()
  }, [])


  const fetchCommentedUserData = async () => {
    try {

      const commentedUserData = await getDoc(doc(db, "users", userID))
      const { accId, profileURL, ...rest } = commentedUserData.data()

      setCommentedUserData({
        accId,
        profileURL
      })



    } catch (err) {
      alert(err)
    }
  }

  return (
    <TouchableHighlight activeOpacity={0.8} underlayColor="transperant">
      <View
        style={{
          width: "100%",
          height: 70,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback
          onLongPress={() => setCommentFocus(true)}
          onPress={() => setCommentFocus(false)}
        >
          <View
            style={{
              width: "90%",
              marginLeft: 5,
              height: "auto",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <UserCircle url={commentedUserData?.profileURL} />
            <View style={{ width: "100%", justifyContent: "flex-start" }}>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {/* <> */}
                {commentedUserData?.accId}
{"   "}
                <Text style={{color:'#808080'}}>

                  {getTimeStamp(timeStamp)}
                </Text>
                {/* </> */}
              </Text>

              <Text style={{ paddingTop: 5, fontSize: 13 }}>
                {message}
              </Text>
              <Text style={{ color: "gray", paddingTop: 3, fontSize: 12 }}>
                Replay
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={{ alignItems: "center", marginRight: 10 }}>

          <Pressable
            style={{
              padding: 10,

              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => {
              commentFocus ?
                handleDeleteComment()
                : (!isCurrentUserLiked ? likeComment() : unLikeComment())
            }}
          >
            <>
              {
                commentFocus ? (<Image style={{ width: 15, height: 15 }}
                  source={{ uri: "https://static.thenounproject.com/png/4058374-200.png" }}
                />) :
                  isCurrentUserLiked
                    ?
                    (
                      <Image source={Images.heartFill} style={{ width: 15, height: 15 }} />
                    ) : (
                      <Image source={Images.heartOutline} style={{ width: 15, height: 15 }} />
                    )


              }
              <Text>{!commentFocus && likesNumber}</Text>
            </>



          </Pressable>

        </View>
      </View>
    </TouchableHighlight>
  );
};
