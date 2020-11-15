import React from "react";
import { uploadTestPicture } from '../../redux/actions/accountActions'
import { FileUploader } from '../../components/FormComponents'
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';

function About() {
  const dispatch = useDispatch({ defaultValues: { testPic: '' } });

  const methods = useForm();
  const { handleSubmit, reset, setValue, errors } = methods;

  const onSubmit = (data) => {
    const { testPic } = data;
    console.log({ data })
    dispatch(uploadTestPicture(testPic.file))
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>about page</h5>
        <FileUploader name="testPic" setFileData={(data) => setValue(`testPic`, data)} />
        <button type="submit">upload picture for test account</button>
      </form>
    </FormProvider>
  );
}

export default About