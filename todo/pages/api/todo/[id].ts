import { NextApiRequest, NextApiResponse } from "next"
import { getTodo, deleteTodo, markCompleted } from '../../../controllers/todoItem'
import { ResponseFuncs } from "../../../utils/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  const handleCase: ResponseFuncs = {
    GET: getTodo,
    DELETE: deleteTodo, 
    PUT: markCompleted
  }

  const response = handleCase[method]

  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler