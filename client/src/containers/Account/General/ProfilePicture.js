import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { FileDisplayField, FileUploader } from '../../../components/FormComponents';

function ProfilePicture({ setValue, reset, photoField, handlePreview, handleRemovePhoto, profilePicRemoved }) {
  const { t } = useTranslation();

  useEffect(() => {
    if (profilePicRemoved) {
      setValue(`profilePictureFileName`, null)
    }
  }, [profilePicRemoved])

  return (
    <Row>
      <Col md={6}>
        <div style={{ fontSize: '0.80rem' }}>
          <span>Please choose a high quality picture of yourself:</span>
          <ul style={{ padding: '0px 20px' }}>
            <li>No filters, effects or stickers applied to the image</li>
            <li>Best image format JPG, JPEG, PNG</li>
            <li>Minimum size 360 x 254 pixels</li>
          </ul>
        </div>
      </Col>

      <Col md={6}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {photoField ? (
            <FileDisplayField
              name="profilePictureFileName"
              fileName={photoField}
              handleRemovePhoto={() => {
                handleRemovePhoto(photoField)
                if (photoField.includes('base64')) {
                  setValue("profilePictureFileName", null)
                }
              }}
            />
          ) : (
              <FileUploader
                name="profilePictureFileName"
                id="profilePictureFileName"
                fileType="image/x-png,image/jpeg"
                setFileData={(data) => reset({ profilePictureFileName: data })}
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
