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

  // ─── 6. BusinessCategory (15 records) ───
  const businessCategories = [
    { name: 'Agriculture' },
    { name: 'Dairy & Poultry' },
    { name: 'Education & Coaching' },
    { name: 'Textile & Garments' },
    { name: 'Chemicals & Fertilizers' },
    { name: 'Food & Beverages' },
    { name: 'Real Estate & Construction' },
    { name: 'Healthcare & Pharmacy' },
    { name: 'Automobile & Transport' },
    { name: 'Electronics & Appliances' },
    { name: 'Jewellery & Ornaments' },
    { name: 'Hotels & Restaurants' },
    { name: 'Finance & Insurance' },
    { name: 'Software & IT Services' },
    { name: 'Retail & Wholesale' },
  ];

  for (const bc of businessCategories) {
    await prisma.businessCategory.create({
      data: bc,
    });
  }
  console.log('✅ BusinessCategory: 15 records inserted');

  // ─── 7. Occupation (15 records) ───
  const occupations = [
    { name: 'Farmer' },
    { name: 'Business Owner' },
    { name: 'Government Employee' },
    { name: 'Private Employee' },
    { name: 'Doctor' },
    { name: 'Engineer' },
    { name: 'Teacher' },
    { name: 'Lawyer' },
    { name: 'Accountant' },
    { name: 'Army / Defense' },
    { name: 'Police' },
    { name: 'Banker' },
    { name: 'Software Developer' },
    { name: 'Pharmacist' },
    { name: 'Homemaker' },
  ];

  for (const occ of occupations) {
    await prisma.occupation.create({
      data: occ,
    });
  }
  console.log('✅ Occupation: 15 records inserted');

  // ─── 8. Committee (15 records) ───
  const committees = [
    { name: 'Youth Committee' },
    { name: 'Education Committee' },
    { name: 'Marriage Bureau Committee' },
    { name: 'Religious & Temple Committee' },
    { name: 'Charity & Donation Committee' },
    { name: 'Sports Committee' },
    { name: 'Women Empowerment Committee' },
    { name: 'Senior Citizens Welfare Committee' },
    { name: 'Medical & Health Camp Committee' },
    { name: 'Cultural Programs Committee' },
    { name: 'Infrastructure & Development Committee' },
    { name: 'Student Sponsorship Committee' },
    { name: 'Blood Donation Committee' },
    { name: 'Disaster Relief Committee' },
    { name: 'Election & Membership Committee' },
  ];

  for (const c of committees) {
    await prisma.committee.create({
      data: c,
    });
  }
  console.log('✅ Committee: 15 records inserted');

  // ─── 9. Designation (15 records) ───
  const designations = [
    { name: 'President' },
    { name: 'Vice President' },
    { name: 'Secretary' },
    { name: 'Joint Secretary' },
    { name: 'Treasurer' },
    { name: 'Joint Treasurer' },
    { name: 'Executive Member' },
    { name: 'General Member' },
    { name: 'Chairman' },
    { name: 'Vice Chairman' },
    { name: 'Coordinator' },
    { name: 'Advisor' },
    { name: 'Auditor' },
    { name: 'Public Relations Officer' },
    { name: 'Trustee' },
  ];

  for (const d of designations) {
    await prisma.designation.create({
      data: d,
    });
  }
  console.log('✅ Designation: 15 records inserted');

  // ─── 10. CurrentActivity (15 records) ───
  const currentActivities = [
    { name: 'Studying' },
    { name: 'Employed' },
    { name: 'Self-Employed' },
    { name: 'Business' },
    { name: 'Farming' },
    { name: 'Retired' },
    { name: 'Homemaker' },
    { name: 'Looking for Job' },
    { name: 'Higher Education (Post-Graduation)' },
    { name: 'Professional Course' },
    { name: 'Government Job' },
    { name: 'Private Job' },
    { name: 'Army Service' },
    { name: 'Freelancing' },
    { name: 'Social Work' },
  ];

  for (const ca of currentActivities) {
    await prisma.currentActivity.create({
      data: ca,
    });
  }
  console.log('✅ CurrentActivity: 15 records inserted');

  // ─── 11. Education (15 records) ───
  const educations = [
    { name: 'No Formal Education' },
    { name: 'Primary (1-5)' },
    { name: 'Secondary (6-10)' },
    { name: 'High School (12)' },
    { name: 'Diploma' },
    { name: 'ITI' },
    { name: "Bachelor's Degree" },
    { name: "Master's Degree" },
    { name: 'MBA' },
    { name: 'Engineering (B.E./B.Tech)' },
    { name: 'Medical (MBBS/MD)' },
    { name: 'Law (LLB)' },
    { name: 'PhD / Research' },
    { name: 'Commerce (B.Com/M.Com/CA)' },
    { name: 'Other' },
  ];

  for (const e of educations) {
    await prisma.education.create({
      data: e,
    });
  }
  console.log('✅ Education: 15 records inserted');

  // ─── 12. Relations (15 records) ───
  const relations = [
    { name: 'Father' },
    { name: 'Mother' },
    { name: 'Brother' },
    { name: 'Sister' },
    { name: 'Son' },
    { name: 'Daughter' },
    { name: 'Grandfather' },
    { name: 'Grandmother' },
    { name: 'Uncle' },
    { name: 'Aunt' },
    { name: 'Cousin' },
    { name: 'Nephew' },
    { name: 'Niece' },
    { name: 'Father-in-Law' },
    { name: 'Mother-in-Law' },
  ];

  for (const r of relations) {
    await prisma.relations.create({
      data: r,
    });
  }
  console.log('✅ Relations: 15 records inserted');

  // ─── 13. Gotra (15 records) ───
  const gotras = [
    { name: 'Kashyap' },
    { name: 'Vashishtha' },
    { name: 'Bhardwaj' },
    { name: 'Atri' },
    { name: 'Gautam' },
    { name: 'Jamdagni' },
    { name: 'Vishwamitra' },
    { name: 'Shandilya' },
    { name: 'Parashar' },
    { name: 'Bhrigu' },
    { name: 'Durvasa' },
    { name: 'Agastya' },
    { name: 'Lodh' },
    { name: 'Kashyap Muni' },
    { name: 'Modd' },
  ];

  for (const g of gotras) {
    await prisma.gotra.create({
      data: g,
    });
  }
  console.log('✅ Gotra: 15 records inserted');

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
