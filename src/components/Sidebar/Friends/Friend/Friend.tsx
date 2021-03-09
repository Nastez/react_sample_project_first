import React from 'react'
import s from './Friend.module.scss'

type PropsType = {
    name: string
}

const Friend: React.FC<PropsType> = (props) => {
    return (
        <div className={s.friendGroup}>
            <div className={s.ball}></div>
             <div className={s.friendItem}>{props.name}</div>
        </div>
    )
}

export default Friend;