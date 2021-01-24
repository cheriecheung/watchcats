import React from "react";
import { themeColor } from '../../../style/theme';
import { Image, ImageContainer } from '../../UIComponents';
import defaultProfilePic from '../../../assets/images/default_profile_pic.jpg';

function InfoWindow({ item }) {
    console.log({ clickedResult: item })
    const { firstName, lastName, profilePicture, totalReviews } = item || {}

    const profilePicURL = profilePicture ? `${process.env.REACT_APP_API_DOMAIN}/image/${profilePicture}` : defaultProfilePic

    return (
        <div style={{ display: 'flex' }}>
            <ImageContainer style={{ width: 50, height: 50 }}>
                <Image url={profilePicURL} />
            </ImageContainer>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: 10,
                textAlign: 'left'
            }}>
                <span style={{
                    fontFamily: 'Source Sans Pro',
                    fontSize: '1.2rem',
                }}>
                    {firstName} {lastName.charAt(0)}
                </span>
                {totalReviews > 0 ?
                    <div>
                        <span style={{ fontFamily: 'Source Sans Pro' }}>
                            {totalReviews} Reviews
                        </span>
                        <i className="fas fa-star icon-sort-review ml-1" />
                        <i className="fas fa-star icon-sort-review" />
                        <i className="fas fa-star icon-sort-review" />
                        <i className="fas fa-star icon-sort-review" />
                        <i className="fas fa-star icon-sort-review" />
                    </div>
                    :
                    <span style={{
                        fontFamily: 'Source Sans Pro',
                        textAlign: 'right',
                        color: themeColor.green
                    }}>
                        <i className="fas fa-user-plus fa-xs mr-1" />
                        New member
                    </span>
                }
            </div>
        </div>
    );
}

export default InfoWindow;
