import React from 'react';
import PropTypes from 'prop-types'; 
import {Image,Badge} from 'react-bootstrap';
import FontAwesome from '../common/FontAwesome';
import { stringAvatar } from '../../helpers/utils';
import { Avatar } from '@mui/material';

class DropDownTitle extends React.Component {
	render() {
		return (
			<div className={this.props.className}>
				{
					this.props.image?
					<Image alt={this.props.imageAlt} src={this.props.image} className={this.props.imageClass} />
					:''
				}

				{
					this.props.user ? 
					<Avatar className={this.props.imageClass+ ` userAvatarHeader`} {...stringAvatar(this.props.user.attributes?.name + ' ' + this.props.user.attributes?.middle_name)} /> : ''
				}

				{(this.props.faIcon && !this.props.image)?
		    		<FontAwesome icon={this.props.faIcon} className={this.props.iconClass}/>:''
				}

				{this.props.title}

				{this.props.badgeValue?
					<Badge variant={this.props.badgeVariant} className={this.props.badgeClass}>{this.props.badgeValue}</Badge>
					:''
				}
		    </div>
		);
	}
}

DropDownTitle.propTypes = {
  title: PropTypes.string.isRequired,
  faIcon: PropTypes.string,
  iconClass: PropTypes.string,
  className: PropTypes.string,
  image: PropTypes.string,
  imageAlt:PropTypes.string,
  imageClass: PropTypes.string,
  badgeVariant: PropTypes.string,
  badgeClass: PropTypes.string,
  badgeValue: PropTypes.number,
  user: PropTypes.any
};

DropDownTitle.defaultProps = {
    faIcon: '', //shopping-basket
    iconClass:'',
    className:'',
  	imageAlt:'',
    image:'',
    imageClass:'',
    badgeVariant:'',
    badgeClass: '',
    badgeValue:0,
}

export default DropDownTitle;