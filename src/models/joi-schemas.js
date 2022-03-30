import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");
/*
export const PlaceSpec = {
    name: Joi.string().required(),
};

export const MonumentSpec = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    location: {
    lat: Joi.string().required(),
    lng: Joi.number().required()
    },
    cat: Joi.number().required(),
};
*/

export const MonumentSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Newgrange"),
    description: Joi.string().required().example("5,200 year old passage tomb located in the Boyne Valley in Ireland's Ancient East"),
    location:
      {
        lat: Joi.number().required().example(53),
        lng: Joi.number().required().example(53),
      },
    cat: Joi.string().required().example("Passage Tomb"),
    placeid: IdSpec,
  })
  .label("Monument");

export const MonumentSpecPlus = MonumentSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("MonumentPlus");

export const MonumentArraySpec = Joi.array().items(MonumentSpecPlus).label("MonumentArray");

export const PlaceSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Dublin"),
    userid: IdSpec,
    monuments: MonumentArraySpec,
  })
  .label("Place");

export const PlaceSpecPlus = PlaceSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacePlus");

export const PlaceArraySpec = Joi.array().items(PlaceSpecPlus).label("PlaceArray");
