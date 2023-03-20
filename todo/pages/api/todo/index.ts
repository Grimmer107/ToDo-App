import { NextApiRequest, NextApiResponse } from "next";
import { getTodos, postTodo } from '../../../controllers/todoItem';
import { ResponseFuncs } from "../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
  
  const handleCase: ResponseFuncs = {
    GET: getTodos,
    POST: postTodo
  }

  const response = handleCase[method]

  if (response) response(req, res)
  else res.status(400).json({ error: "Invalid Request" })
}

export default handler;