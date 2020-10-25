import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { deletePicture } from '../../../redux/actions/accountActions';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FileUploader } from '../../../components/FormComponents';

const uploadAddressProofId = 'upload-address-proof';

function AddressProof({ setValue }) {
  const { t } = useTranslation();
  const [addressProofFileName, setAddressProofFileName] = useState('');

  return (
    <Row>
      <Col md={6} className="mb-3">
        <p>
          {t('general_info.proof_address_description1')}
          {t('general_info.proof_address_description2')}
        </p>
      </Col>
      <Col md={6} className="mb-3">
        <div style={{ display: 'flex', flexDirection: 'column', wordWrap: 'break-word' }}>
          <FileUploader
            name="addressProof"
            id={uploadAddressProofId}
            fileType="image/x-png,image/jpeg"
            setFileData={(data) => setValue('addressProof', data)}
            setDisplayFileName={(name) => setAddressProofFileName(name)}
          />
          {addressProofFileName !== '' && <p>{addressProofFileName}</p>}
        </div>
      </Col>
    </Row>
  );
}

export default AddressProof;
