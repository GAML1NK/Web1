const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categories = [
    "Gömlek",
    "Tişört",
    "EşofmanAltı",
    "EşofmanÜstü",
    "Kazak",
    "Şort"
  ];
  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }
  console.log("Kategoriler eklendi!");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
