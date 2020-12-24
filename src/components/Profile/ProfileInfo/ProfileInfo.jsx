import React from 'react';
import s from './ProfileInfo.module.scss';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large}/>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <div>Обо мне
                    <div>{profile.aboutMe}</div>
                </div>
                <div>Контакты
                    <div>{profile.contacts.facebook}</div>
                    <div>{profile.contacts.website}</div>
                    <div>{profile.contacts.vk}</div>
                    <div>{profile.contacts.twitter}</div>
                    <div>{profile.contacts.instagram}</div>
                    <div>{profile.contacts.youtube}</div>
                    <div>{profile.contacts.github}</div>
                    <div>{profile.contacts.mainLink}</div>
                </div>
                <div> Ищу работу
                    <div>{profile.lookingForAJob ?
                        <img className={s.lookingForAJobImg} src='https://www.photo-yes.ru/favicon.ico'/> :
                        <img className={s.lookingForAJobImg}
                             src='https://lh3.googleusercontent.com/proxy/xp7Cl4GW86z4Y0Kje7zRg55qUw8_8p7YVo16IQmUh-oR6cF7TPELi4lH9KdLZaGCjTaqJGfcXumtaC20Mkuf'/>}</div>
                </div>
                <div> Описание работы
                    <div>{profile.lookingForAJobDescription}</div>
                </div>
                <div> Полное имя
                    <div> {profile.fullName}</div>
                </div>
                ava + description
            </div>
        </div>
    );
}

export default ProfileInfo;