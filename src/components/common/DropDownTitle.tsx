import React from 'react';
import PropTypes from 'prop-types';
import { Image, Badge } from 'react-bootstrap';
import FontAwesome from './FontAwesome';
import { stringAvatar } from '../../helpers/utils';
import { Avatar } from '@mui/material';

export const DropDownTitle = (props: any) => {
	const alt = props.user?.first_name + ' ' + props.user?.second_name;
	return (
		<div className={props.className}>
			{
				props.user ?
					<Image alt={alt} src={props.user.profile_img + '?' + Date.now()} className={props.imageClass} />
					: ''
			}

			{
				!props.user ?
					<Avatar className={props.imageClass + ` userAvatarHeader`} {...stringAvatar(alt)} /> : ''
			}

			{(props.faIcon && !props.image) ?
				<FontAwesome icon={props.faIcon} className={props.iconClass} /> : ''
			}

			{props.user ? alt : props.title}

			{props.badgeValue ?
				<Badge variant={props.badgeVariant} className={props.badgeClass}>{props.badgeValue}</Badge>
				: ''
			}
		</div>
	);
}

// DropDownTitle.propTypes = {
// 	title: PropTypes.string.isRequired,
// 	faIcon: PropTypes.string,
// 	iconClass: PropTypes.string,
// 	className: PropTypes.string,
// 	image: PropTypes.string,
// 	imageAlt: PropTypes.string,
// 	imageClass: PropTypes.string,
// 	badgeVariant: PropTypes.string,
// 	badgeClass: PropTypes.string,
// 	badgeValue: PropTypes.number,
// 	user: PropTypes.any
// };

// DropDownTitle.defaultProps = {
// 	faIcon: '', //shopping-basket
// 	iconClass: '',
// 	className: '',
// 	imageAlt: '',
// 	image: '',
// 	imageClass: '',
// 	badgeVariant: '',
// 	badgeClass: '',
// 	badgeValue: 0,
// }