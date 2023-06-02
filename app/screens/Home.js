import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  LogBox,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, {
    memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Images } from "../../utils/Images";
import { Icons } from "../../utils/Size";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import StoryItem from "../components/StoryItem";
import Feed from "../components/Feed";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserPost } from "../slice/postSlice";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { setCurrentUser, setToken, setUser } from "../slice/userSlice";
import { StatusBar } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";


const Home = ({ navigation,route }) => {
  const [loader, setLoader] = useState(false);
  const [posts, setPosts] = useState([]);
  const [refresh,setRefresh] = useState(false)

  const dispatch = useDispatch();
    // const {trigger} = route.params
  const userPosts = useSelector((state) => state.feed.userPosts);
  const token = useSelector((state) => state.authUser.TOKEN);

  const getDocument = async () => {
    try {
      const docRef = doc(db, "users", token);
      const document = await getDoc(docRef);
      dispatch(setCurrentUser(document?.data()));

      dispatch(setUserPost(document?.data().posts));
      return
    } catch (err) {
      alert(err);
      return
    }
  };

  useEffect(() => {
    setLoader(true);

    getDocument();

    setLoader(false);
  }, []);


  useEffect(() => {
   
    setLoader(true);
    onSnapshot(
        query(collection(db, "posts"),orderBy("timeStamp","desc")),
        (snapshot) => {
            setPosts(snapshot.docs);
           
        },
        (error) => {
            alert('Check your Internet connection')
        }
        )   

 
    setLoader(false);
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);


  const handleRefresh = () => {
 
      setRefresh(true)
      getDocument()
      setRefresh(false)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerLeft side
      headerLeft: () => {
        return (
          <View style={styles.flex}>
            <Image source={Images.headerLogo} style={styles.headerLogo} />
            <Image
              source={Images.arrowDown}
              resizeMode="center"
              style={{ width: 25, height: 25 }}
            />
          </View>
        );
      },
      // header right side

      headerRight: () => {
        return (
          <View style={[styles.flex, styles.headerLogoContainer]}>
            <TouchableWithoutFeedback>
              <Image
                source={Images.notification}
                style={{ width: Icons.iconsSize }}
                resizeMode="center"
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.push("Chat")}>
              <Image
                source={Images.messanger}
                style={{ width: Icons.iconsSize }}
                resizeMode="center"
              />
            </TouchableWithoutFeedback>
          </View>
        );
      },

      headerTitle: "",
    });
  });
  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={styles.homeContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <ScrollView
        
        refreshControl={<RefreshControl refreshing={refresh} progressBackgroundColor={"white"} onRefresh={handleRefresh}/>}
          ref={ref}
          contentContainerStyle={{
            backgroundColor: "white",

            marginTop: 5,
            borderTopColor: "gray",
            borderTopWidth: 0.5,
          }}
          nestedScrollEnabled={true}
        >
          {/* <StoryItem /> */}
          

          {loader ? 
             (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator color={"black"} size={"large"} />
              
                </View>
          
           
          ) : posts?.map((postItem, i) => (
            <Feed
              key={i}
              userID={postItem.data().userID}
              accId={postItem.data().accId}
              id={postItem.data().id}
              caption={postItem.data().caption}
              profileImage={Images.user}
              image={postItem.data().image}
              likes={postItem.data().likes}
              timeStamp={postItem.data().timeStamp}
              comments={postItem.data().comments}
              postLikedBy={postItem.data().postLikedBy}
            />
        
            )
            )
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

import ContentLoader, { Instagram } from "react-content-loader";
const InstagramLoader = () => <ContentLoader />;

const styles = StyleSheet.create({
  headerLogoContainer: {
    width: "50%",
    height: "100%",

    justifyContent: "space-evenly",
  },
  headerLogo: {
    resizeMode: "center",
    width: 125,
    marginLeft: 10,

    aspectRatio: 2,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },

  // home styles
  homeContainer: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
