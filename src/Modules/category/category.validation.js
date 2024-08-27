import Joy from "joi"

const addcategoryValidation = Joy.object({
    name:Joy.string().min(1).max(100).required(),
    image:Joy.object({
        fieldname:Joy.string().required(),
        originalname:Joy.string().required(),
        encoding:Joy.string().required(),
        mimetype:Joy.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/jpg').required(),
        destination:Joy.string().required(),
        filename:Joy.string().required(),
        path:Joy.string().required(),
        size:Joy.number().max(5242880).required()
    }).required(),


})

export{
    addcategoryValidation
}