import React from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getErrorProperties } from '../../utility'
import ErrorDisplay from './ErrorDisplay';

const Label = styled.label`
  display:flex;
  justify-content: center;
  align-self: center;
  border: 1px solid ${props => props.error ? '#E56E5A' : '#d9d9d9'} !important;
  width: 120px; 
  height: 120px;
  border-radius: 10px;
  overflow: hidden; 
`

function FileUploader({
  name,
  fileType,
  setFileData,
  setDisplayPreview,
}) {
  const { t } = useTranslation();

  const { control, errors } = useFormContext();
  const { hasError, message } = getErrorProperties(name, errors)

  const handleCreateFormData = (e) => {
    e.persist();
    const { files } = e.target || {};

    if (files && files[0]) {
      // const data = new FormData();
      // data.append(name, files[0]);

      setFileData({ name, file: files[0] });

      if (setDisplayPreview) {
        let reader = new FileReader();
        reader.onload = (readerEvent) => {
          setDisplayPreview(readerEvent.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <Label
        htmlFor={name}
        className="upload-file-input form-control"
        error={hasError}
      >
        <div style={{ alignSelf: 'center' }}>
          <i className="fas fa-upload" style={{ opacity: 0.4, marginRight: 10 }} />
          <span>{t('owner_form.upload')}</span>
        </div>
      </Label>

      <Controller
        name={name}
        control={control}
        render={() =>
          <input
            type="file"
            id={name}
            accept={fileType}
            onChange={handleCreateFormData}
          />
        }
      />

      <ErrorDisplay hidden={!hasError}>{message}</ErrorDisplay>
    </div>
  );
}

export default FileUploader

FileUploader.propTypes = {
  name: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  setFileData: PropTypes.func,
  setDisplayPreview: PropTypes.func
};