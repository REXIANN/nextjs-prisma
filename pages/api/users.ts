import { NextApiRequest, NextApiResponse } from "next";

import client from "../../libs/server/client";

import { GET, POST, DELETE } from "../../libs/server/constants";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case POST: {
      const { name, email, phone: phoneNumberInString } = req.body;
      const phone = +phoneNumberInString;

      const updateUser = await client.user.upsert({
        where: { email },
        create: { name, email, phone },
        update: { name, email, phone },
      });

      res.send(updateUser);
      res.end();
      client.$disconnect();
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
      client.$disconnect();
      break;
    }
    case GET:
    default: {
      const users = await client.user.findMany();

      res.send(users);
      res.end();
      client.$disconnect();
    }
  }
}

export default handler;