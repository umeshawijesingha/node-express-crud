const Joi=require('joi');
const schema=Joi.object({
    id: Joi.number().integer(),
    name:Joi.string().min(3).required(),
    age:Joi.number().integer(),
}
)

module.exports=schema;