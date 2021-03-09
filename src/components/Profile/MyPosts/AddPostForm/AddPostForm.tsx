import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Textarea} from "../../../common/FormsControls/FormsControls";

const AddPostForm: React.FC<InjectedFormProps<NewPostFormValuesType & PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewPostFormValuesKeysType>('Post message', 'newPostText', [required], Textarea)}

            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export const AddPostReduxForm = reduxForm<NewPostFormValuesType>({form: 'profileAddPostForm'})(AddPostForm)

// Types

export type NewPostFormValuesType = {
    newPostText: string
}

type PropsType = {}

type NewPostFormValuesKeysType = GetStringKeys<NewPostFormValuesType>

