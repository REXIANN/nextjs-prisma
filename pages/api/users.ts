import { NextApiRequest, NextApiResponse } from "next";

import client from "../../libs/server/client";

import { GET, POST, DELETE } from "../../libs/server/constants";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("method", req.method);
  switch (req.method) {
    case POST: {
      console.log("body", req.body);
      const { name, email, phone: phoneNumberInString } = req.body;
      const phone = +phoneNumberInString;

      const updateUser = await client.user.upsert({
        where: { email },
        create: { name, email, phone },
        update: { name, email, phone },
      });

      res.send(updateUser);
      res.end();
      break;
    }
    case DELETE: {
      const deleteUser = await client.user.delete({
        where: {
          email: req.body.email,
        },
      });

      res.send(deleteUser);
      res.end();
      break;
    }
    case GET:
    default: {
      const users = await client.user.findMany();

      res.send(users);
      res.end();
    }
  }
}

export default handler;