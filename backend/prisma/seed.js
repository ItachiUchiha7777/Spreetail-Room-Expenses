const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const passwordHash = await bcrypt.hash('Password123', 10);

  // 1. Create Users
  const userNames = ['Aisha', 'Rohan', 'Priya', 'Meera', 'Sam', 'Dev', 'Kabir'];
  const users = {};

  for (const name of userNames) {
    const email = `${name.toLowerCase()}@example.com`;
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name,
        email,
        passwordHash,
      },
    });
    users[name.toLowerCase()] = user;
    console.log(`Created/Verified user: ${name} (${email})`);
  }

  // 2. Create Group
  const group = await prisma.group.create({
    data: {
      name: 'Flat 404 Shared Expenses',
      createdBy: users['aisha'].id,
    },
  });
  console.log(`Created group: "${group.name}" with ID: ${group.id}`);

  // 3. Create Group Memberships (Option A guest stint timeline)
  const memberships = [
    // Aisha (Feb 1 - active)
    { userId: users['aisha'].id, joinedAt: new Date('2026-02-01'), leftAt: null },
    // Rohan (Feb 1 - active)
    { userId: users['rohan'].id, joinedAt: new Date('2026-02-01'), leftAt: null },
    // Priya (Feb 1 - active)
    { userId: users['priya'].id, joinedAt: new Date('2026-02-01'), leftAt: null },
    // Meera (Feb 1 - Mar 31)
    { userId: users['meera'].id, joinedAt: new Date('2026-02-01'), leftAt: new Date('2026-03-31') },
    // Sam (Apr 8 - active)
    { userId: users['sam'].id, joinedAt: new Date('2026-04-08'), leftAt: null },
    // Dev (Feb 8 - Feb 8, weekend visit)
    { userId: users['dev'].id, joinedAt: new Date('2026-02-08'), leftAt: new Date('2026-02-08') },
    // Dev (Mar 8 - Mar 14, Goa trip)
    { userId: users['dev'].id, joinedAt: new Date('2026-03-08'), leftAt: new Date('2026-03-14') },
    // Kabir (Mar 11 - Mar 11, Goa parasailing guest)
    { userId: users['kabir'].id, joinedAt: new Date('2026-03-11'), leftAt: new Date('2026-03-11') },
  ];

  for (const m of memberships) {
    await prisma.groupMembership.create({
      data: {
        groupId: group.id,
        userId: m.userId,
        joinedAt: m.joinedAt,
        leftAt: m.leftAt,
      },
    });
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
