import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

export const PlaceSpec = {
    name: Joi.string().required(),
};

export const MonumentSpec = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    cat: Joi.string().required(),
}