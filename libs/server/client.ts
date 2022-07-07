import { PrismaClient } from "@prisma/client";

const PrismaClientClass = (function () {
  let prismaClient: PrismaClient;

  function init() {
    return new PrismaClient({ log: ["query"] });
  }

  return function () {
    if (prismaClient) {
      return prismaClient;
    }
    prismaClient = init();
    return prismaClient;
  };
})
();

export default PrismaClientClass();
