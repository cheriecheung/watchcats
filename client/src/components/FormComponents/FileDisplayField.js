import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { Spinner } from '../UIComponents'

const { REACT_APP_API_DOMAIN } = process.env;

const ImageContainer = styled.div`
    width: 120px; 
    height: 120px;
    border-radius: 10px;
    overflow: hidden; 
    background: url(${({ image }) => image}) no-repeat center center / cover;
`

const RemoveButton = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-out;
  opacity: ${({ hide }) => hide ? 0 : 1};
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
    isLoading
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
                    isLoading={isLoading}
                />
            }
        />
    )
}

export default FileDisplayField

function Display({ fileName, handleRemovePhoto, isLoading }) {
    const { t } = useTranslation();

    const [hideRemove, setHideRemove] = useState(true);

    const photoURL = fileName.includes('base64') ?
        fileName : `${REACT_APP_API_DOMAIN}/image/${fileName}`

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ImageContainer
                onMouseOver={() => setHideRemove(false)}
                onMouseLeave={() => setHideRemove(true)}
                image={photoURL}
            >
                <RemoveButton type="button" onClick={handleRemovePhoto} hide={hideRemove}>
                    {isLoading ?
                        <Spinner /> :
                        <RemoveText>{t('settings.remove')}</RemoveText>
                    }
                </RemoveButton>
            </ImageContainer>
        </div>
    )
}

FileDisplayField.propTypes = {
    name: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    handleRemovePhoto: PropTypes.func.isRequired
};

Display.propTypes = {
    fileName: PropTypes.string.isRequired,
    handleRemovePhoto: PropTypes.func.isRequired
};