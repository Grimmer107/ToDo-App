import Ajv from "ajv";

const ajv = new Ajv({allErrors: true})

const Schema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            _id: {type: "string"},
            task: {type: "string"},
            completed: {type: "boolean"}
        }, 
        required: ["_id", "task", "completed"]
    }
}

const getTodosValidate = ajv.compile(Schema)

export default getTodosValidate;
