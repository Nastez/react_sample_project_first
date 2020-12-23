import React from 'react';
import s from './ProfileInfo.module.scss';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            {/*<div>
                <img src='https://theinpaint.com/images/example-1-2.jpg'/>
            </div>*/}
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                <div>Обо мне
                    <div>{props.profile.aboutMe}</div>
                </div>
                <div>Контакты
                    <div>{props.profile.contacts.facebook}</div>
                    <div>{props.profile.contacts.website}</div>
                    <div>{props.profile.contacts.vk}</div>
                    <div>{props.profile.contacts.twitter}</div>
                    <div>{props.profile.contacts.instagram}</div>
                    <div>{props.profile.contacts.youtube}</div>
                    <div>{props.profile.contacts.github}</div>
                    <div>{props.profile.contacts.mainLink}</div>
                </div>
                <div> Ищу работу
                    <div>{props.profile.lookingForAJob ?
                        <img className={s.lookingForAJobImg} src='https://www.photo-yes.ru/favicon.ico'/> :
                        <img className={s.lookingForAJobImg}
                             src='https://lh3.googleusercontent.com/proxy/xp7Cl4GW86z4Y0Kje7zRg55qUw8_8p7YVo16IQmUh-oR6cF7TPELi4lH9KdLZaGCjTaqJGfcXumtaC20Mkuf'/>}</div>
                </div>
                <div> Описание работы
                    <div>{props.profile.lookingForAJobDescription}</div>
                </div>
                <div> Полное имя
                    <div> {props.profile.fullName}</div>
                </div>
                ava + description
            </div>
        </div>
    );
}

export default ProfileInfo;