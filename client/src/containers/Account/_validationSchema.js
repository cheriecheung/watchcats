import * as yup from 'yup';
import { isDate } from "date-fns";

// wording limit

const defaultError = () => "Required field";

// React Select schema
const reactSelectSchema = {
    value: yup.string().required(),
    label: yup.string().required()
}

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

const timeOrderError = () => "End time must be after start time"
const dateOrderError = () => "End date must be after start date"
const genderSelectError = () => "Select a gender"

function parseDateString(value, originalValue) {
    console.log({ value, originalValue })

    if (!originalValue) return null;

    const parsedDate = isDate(originalValue)
        ? originalValue
        : new Date(originalValue);

    return parsedDate;
}

const oneDayObjSchema = yup.object().shape({
    date: yup.mixed().nullable().when(['startTime', 'endTime'], {
        is: (startTime, endTime) => startTime || endTime,
        // change to date type
        then: yup.string().min(1, defaultError)
    }),

    startTime: yup.mixed().transform(parseDateString).nullable().when(['date', 'endTime'], {
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
            .required(defaultError)
            // when startTime comes back from db, it is no longer a date form, hence .min type error happens
            .min(yup.ref('startTime'), timeOrderError)
    }),
}, [['startTime', 'endTime'], ['date', 'endTime'], ['date', 'startTime']])


const overnightObjSchema = yup.object().shape({
    startDate: yup.mixed().transform(parseDateString).nullable().when('endDate', {
        is: endDate => endDate,
        then: yup.date()
            .transform(parseDateString)
            .required(defaultError)

    }),
    endDate: yup.mixed().nullable().when('startDate', {
        is: startDate => startDate,
        then: yup.date()
            .transform(parseDateString)
            // cannot be the same date
            .min(yup.ref('startDate'), dateOrderError)
            .required(defaultError)
    })
}, [['startDate', 'endDate']])

const catObjSchema = yup.object().shape({
    name: yup.string().required(defaultError),
    age: yup.number().positive().integer().required(defaultError).typeError('Must be a number'),
    gender: yup.string().required(genderSelectError),
    isVaccinated: yup.boolean().required(defaultError),
    isInsured: yup.boolean().required(defaultError),
    breed: yup.object().shape(reactSelectSchema).required(defaultError),
    medicalNeeds: yup.array().of(yup.string()),
    personality: yup.object().shape(reactSelectSchema).required(defaultError),
    favouriteTreat: yup.string().required(defaultError),
})

export const cat_owner_schema = yup.object().shape({
    aboutMe: yup.string().required(defaultError),
    bookingOneDay: yup.array().of(oneDayObjSchema),
    bookingOvernight: yup.array().of(overnightObjSchema),
    cat: yup.array().of(catObjSchema),
    catsDescription: yup.string().required(defaultError)
})
