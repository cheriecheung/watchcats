import { hourlyRateOptions, nightlyRateOptions } from '../../constants';

export const general_default_values = {
    profilePic: '',
    firstName: '',
    lastName: '',
    // email: '',
    phone: '',
    address: '',
    postcode: '',
    addressProof: '',
    profileFacebook: '',
    profileInstagram: '',
    profileOther: '',
};

export const cat_sitter_default_values = {
    aboutSitter: '',
    //photos: [],
    experience: '',
    hasCat: false,
    hasMedicationSkills: false,
    hasInjectionSkills: false,
    hasCertification: false,
    hasGroomingSkills: false,
    hourlyRate: hourlyRateOptions[0],
    nightlyRate: nightlyRateOptions[0],
    unavailableDates: [],
    // emergencyName: '',
    // emergencyNumber: '',
};

// Cat owner field array data

export const oneDayObj = { date: '', startTime: '', endTime: '', };
export const overnightObj = { startDate: '', endDate: '' };

export const catObj = {
    name: '',
    age: '',
    gender: '',
    isVaccinated: '',
    isInsured: '',
    breed: '',
    medicalNeeds: '',
    persionality: '',
    favouriteTreat: '',
    photo: '',
};

export const cat_owner_default_values = {
    aboutMe: '',
    // photos: [],
    bookingOneDay: [oneDayObj],
    bookingOvernight: [overnightObj],
    cat: [catObj],
    catsDescription: '',
};

