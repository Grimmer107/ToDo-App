import Ajv from "ajv";

const ajv = new Ajv({allErrors: true})

const Schema = {
    type: "object",
    properties: {
        _id: {type: "string"},
        name: {type: "string"},
        todos: {type: "array"},
        status: {type: "string"}
    }, 
    required: ["name"],
    additionalProperties: true
}

const postValidate = ajv.compile(Schema)

export default postValidate;
