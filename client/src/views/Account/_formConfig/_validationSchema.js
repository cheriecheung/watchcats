import * as yup from 'yup';
import { isDate } from "date-fns";
import translationKeys from '../../../constants/translationKeys'

const {
    field_required,
    postcode_format,
    date_order,
    time_order,
    select_gender,
    select_option,
    same_old_password,
    new_passwords_unmatched
} = translationKeys

// wording limit

// React Select schema
const reactSelectSchema = {
    value: yup.string().required(),
    label: yup.string().required()
}
const rateObjSchema = { label: yup.string(), value: yup.string() }

function parseDateString(value, originalValue) {
    if (!originalValue) return null;

    const parsedDate = isDate(originalValue)
        ? originalValue
        : new Date(originalValue);

    return parsedDate;
}

// ----- Reset Password Schema ----- //
//https://github.com/jquense/yup/issues/345
//https://www.nuomiphp.com/eplan/en/34699.
export const reset_password_schema = yup.object().shape({
    // passwords must match, and fulfill password requirements
    currentPassword: yup.string().required(field_required),
    newPassword: yup.string()
        .required(field_required)
        .notOneOf([yup.ref('currentPassword'), null], same_old_password),
    newPasswordRepeat: yup.string()
        .required(field_required)
        .oneOf([yup.ref('newPassword'), null], new_passwords_unmatched)
})

// ----- Personal Schema ----- //

export const personal_schema = yup.object().shape({
    // // max length
    profilePicture: yup.mixed().required(field_required),
    firstName: yup.string().required(field_required),
    // max length
    lastName: yup.string().required(field_required),
    // max length
    address: yup.string().required(field_required),
    postcode: yup.string()
        .required(postcode_format)
        .matches(/^\d{4}[a-z]{2}$/i, postcode_format),
})

// ----- Cat Owner Schema ----- //

export const cat_sitter_schema = yup.object().shape({
    // max length
    aboutSitter: yup.string().required(field_required),
    // max length
    experience: yup.string().required(field_required),
    hasCat: yup.bool(),
    hasMedicationSkills: yup.bool(),
    hasInjectionSkills: yup.bool(),
    hasCertification: yup.bool(),
    hasGroomingSkills: yup.bool(),
    // min rate and max rate!
    hourlyRate: yup.object()
        .shape(rateObjSchema)
        .required(field_required),
    nightlyRate: yup.object()
        .shape(rateObjSchema)
        .required(field_required),
    // date string?
    unavailableDates: yup.array(),
})

// ----- Cat Owner Schema ----- //

const oneDayObjSchema = yup.object().shape({
    date: yup.mixed()
        .nullable()
        .when(['startTime', 'endTime'], {
            is: (startTime, endTime) => startTime || endTime,
            // change to date type
            then: yup.string().min(1, field_required)
        }),

    startTime: yup.mixed()
        .transform(parseDateString)
        .nullable()
        .when(['date', 'endTime'], {
            is: (date, endTime) => date || endTime,
            then: yup.date()
                .transform(parseDateString)
                .required(field_required)
                .typeError()
            // type error with start time when date is not filled in
        }),
    endTime: yup.mixed()
        .nullable()
        .when(['date', 'startTime'], {
            is: (date, startTime) => date || startTime,
            then: yup.date()
                .transform(parseDateString)
                .required(field_required)
                // when startTime comes back from db, it is no longer a date form, hence .min type error happens
                // cannot be same time
                .min(yup.ref('startTime'), time_order)
        }),
}, [['startTime', 'endTime'],
['date', 'endTime'],
['date', 'startTime']
])

const overnightObjSchema = yup.object().shape({
    startDate: yup.mixed()
        .transform(parseDateString)
        .nullable()
        .when('endDate', {
            is: endDate => endDate,
            then: yup.date()
                .transform(parseDateString)
                .required(field_required)

        }),
    endDate: yup.mixed()
        .nullable()
        .when('startDate', {
            is: startDate => startDate,
            then: yup.date()
                .transform(parseDateString)
                // cannot be the same date
                .min(yup.ref('startDate'), date_order)
                .required(field_required)
        })
}, [['startDate', 'endDate']])

const catObjSchema = yup.object().shape({
    // max length
    name: yup.string().required(field_required),
    // min age and max age
    age: yup.number()
        .positive()
        .integer()
        .required(field_required)
        .typeError(field_required),
    // m or f
    gender: yup.string().required(select_gender),
    // pill and injection
    needsInjection: yup.bool(),
    needsPill: yup.bool(),
    isVaccinated: yup.boolean().typeError(select_option),
    isInsured: yup.boolean().typeError(select_option),
    breed: yup.object()
        .shape(reactSelectSchema)
        .typeError(select_option),
    personality: yup.object()
        .shape(reactSelectSchema)
        .typeError(select_option),
    // max length
    favouriteTreat: yup.string().required(field_required),
    photo: yup.mixed().required(field_required)

    // photo: yup.object().nullable().shape({
    //     name: yup.string().required(),
    //     file: yup.object().nullable()
    //     // file: yup.object().shape({
    //     //     name: yup.string().required()
    //     // }).label('File').required(),
    // }).required(field_required)
})

export const cat_owner_schema = yup.object().shape({
    aboutMe: yup.string().required(field_required),
    bookingOneDay: yup.array().of(oneDayObjSchema),
    bookingOvernight: yup.array().of(overnightObjSchema),
    cat: yup.array().of(catObjSchema),
    catsDescription: yup.string().required(field_required)
})
