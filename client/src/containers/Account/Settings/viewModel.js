import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContactDetails, submitPhoneNumber, deletePhoneNumber, verifyPhoneNumber } from '../../../redux/actions/accountActions';

function useSettings() {
  const dispatch = useDispatch();
  const { contactDetails, changePhoneNumberStep } = useSelector((state) => state.account);

  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')

  const [email, setEmail] = useState(null);
  const [asteriskedEmail, setAsteriskedEmail] = useState('')
  const [revealEmail, setRevealEmail] = useState(false);

  const [phone, setPhone] = useState(null)
  const [asteriskedPhone, setAsteriskedPhone] = useState('')
  const [revealPhone, setRevealPhone] = useState(false);

  const [inputPhoneNumber, setInputPhoneNumber] = useState('')

  const codeLength = 6
  const defaultCodeValue = [...Array(codeLength)].map(() => "")
  const [code, setCode] = useState(defaultCodeValue);
  const inputs = useRef([]);

  useEffect(() => {
    dispatch(getContactDetails());
  }, [dispatch])

  useEffect(() => {
    if (contactDetails) {
      const { email, phone } = contactDetails;

      setEmail(email);

      const asteriskedEmailName = email.substr(0, email.indexOf('@')).replace(/./g, '*');
      const emailDomain = email.substr(email.indexOf("@") + 1);
      setAsteriskedEmail(`${asteriskedEmailName}@${emailDomain}`)

      if (phone) {
        setPhone(phone)

        const withoutLastFourDigits = phone.slice(0, -4).replace(/./g, '*')
        const lastFourDigits = phone.substr(phone.length - 4);
        setAsteriskedPhone(`${withoutLastFourDigits}${lastFourDigits}`)
      }
    }
  }, [contactDetails])

  useEffect(() => {
    if (phone) {
      setPhone(phone)

      const withoutLastFourDigits = phone.slice(0, -4).replace(/./g, '*')
      const lastFourDigits = phone.substr(phone.length - 4);
      setAsteriskedPhone(`${withoutLastFourDigits}${lastFourDigits}`)
    }
  }, [phone])

  useEffect(() => {
    if (changePhoneNumberStep === 'removed') {
      dispatch({ type: 'PHONE_NUMBER_DELETED', payload: 'input' });
      setPhone('')
    }
    if (changePhoneNumberStep === 'verified') {
      setPhone(inputPhoneNumber)
    }
    if (changePhoneNumberStep === 'input') {
      setInputPhoneNumber('')
      setCode(defaultCodeValue)
    }
  }, [changePhoneNumberStep])

  function savePhoneNumber() {
    dispatch(submitPhoneNumber(inputPhoneNumber))
  }

  function deletePhone() {
    dispatch(deletePhoneNumber(phone));
  }

  function closeModal() {
    setShowModal(false)
  }

  // TO SOLVE: the second time will have a "clogged" input
  function processInput(e, slot) {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;

    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);

    if (slot !== codeLength - 1) {
      inputs.current[slot + 1].focus();
    }
    if (newCode.every(num => num !== "")) {
      setTimeout(() => {
        const filledInCode = newCode.join('')
        dispatch(verifyPhoneNumber(filledInCode))
      }, 500)
    }
  };

  function onKeyUp(e, slot) {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
  };

  function updateRef(ref) {
    inputs.current.push(ref)
  }

  const modalProps = {
    showModal,
    setShowModal,
    modalTitle,
    setModalTitle,
    closeModal
  }

  const contactDetailsProps = {
    email,
    asteriskedEmail,
    phone,
    asteriskedPhone,
    revealEmail,
    setRevealEmail,
    revealPhone,
    setRevealPhone,
    deletePhone
  }

  const phoneNumberInputProps = {
    changePhoneNumberStep,
    inputPhoneNumber,
    setInputPhoneNumber,
    savePhoneNumber
  }

  const phoneVerificationProps = {
    code,
    processInput,
    onKeyUp,
    updateRef
  }

  return {
    modalProps,
    contactDetailsProps,
    phoneNumberInputProps,
    phoneVerificationProps
  };
}

export { useSettings };