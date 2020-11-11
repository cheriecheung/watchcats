import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPersonalInfo, postPersonalInfo, deletePicture } from '../../../redux/actions/accountActions';

function useGeneral(activeKey) {
  const dispatch = useDispatch();
  const { data, profilePicRemoved } = useSelector((state) => state.account);

  const [photoField, setPhotoField] = useState()

  console.log('_________render useGeneral')

  useEffect(() => {
    if (activeKey === ' general') {
      dispatch(getPersonalInfo());
    }
  }, [activeKey, dispatch])

  useEffect(() => {
    if (data) {
      const { profilePictureFileName } = data;
      if (profilePictureFileName) {
        setPhotoField(profilePictureFileName);
      }
    }
  }, [data])

  useEffect(() => {
    if (profilePicRemoved) {
      setPhotoField(null)
    }
  }, [profilePicRemoved])

  function handlePreview(data) {
    setPhotoField(data)
  }

  function handleRemovePhoto(fileName) {
    if (fileName.includes('base64')) {
      setPhotoField(null)
    } else {
      dispatch(deletePicture(fileName));
    }
  };

  function onSubmit(data) {
    const { profilePictureFileName, ...rest } = data;
    dispatch(postPersonalInfo(rest, profilePictureFileName.file));
  }

  return {
    data,
    onSubmit,
    photoField,
    handlePreview,
    handleRemovePhoto,
    profilePicRemoved
  };
}

export { useGeneral };
