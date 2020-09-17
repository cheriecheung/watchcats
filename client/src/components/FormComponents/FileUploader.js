import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function FileUploader({
  name,
  id,
  fileType,
  setFileData,
  setDisplayFileName,
  setDisplayPreview,
}) {
  const { register, control, watch, errors } = useFormContext();

  const handleCreateFormData = (e) => {
    e.persist();
    const { files } = e.target || {};

    if (files && files[0]) {
      const data = new FormData();
      // data.append('image', files[0], files[0].name);
      // data.append('name', files[0].name);
      data.append(name, files[0]);

      setDisplayFileName(files[0].name);
      setFileData(data);

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
    <Controller
      name={name}
      control={control}
      render={() => <input type="file" id={id} accept={fileType} onChange={handleCreateFormData} />}
    />
  );
}
