import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // ─── 1. SubCast (5 records) ───
  const subCasts = [
    { name: 'Patel' },
    { name: 'Shah' },
    { name: 'Mehta' },
    { name: 'Desai' },
    { name: 'Joshi' },
  ];

  for (const sc of subCasts) {
    await prisma.subCast.upsert({
      where: { id: 0 }, // won't match, forces create
      update: {},
      create: sc,
    });
  }
  console.log('✅ SubCast: 5 records inserted');

  // ─── 2. States (5 records) ───
  const states = [
    { name: 'Gujarat' },
    { name: 'Maharashtra' },
    { name: 'Rajasthan' },
    { name: 'Madhya Pradesh' },
    { name: 'Uttar Pradesh' },
  ];

  for (const st of states) {
    await prisma.states.upsert({
      where: { id: 0 },
      update: {},
      create: st,
    });
  }
  console.log('✅ States: 5 records inserted');

  // ─── 3. SubCommunity (5 records) ───
  const subCommunities = [
    { name: 'Kadva Patidar' },
    { name: 'Leva Patidar' },
    { name: 'Anavil Brahmin' },
    { name: 'Soni' },
    { name: 'Brahmin' },
  ];

  for (const sc of subCommunities) {
    await prisma.subCommunity.upsert({
      where: { id: 0 },
      update: {},
      create: sc,
    });
  }
  console.log('✅ SubCommunity: 5 records inserted');

  // ─── 4. LocalCommunity (5 records, each linked to a SubCommunity) ───
  // Fetch the created SubCommunities to link LocalCommunities
  const createdSubCommunities = await prisma.subCommunity.findMany({
    orderBy: { id: 'asc' },
    take: 5,
  });

  const localCommunities = [
    { name: 'Ahmedabad Kadva', sub_community_id: createdSubCommunities[0]?.id ?? 1 },
    { name: 'Surat Leva', sub_community_id: createdSubCommunities[1]?.id ?? 1 },
    { name: 'Vadodara Anavil', sub_community_id: createdSubCommunities[2]?.id ?? 1 },
    { name: 'Rajkot Soni', sub_community_id: createdSubCommunities[3]?.id ?? 1 },
    { name: 'Gandhinagar Brahmin', sub_community_id: createdSubCommunities[4]?.id ?? 1 },
  ];

  for (const lc of localCommunities) {
    await prisma.localCommunity.upsert({
      where: { id: 0 },
      update: {},
      create: lc,
    });
  }
  console.log('✅ LocalCommunity: 5 records inserted');

  // ─── 5. City (5 records, each linked to a State) ───
  // Fetch the created States to link Cities
  const createdStates = await prisma.states.findMany({
    orderBy: { id: 'asc' },
    take: 5,
  });

  const cities = [
    { name: 'Ahmedabad', states_id: createdStates[0]?.id ?? 1 },
    { name: 'Mumbai', states_id: createdStates[1]?.id ?? 1 },
    { name: 'Jaipur', states_id: createdStates[2]?.id ?? 1 },
    { name: 'Indore', states_id: createdStates[3]?.id ?? 1 },
    { name: 'Lucknow', states_id: createdStates[4]?.id ?? 1 },
  ];

  for (const city of cities) {
    await prisma.city.upsert({
      where: { id: 0 },
      update: {},
      create: city,
    });
  }
  console.log('✅ City: 5 records inserted');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
