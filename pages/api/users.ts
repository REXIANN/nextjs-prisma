import { NextApiRequest, NextApiResponse } from "next";

import client from "../../libs/server/client";

import { GET, POST, DELETE } from "../../libs/server/constants";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case POST: {
      const { name, email, phone: phoneNumberInString, age: ageInString } = req.body;
      const phone = phoneNumberInString === "" ? null : Number(phoneNumberInString);
      const age = Number(ageInString);

      const updateUser = await client.user.upsert({
        where: { email },
        create: { name, email, phone, age },
        update: { name, email, phone, age },
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