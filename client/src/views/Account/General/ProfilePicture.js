import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { FileDisplayField, FileUploader } from '../../../components/FormComponents';

function ProfilePicture({
  t,
  reset,
  photoField,
  handlePreview,
  handleRemovePhoto
}) {
  return (
    <Row>
      <Col md={6}>
        <div style={{ fontSize: '0.80rem' }}>
          <span>{t('owner_form.picture_requirement_1')}</span>
          <ul style={{ padding: '0px 20px' }}>
            <li>{t('owner_form.picture_requirement_2')}</li>
            <li>{t('owner_form.picture_requirement_3')}</li>
            <li>{t('owner_form.picture_requirement_4')}</li>
          </ul>
        </div>
      </Col>

      <Col md={6}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {photoField ? (
            <FileDisplayField
              name="profilePicture"
              fileName={photoField}
              handleRemovePhoto={() => handleRemovePhoto(photoField)}
            />
          ) : (
              <FileUploader
                name="profilePicture"
                id="profilePicture"
                fileType="image/x-png,image/jpeg"
                setFileData={(data) => reset({ profilePicture: data })}
                setDisplayPreview={handlePreview}
              />
            )
          }
        </div>
      </Col>
    </Row>
  );
}

export default ProfilePicture;
