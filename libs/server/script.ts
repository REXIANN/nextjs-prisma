import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = prisma.user.create({
    data: {
      name: "RexiaN",
    },
  });
  console.log(user);
}

main().then().catch(e => {
  console.log(e);
}).finally(async () => {
  await prisma.$disconnect();
});
