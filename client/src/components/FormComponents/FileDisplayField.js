import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { Spinner } from '../UIComponents'

const ImageContainer = styled.div`
    width: 120px; 
    height: 120px;
    border-radius: 10px;
    overflow: hidden; 
    background: url(${({ image }) => image}) no-repeat center center / cover;
`

const ImageMask = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-out;
  opacity: ${({ isHidden }) => isHidden ? 0 : 1};
  display: flex;
  justify-content: center;
`;

const RemoveText = styled.span`
    color: #fff;
    align-self: center;
`

function FileDisplayField({
    name,
    fileName,
    handleRemovePhoto,
}) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={() =>
                <Display
                    fileName={fileName}
                    handleRemovePhoto={handleRemovePhoto}
                />
            }
        />
    )
}

export default FileDisplayField

function Display({ fileName, handleRemovePhoto }) {
    const { t } = useTranslation();

    const [hideRemove, setHideRemove] = useState(true);
    const [showConfirmRemove, setShowConfirmRemove] = useState(false)

    const photoURL = fileName.includes('base64') ?
        fileName : `${process.env.REACT_APP_IMAGE_DOMAIN}/${fileName}`

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ImageContainer
                onMouseOver={() => setHideRemove(false)}
                onMouseLeave={() => {
                    setHideRemove(true)
                    setShowConfirmRemove(false)
                }}
                image={photoURL}
            >
                <ImageMask isHidden={hideRemove}  >
                    {showConfirmRemove ?
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <RemoveText>
                                {t('settings.remove')}&nbsp;?
                            </RemoveText>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <RemoveText
                                    type="button"
                                    onClick={handleRemovePhoto}
                                >
                                    {t('form.yes')}
                                </RemoveText>
                                <RemoveText
                                    type="button"
                                    onClick={() => setShowConfirmRemove(false)}
                                >
                                    {t('form.no')}
                                </RemoveText>
                            </div>
                        </div>
                        :
                        <RemoveText
                            type="button"
                            onClick={() => setShowConfirmRemove(true)}
                        >
                            {t('settings.remove')}
                        </RemoveText>
                    }
                </ImageMask>
            </ImageContainer>
        </div>
    )
}

ImageContainer.propTypes = {
    image: PropTypes.string.isRequired,
};

ImageMask.propTypes = {
    isHidden: PropTypes.bool.isRequired,
};

FileDisplayField.propTypes = {
    name: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    handleRemovePhoto: PropTypes.func.isRequired
};

Display.propTypes = {
    fileName: PropTypes.string.isRequired,
    handleRemovePhoto: PropTypes.func.isRequired
};