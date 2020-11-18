import React from 'react';
import s from './Post.module.scss';

const Post = (props) => {
	return (
		<div className={s.item}>
			<img src='https://art1.ru/wp-content/uploads/2015/12/4213614179_a00cdf823c_o.jpg' />
			{props.message}
			<div>
				<span>like</span> {props.likesCount}
			</div>
		</div>

	);
}

export default Post;