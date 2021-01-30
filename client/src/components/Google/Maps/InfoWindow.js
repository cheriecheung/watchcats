import React from "react";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { themeColor } from '../../../style/theme';
import { Image, ImageContainer, OutlinedButton } from '../../UIComponents';

const Text = styled.span`
    font-family: Source Sans Pro;
`

function InfoWindow({ item }) {
    const { t } = useTranslation();

    const {
        firstName,
        lastName,
        profilePicture,
        totalReviews,
        urlId
    } = item || {}

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <ImageContainer style={{ width: 50, height: 50 }}>
                    <Image url={profilePicture} />
                </ImageContainer>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: 10,
                    textAlign: 'left'
                }}>
                    <Text style={{ fontSize: '1.2rem' }}>
                        {firstName} {lastName.charAt(0)}
                    </Text>
                    {totalReviews > 0 ?
                        <div>
                            <Text>{totalReviews} {t('find_sitter.reviews')}</Text>
                            <i className="fas fa-star icon-sort-review ml-1" />
                            <i className="fas fa-star icon-sort-review" />
                            <i className="fas fa-star icon-sort-review" />
                            <i className="fas fa-star icon-sort-review" />
                            <i className="fas fa-star icon-sort-review" />
                        </div>
                        :
                        <Text
                            style={{
                                marginTop: 5,
                                color: themeColor.green,
                                textAlign: 'right',
                            }}
                        >
                            <i className="fas fa-user-plus fa-xs mr-1" />
                            {t('find_sitter.new_member')}
                        </Text>
                    }
                </div>
            </div>

            <a href={`/profile/catsitter/${urlId}`} style={{ marginTop: 10 }}>
                <OutlinedButton style={{ width: '100%', height: 30 }}>
                    <i className="fas fa-search-plus mr-2" />
                    <Text>{t('find_sitter.view_profile')}</Text>
                </OutlinedButton>
            </a>
        </div>
    );
}

export default InfoWindow;
