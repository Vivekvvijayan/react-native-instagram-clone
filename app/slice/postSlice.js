import { createSlice } from '@reduxjs/toolkit'




const initialState = {

    userPosts: [],

}

export const postSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {

        // handleInteraction: (state, action) => {

        //     state.posts.forEach((post) => {

        //         if (post.id === action.payload.postId) {


        //             action.payload.status === true ? post.likes += 1 : post.likes -= 1
        //             if (action.payload.status) {

        //                 post.postLikedBy.push(action.payload.user)
        //             } else {
        //                 post.postLikedBy.pop(action.payload.user)

        //             }
        //         }
        //     })


        // },

        // postComment: (state, action) => {
        //     state.posts.forEach(post => {
        //         if (post.id === action.payload.postId) {
        //             post.comments.push(action.payload.comment)
        //         }
        //     })
        // },

        // deleteComment: (state, action) => {
        //     const newCommentList = state.posts.filter((post) => { return post.id === action.payload.postId })[0].comments.filter(comment => comment.commentId != action.payload.commentId)

        //     state.posts.filter(post => { return post.id === action.payload.postId })[0].comments = newCommentList



        // },
        // handleInteractionComment: (state, action) => {

        //     let likingComment = state?.posts?.filter(post => { return post.id === action.payload.postId })[0].comments.filter(comment => { return comment.commentId === action.payload.commentId })[0]

        //     action.payload.status ? likingComment.likesNumber += 1 : likingComment.likesNumber -= 1
        //     if (action.payload.status) {

        //         likingComment?.likedUsers?.push(action.payload.user)
        //     } else {
        //         likingComment?.likedUsers?.pop(action.payload.user)
        //     }


        // },

        setUserPost: (state, action) => {

           state.userPosts = action.payload

        },



    }
})



export const { handleInteraction, setUserPost, setPosts } = postSlice.actions

export default postSlice.reducer