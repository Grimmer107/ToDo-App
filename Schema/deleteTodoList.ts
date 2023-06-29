import Ajv from "ajv";

const ajv = new Ajv({allErrors: true})

const Schema = {
    type: "object",
    properties: {
        _id: {type: "string"},
    }, 
    required: ["_id"],
    additionalProperties: true
}

const deleteListValidate = ajv.compile(Schema)

export default deleteListValidate;
