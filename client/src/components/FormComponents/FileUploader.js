import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { getErrorProperties } from '../../utility'
import { useTranslation } from 'react-i18next';

const Label = styled.label`
  border: 1px solid ${props => props.hasError ? '#E56E5A' : '#d9d9d9'} !important;
`

const ErrorDisplay = styled.span`
  display: inline-block;
  color: #E56E5A;
  float: right;
  text-align: right;
`

export default function FileUploader({
  name,
  id,
  fileType,
  setFileData,
  setDisplayPreview,
}) {
  const { t } = useTranslation();

  const { register, control, watch, errors } = useFormContext();
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
    <>
      <Label htmlFor={name} className="upload-file-input form-control" hasError={hasError}>
        <i className="fas fa-upload" style={{ opacity: 0.4, marginRight: 10 }} />
        <span>{t('owner_form.upload')}</span>
      </Label>

      <Controller
        name={name}
        control={control}
        render={() =>
          <input
            type="file"
            id={id}
            accept={fileType}
            onChange={handleCreateFormData}
          />
        }
      />

      <ErrorDisplay hidden={!hasError}>{message}</ErrorDisplay>
    </>
  );
}



export function ArrayFileUploader({
  name,
  // id,
  fileType,
  setFileData,
  setDisplayPreview
}) {
  const { t } = useTranslation();

  const { control, errors } = useFormContext();
  const { hasError, message } = getErrorProperties(name, errors)

  useEffect(() => {
    console.log({ errors })
  }, [errors])

  const handleCreateFormData = (e) => {
    e.persist();
    const { files } = e.target || {};

    if (files && files[0]) {
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
    <>
      <Label htmlFor={name} className="upload-file-input form-control" hasError={hasError}>
        <i className="fas fa-upload" style={{ opacity: 0.4, marginRight: 10 }} />
        <span>{t('owner_form.upload')}</span>
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
    </>
  )
}