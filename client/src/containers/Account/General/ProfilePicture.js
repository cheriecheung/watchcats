import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { deletePicture } from '../../../_actions/accountActions';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FileDisplayField, FileUploader } from '../../../components/FormComponents';

function ProfilePicture({ setValue, reset }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { data: userData, profilePicRemoved } = useSelector((state) => state.account);

  const [photoField, setPhotoField] = useState()

  useEffect(() => {
    if (userData) {
      const { profilePictureFileName } = userData;
      if (profilePictureFileName) {
        setPhotoField(profilePictureFileName);
      }
    }
  }, [userData]);

  const handlePreview = (data) => {
    setPhotoField(data)
  }

  const handleRemovePhoto = (fileName) => {
    if (fileName.includes('base64')) {
      setValue("profilePictureFileName", null)
      setPhotoField(null)
    } else {
      dispatch(deletePicture(fileName));
    }
  };

  useEffect(() => {
    if (profilePicRemoved) {
      setValue(`profilePictureFileName`, null)
      setPhotoField(null)
    }
  }, [profilePicRemoved])

  return (
    <Row>
      <Col md={6}>
        <div style={{ fontSize: '0.80rem' }}>
          <span>Please choose a high quality picture of yourself:</span>
          <ul style={{ padding: '0px 20px' }}>
            <li>A well-lit photo with your face fully visible, and in focus</li>
            <li>No filters, effects or stickers applied to the image</li>
            <li>You’re alone in the picture</li>
            <li>A colour photo</li>
            <li>
              Best image format JPG, JPEG, PNG. <br /> Minimum size 360 x 254 pixels
              </li>
          </ul>
        </div>
      </Col>

      <Col md={6}>
        <div style={{ display: 'flex', flexDirection: 'column', wordWrap: 'break-word' }}>
          {photoField ? (
            <FileDisplayField
              name="profilePictureFileName"
              fileName={photoField}
              handleRemovePhoto={() => handleRemovePhoto(photoField)}
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

        {/* <img
                  style={{
                    width: 200,
                    height: 200,
                    border: '1px solid #ced4da',
                    borderRadius: '50%',
                    position: 'absolute',
                    //zIndex: -1,
                  }}
                />
                 <div style={{ position: 'absolute' }}>
                  <i className="fas fa-camera fa-3x"></i>
                  <p>Drop your image here or click to add one</p>
                </div> 
                <input
                  type="file"
                  style={{
                    border: '1px solid #ced4da',
                    borderRadius: '50%',
                    width: 200,
                    height: 200,
                    outline: 'none',
                  }}
                /> */}
      </Col>
    </Row>
  );
}

export default ProfilePicture;
