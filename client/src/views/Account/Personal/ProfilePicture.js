import React from 'react';
import { Row, Col } from 'reactstrap';
import { FileDisplayField, FileUploader } from '../../../components/FormComponents';

function ProfilePicture({
  t,
  reset,
  photoField,
  handlePreview,
  handleRemovePhoto,
  isLoading
}) {
  return (
    <Row>
      <Col md={6}>
        <div style={{ fontSize: '0.80rem' }}>
          <span>{t('personal_info.picture_requirement_1')}</span>
          <ul style={{ padding: '0px 20px' }}>
            <li>{t('personal_info.picture_requirement_2')}</li>
            <li>{t('personal_info.picture_requirement_3')}</li>
            <li>{t('personal_info.picture_requirement_4')}</li>
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
              isLoading={isLoading}
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
