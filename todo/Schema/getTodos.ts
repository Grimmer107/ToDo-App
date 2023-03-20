import Ajv from "ajv";

const ajv = new Ajv({allErrors: true})

// const ItemSchema = {
//     type: "object",
//     properties: {
//         _id: {type: "integer"},
//         task: {type: "string"},
//         completed: {type: "boolean"}
//     }, 
//     required: ["_id", "task", "completed"]
// }

const Schema = {
    type: "array",
    items: {
        type: "object",
        properties: {
            _id: {type: "integer"},
            task: {type: "string"},
            completed: {type: "boolean"}
        }, 
        required: ["_id", "task", "completed"]
    }
}

const getTodosValidate = ajv.compile(Schema)

export default getTodosValidate;
