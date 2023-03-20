import Ajv from "ajv";

const ajv = new Ajv({allErrors: true})

const Schema = {
    type: "object",
    properties: {
        _id: {type: "integer"},
        task: {type: "string"},
        completed: {type: "boolean"}
    }, 
    required: ["_id"],
    additionalProperties: true
}

const deleteValidate = ajv.compile(Schema)

export default deleteValidate;