import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("topSecret1990%").required().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required().regex(/^[A-Z][a-z]{2,}$/),
  lastName: Joi.string().example("Simpson").required().regex(/^[A-Z][a-z]{2,}$/),
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
export const CategorySpec = Joi.object()
  .keys({
    _id: IdSpec,
    __v: Joi.number(),
    typeMonument: Joi.string().required().example("cairn"),
  })
  .label("Category");

export const MonumentSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Newgrange"),
    description: Joi.string().required().example("5,200 year old passage tomb located in the Boyne Valley in Irelands Ancient East"),
    location:
      {
        lat: Joi.number().required().example(53),
        lng: Joi.number().required().example(53),
      },
    category: CategorySpec,
    placeid: IdSpec,
  })
  .label("Monument");

 

export const MonumentSpecPlus = MonumentSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("MonumentPlus");

export const MonumentImage = Joi.object()
.keys({
  img: Joi.string().required(),
  _id: MonumentSpecPlus,
})

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

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
