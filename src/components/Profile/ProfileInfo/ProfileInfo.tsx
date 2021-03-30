import React, {ChangeEvent, useState} from 'react'
import s from './ProfileInfo.module.scss'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import userPhoto from "../../../assets/images/user.png"
import ProfileDataForm from "./ProfileDataForm"
import {ContactsType, ProfileType} from "../../../types/types"
import {getProfileSelector} from '../../../redux/profile-selectors'
import {useDispatch, useSelector} from 'react-redux'
import {savePhoto, saveProfile} from '../../../redux/profile-reducer'
import {ThunkDispatch} from 'redux-thunk'
import {AppStateType} from '../../../redux/redux-store'
import {AnyAction} from 'redux'

type PropsType = {
    isOwner: boolean
}

const ProfileInfo: React.FC<PropsType> = ({isOwner}) => {

    type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction> // TODO

    const profile = useSelector(getProfileSelector)

    const dispatch: AppDispatch = useDispatch()

    let [editMode, setEditMode] = useState(false) // здесь сидит массив, из которого мы достаем первый элемент и присваем editMode, достаем второй элементи присваем setEditMode

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }

    const onSubmit = (formData: ProfileType) => { // Из формы данные введенные собираем, отправляем в бизнес
        dispatch(saveProfile(formData)).then(
            () => {
                setEditMode(false)
            })
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.userPhoto}/>
                {isOwner && <input type='file' onChange={onMainPhotoSelected}/>}

                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData goToEditMode={() => {
                        setEditMode(true)
                    }} profile={profile} isOwner={isOwner}/>
                }
                <ProfileStatusWithHooks/>
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner && <div>
                <button onClick={goToEditMode}>edit</button>
            </div>}

            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>}
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object
                .keys(profile.contacts)
                .map(key => {
                    return <Contact key={key} contactTitle={key}
                                    contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}
            </div>
        </div>
    )
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    )
}

export default ProfileInfo