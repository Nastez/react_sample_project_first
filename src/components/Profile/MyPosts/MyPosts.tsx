import React from 'react'
import s from './MyPosts.module.scss'
import Post from './Post/Post'
import {PostsType} from "../../../types/types"
import {AddPostReduxForm, NewPostFormValuesType} from "./AddPostForm/AddPostForm"

export type MapPropsType = {
    posts: Array<PostsType>
}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts = React.memo<MapPropsType & DispatchPropsType>((props) => {

    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post message={p.message} key={p.id} likesCount={p.likesCount}/>)

    const addNewPost = (values: NewPostFormValuesType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostReduxForm onSubmit={addNewPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

export default MyPosts

