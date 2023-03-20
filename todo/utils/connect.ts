import mongoose from "mongoose"

const { DATABASE_URL } = process.env

export const connect = async () => {
  const conn = await mongoose.connect(DATABASE_URL as string)
    .catch(err => console.log(err))
  console.log("Mongoose Connection Established")

  const TodoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean,
  })

  const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    lists: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List',
    }
  })

  const ListSchema = new mongoose.Schema({
    todos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
    }]
  })

  const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema)
  const User = mongoose.models.User || mongoose.model("User", UserSchema)
  const List = mongoose.models.List || mongoose.model("List", ListSchema)
  return { conn, Todo, User, List }
}