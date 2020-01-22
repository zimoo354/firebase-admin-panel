import React from 'react';
import Columns from 'react-bulma-components/lib/components/columns';
import {Link} from 'react-router-dom';
import Icon from 'react-fontawesome';
import profile_placeholder from './profile.png';
import {logOut} from '../../../utils/helper_functions';

const ProfilePic = props => (
    <div className='profile-pic' style={{backgroundImage: `url(${(props.profile_pic) ? props.profile_pic : profile_placeholder})`}} />
)

const Logout = props => (
    <>
        {
            props.user &&
            <Columns.Column className={`user-dd ${(props.mobile) ? 'show' : 'hide'}-for-small-only`}>
                <ProfilePic profile_pic={props.user.profile_pic} />
                <Link to={`/users/form/${props.user.uuid}`}>{`${props.user.first_name} ${props.user.last_name}`}</Link>
                <Icon name='power-off' onClick={logOut} />
            </Columns.Column>
        }
    </>
)

export default Logout;