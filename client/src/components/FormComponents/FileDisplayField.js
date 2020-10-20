import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const { REACT_APP_API_DOMAIN } = process.env;

const ImageContainer = styled.div`
    width: 120px; 
    height: 120px;
    border-radius: 10px;
    overflow: hidden; 
`

const Image = styled.img`
    object-fit: cover; 
    width: 100%; 
    height: 100%;
`

const RemoveButton = styled.button`
    color: red;
    background: none;
    border: none;
    outline: none !important;
`

export default function FileDisplayField({ name, fileName, handleRemovePhoto }) {
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

function Display({ fileName, handleRemovePhoto }) {
    const { t } = useTranslation();

    const photoURL = fileName.includes('base64') ? fileName : `${REACT_APP_API_DOMAIN}/image/${fileName}`

    return (
        <div style={{ display: 'flex' }}>
            <ImageContainer>
                <Image src={photoURL} alt="profile_picture" />
            </ImageContainer>

            <RemoveButton type="button" onClick={handleRemovePhoto}>
                Remove
            </RemoveButton>
        </div>
    )
}