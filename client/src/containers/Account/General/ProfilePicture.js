import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { deletePicture } from '../../../_actions/accountActions';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FileUploader } from '../../../components/FormComponents';

const uploadProfilePicId = 'upload-profile-pic';

const { REACT_APP_API_DOMAIN } = process.env;

function ProfilePicture({ setValue, profilePicURL }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [profilePicFileName, setProfilePicFileName] = useState('');
  const [profilePicPreview, setProfilePicPreview] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const onConfirmDeletePic = (fileName) => {
    dispatch(deletePicture(fileName));
    history.push({ state: { accountTab: 'general' } });
    // or in action page
    // window.location.reload();
  };

  return (
    <>
      <Modal
        visible={modalVisible}
        onOk={() => onConfirmDeletePic(profilePicURL)}
        onCancel={() => setModalVisible(false)}
        maskClosable={false}
      >
        Are you sure you want to remove your picture
      </Modal>

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
            <label htmlFor={uploadProfilePicId} className="upload-file-input form-control">
              <i className="fas fa-upload" style={{ opacity: 0.4, marginRight: 10 }} />
              <span>{t('owner_form.upload')}</span>
            </label>
            <FileUploader
              name="profilePic"
              id={uploadProfilePicId}
              fileType="image/x-png,image/jpeg"
              setFileData={(data) => setValue('profilePic', data)}
              setDisplayFileName={(name) => setProfilePicFileName(name)}
              setDisplayPreview={(imgUrl) => setProfilePicPreview(imgUrl)}
            />
            {profilePicPreview && (
              <div style={{ overflow: 'hidden', width: 100, height: 100 }}>
                <img
                  src={profilePicPreview}
                  alt="profile_picture"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
            )}
            {profilePicURL && (
              <>
                <div style={{ overflow: 'hidden', width: 100, height: 100 }}>
                  <img
                    src={`${REACT_APP_API_DOMAIN}/image/${profilePicURL}`}
                    alt="profile_picture"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <button
                  type="button"
                  style={{
                    color: 'red',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                  }}
                  onClick={() => setModalVisible(true)}
                >
                  Remove
                </button>
              </>
            )}
            {profilePicFileName !== '' && <p>{profilePicFileName}</p>}
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
    </>
  );
}

export default ProfilePicture;
