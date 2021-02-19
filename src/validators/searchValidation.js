const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  index: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      search: Joi.string().required().min(3),
    }),
  }),
};
