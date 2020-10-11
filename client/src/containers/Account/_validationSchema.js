import * as yup from 'yup';
import { isDate } from "date-fns";

const defaultError = () => "Required field";

// ----- General Schema ----- //

const postcodeError = () => "Invalid Dutch postcode"

export const general_schema = yup.object().shape({
    firstName: yup.string().required(defaultError),
    lastName: yup.string().required(defaultError),
    // matches() for phone
    phone: yup.string().required(defaultError),
    address: yup.string().required(defaultError),
    postcode: yup.string().required(postcodeError).matches(/^\d{4}[a-z]{2}$/i),
})

// ----- Cat Owner Schema ----- //

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

// ----- Cat Owner Schema ----- //

const startEndTimeError = () => "End time must be after start time"

function parseDateString(value, originalValue) {
    if (!originalValue) return null;

    const parsedDate = isDate(originalValue)
        ? originalValue
        : new Date(originalValue);

    console.log({ value, originalValue, isDate: isDate(originalValue) })

    return parsedDate;
}

const oneDayObjSchema = yup.object().shape({
    date: yup.mixed().nullable().when(['startTime', 'endTime'], {
        is: (startTime, endTime) => startTime || endTime,
        // change to date type
        then: yup.string().min(1, defaultError)
    }),
    startTime: yup.mixed().nullable().when(['date', 'endTime'], {
        is: (date, endTime) => date || endTime,
        then: yup.date()
            .transform(parseDateString)
            .required(defaultError)
            .typeError()
        // type error with start time when date is not filled in
    }),
    endTime: yup.mixed().nullable().when(['date', 'startTime'], {
        is: (date, startTime) => date || startTime,
        then: yup.date()
            .transform(parseDateString)
            .min(yup.ref('startTime'), startEndTimeError)
            .required(defaultError)
    }),
}, [['startTime', 'endTime'], ['date', 'endTime'], ['date', 'startTime']])


const overnightObjSchema = yup.object().shape({
    // is now comparing dates, validate fine when only one is filled.
    // able to save date properly when all fields filled
    // but error is thrown at two emptied fields when should be allowed
    // startDate: yup.date().transform(parseDateString).when('endDate', {
    //     is: endDate => endDate,
    //     then: yup.date().transform(parseDateString),
    // }),
    // endDate: yup.date().transform(parseDateString).when('startDate', {
    //     is: startDate => startDate,
    //     then: yup.date().transform(parseDateString),
    // })

    // validation and save all work
    // but is comparing date string, thus cannot compare dates
    // startDate: yup.string().when('endDate', {
    //     is: endDate => endDate,
    //     then: yup.string().min(1, defaultError)
    // }),
    // endDate: yup.string().when('startDate', {
    //     is: startDate => startDate,
    //     then: yup.string().min(1, defaultError)
    // })
}, [['startDate', 'endDate']])

export const cat_owner_schema = yup.object().shape({
    aboutMe: yup.string().required(defaultError),
    bookingOneDay: yup.array().of(oneDayObjSchema),
    bookingOvernight: yup.array().of(overnightObjSchema),
})
