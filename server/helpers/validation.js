const Joi = require('@hapi/joi');
const JoiDate = require('@hapi/joi-date')

const nameType = Joi.string().alphanum().max(30).required();
const textAreaType = Joi.string().max(2500).required(); // characters, not words
const textType = Joi.string().alphanum().max(100).required();

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

