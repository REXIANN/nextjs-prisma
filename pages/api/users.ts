import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

import client from "@/libs/server/client";

import { GET, POST, DELETE } from "@/libs/server/constatns";

async function getUser({ id }: { id: number }) {

  const user = await client.user.findUnique({ where: { id } });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case POST: {
      const updateUser = await client.user.upsert({
        where: {},
        create: { name: req.body.name },
        update: { name: req.body.name },
      });

      return res.status(200).send(updateUser);
    }
    case DELETE: {
      const deleteUser = await client.user.delete({
        where: {
          id: req.body.id,
        },
      });

      return res.status(200).send(deleteUser);
    }
    case GET:
    default: {
      const users = await client.user.findMany();

      return res.status(200).send(users);
    }
  }
}

export default handler;