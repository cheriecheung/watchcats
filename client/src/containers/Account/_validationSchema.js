import * as yup from 'yup';

const defaultError = () => "Required field";

export const general_schema = yup.object().shape({
    firstName: yup.string().required(defaultError),
    lastName: yup.string().required(defaultError),
    // matches() for phone
    phone: yup.string().required(defaultError),
    address: yup.string().required(defaultError),
    postcode: yup.string().required("Invalid dutch passport").matches(/^\d{4}[a-z]{2}$/i),
})

// check shape object format
const rateObjSchema = { label: yup.string(), value: yup.string() }

export const cat_sitter_schema = yup.object().shape({
    aboutSitter: yup.string().required(defaultError),
    experience: yup.string().required(defaultError),
    hasCat: yup.bool(),
    hasMedicationSkills: yup.bool(),
    hasInjectionSkills: yup.bool(),
    hasCertification: yup.bool(),
    hasGroomingSkills: yup.bool(),
    hourlyRate: yup.object().shape(rateObjSchema).required(defaultError),
    nightlyRate: yup.object().shape(rateObjSchema).required(defaultError),
    // date string?
    unavailableDates: yup.array(),
})

// startTime and startDate cant be after endTime and endDate

const oneDayObjSchema = yup.object().shape({
    // date: yup.string().required(defaultError),
    // startTime: yup.string().required(defaultError),
    // endTime: yup.string().required(defaultError)

    date: yup.string().when(['startTime', 'endTime'], {
        is: (startTime, endTime) => startTime || endTime,
        then: yup.string().min(1, defaultError)
    }),
    startTime: yup.string().when(['date', 'endTime'], {
        is: (date, endTime) => date || endTime,
        then: yup.string().required(defaultError)
    }),
    endTime: yup.string().when(['date', 'startTime'], {
        is: (date, startTime) => date || startTime,
        then: yup.string().required(defaultError)
    }),
}, [['startTime', 'endTime'], ['date', 'endTime'], ['date', 'startTime']])

const overnightObjSchema = yup.object().shape({
    startDate: yup.string().when('endDate', {
        is: endDate => endDate,
        then: yup.string().min(1, defaultError)
    }),
    endDate: yup.string().when('startDate', {
        is: startDate => startDate,
        then: yup.string().min(1, defaultError)
    })
}, [['startDate', 'endDate']])

export const cat_owner_schema = yup.object().shape({
    aboutMe: yup.string().required(defaultError),
    bookingOneDay: yup.array().of(oneDayObjSchema),
    bookingOvernight: yup.array().of(overnightObjSchema),
})
