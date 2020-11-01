const Joi = require('@hapi/joi');
const JoiDate = require('@hapi/joi-date')

const nameType = Joi.string().max(30).required();
const textAreaType = Joi.string().max(2500).required(); // characters, not words
const textType = Joi.string().max(100).required();
const optionalTextType = Joi.string().optional().allow('').max(100);

module.exports = {
  registerValidation: (data) => {
    const schema = Joi.object({
      name: nameType,
      email: Joi.string().min(6).required().email(), // more specific logic for email
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
  },

  loginValidation: (data) => {
    const schema = Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
  },

  // settings
  phoneNumberValidation: (data) => {
    const schema = Joi.object({
      phone: Joi.string().required(), // regex for phone number
    })
    return schema.validate(data);
  },

  changePasswordValidation: (data) => {
    const schema = Joi.object({
      currentPassword: Joi.string().min(8).required(),
      newPassword: Joi.string().min(8).disallow(Joi.ref('currentPassword')).required(),
      newPasswordRepeat: Joi.any().valid(Joi.ref('newPassword')).required(),
    })
    return schema.validate(data);
  },

  // personal info
  personalDataValidation: (data) => {
    const schema = Joi.object({
      address: textType,
      addressProof: Joi.object(),
      firstName: nameType,
      lastName: nameType,
      postcode: Joi.string().required().regex(/^\d{4}[a-z]{2}$/i),
      profileFacebook: optionalTextType,
      profileInstagram: optionalTextType,
      profileOther: optionalTextType
    })
    return schema.validate(data);
  },

  catSitterValidation: (data) => {
    const schema = Joi.object({
      hourlyRate: Joi.number().integer().required(), // min and max
      nightlyRate: Joi.number().integer().required(), // min and max
      unavailableDates: Joi.array().items(Joi.extend(JoiDate).date().format('YYYY-MM-DD')),
      hasGroomingSkills: Joi.boolean(),
      hasCertification: Joi.boolean(),
      hasInjectionSkills: Joi.boolean(),
      hasMedicationSkills: Joi.boolean(),
      hasVolunteered: Joi.boolean(),
      hasCat: Joi.boolean(),
      experience: textAreaType,
      aboutSitter: textAreaType,
    });
    return schema.validate(data);
  },

  catOwnerValidation: (data) => {
    const schema = Joi.object({
      aboutMe: textAreaType,
      bookingOneDay: Joi.array().max(2).items({
        date: Joi.extend(JoiDate).date().format('YYYY-MM-DD').required(),
        startTime: Joi.extend(JoiDate).date().format('HH:ss').required(),
        endTime: Joi.extend(JoiDate).date().format('HH:ss').greater(Joi.ref('startTime')).required()
      }),
      bookingOvernight: Joi.array().max(2).items({
        startDate: Joi.extend(JoiDate).date().format('YYYY-MM-DD').required(),
        endDate: Joi.extend(JoiDate).date().format('YYYY-MM-DD').greater(Joi.ref('startDate')).required(),
      }),
      cat: Joi.array().min(1).max(5).items({
        name: nameType,
        age: Joi.number().integer().min(1).max(20).required(),
        breed: Joi.number().integer().required(), // change to string?
        favouriteTreat: textType,
        gender: Joi.string().valid('M', 'F').required(),
        isInsured: Joi.boolean().required(),
        isVaccinated: Joi.boolean().required(),
        medicalNeeds: Joi.array().items(Joi.string().valid('pill', 'injection')),
        personality: Joi.number().integer().required(), // change to string?
        photo: Joi.object(),
      }),
      catsDescription: textAreaType,
    })
    return schema.validate(data);
  }
}

