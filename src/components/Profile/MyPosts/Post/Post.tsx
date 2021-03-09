import React from 'react'
import s from './Post.module.scss'

type PropsType = {
	message: string
	likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
	return (
		<div className={s.item}>
			<img alt='imp' src='https://streamdps.ru/upload/iblock/ba4/ba43a8bf5b491168b4f74e9922c88c25.jpg' />
			{props.message}
			<div>
				<span>like</span> {props.likesCount}
			</div>
		</div>

	)
}

export default Post