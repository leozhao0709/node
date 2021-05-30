import Joi from 'joi';

const schema = Joi.object().keys({
  name: Joi.string().min(5).max(25).required().messages({
    'string.min': 'at least 5',
  }),
});

console.log(schema.validate({ name: 'asd' }).error?.message);
