// ── Default Umrah Steps ────────────────────────────────────
export const defaultUmrahItems = [
  {
    id: "niat_ihram",
    label: "Niat Ihram",
    description: "Make the intention for Umrah and wear the Ihram garments",
  },
  {
    id: "miqat",
    label: "Enter from Miqat",
    description: "Cross the Miqat boundary while in the state of Ihram",
  },
  {
    id: "talbiyah",
    label: "Recite Talbiyah",
    description: 'Recite "Labbayk Allahumma Labbayk" continuously until Tawaf',
  },
  {
    id: "enter_masjid",
    label: "Enter Masjid al-Haram",
    description: "Enter with right foot, recite dua upon entering the mosque",
  },
  {
    id: "first_sight_kaaba",
    label: "First Sight of Kaabah",
    description:
      "Make dua when you first see the Kaabah — this is a blessed moment",
  },
  {
    id: "tawaf",
    label: "Perform Tawaf",
    description:
      "Circumambulate the Kaabah 7 times counter-clockwise starting from Hajar Aswad",
  },
  {
    id: "maqam_ibrahim",
    label: "Pray at Maqam Ibrahim",
    description: "Pray 2 rakaat behind Maqam Ibrahim after completing Tawaf",
  },
  {
    id: "zamzam",
    label: "Drink Zamzam Water",
    description: "Drink Zamzam water facing the Kaabah and make dua",
  },
  {
    id: "saie",
    label: "Perform Saie",
    description: "Walk 7 times between Safa and Marwah, starting at Safa",
  },
  {
    id: "tahallul",
    label: "Tahallul (Halq/Qasr)",
    description:
      "Shave or cut hair to exit the state of Ihram — Umrah is complete!",
  },
];

// ── Default Packing Items ──────────────────────────────────
export const defaultPackingItems = [
  // Ihram
  {
    id: "ihram_cloth",
    label: "Ihram Garments (x2)",
    description: "Two sets of white unstitched cloth for men",
    category: "ihram",
  },
  {
    id: "ihram_belt",
    label: "Ihram Belt/Safety Pins",
    description: "To secure the Ihram cloth",
    category: "ihram",
  },
  {
    id: "ihram_sandals",
    label: "Sandals/Flip Flops",
    description: "Open-toe sandals that do not cover the ankles",
    category: "ihram",
  },

  // Documents
  {
    id: "passport",
    label: "Passport",
    description: "Valid passport with at least 6 months validity",
    category: "documents",
  },
  {
    id: "visa",
    label: "Umrah Visa",
    description: "Printed Umrah visa and booking confirmation",
    category: "documents",
  },
  {
    id: "tickets",
    label: "Flight Tickets",
    description: "Printed or digital copies of flight tickets",
    category: "documents",
  },
  {
    id: "hotel_booking",
    label: "Hotel Booking",
    description: "Hotel confirmation for Makkah and Madinah",
    category: "documents",
  },
  {
    id: "travel_insurance",
    label: "Travel Insurance",
    description: "Travel and health insurance documents",
    category: "documents",
  },
  {
    id: "mahram_docs",
    label: "Mahram Documents",
    description: "Marriage certificate or birth certificate if required",
    category: "documents",
  },

  // Clothing
  {
    id: "modest_clothes",
    label: "Modest Clothing",
    description: "Loose, modest clothing for men and women",
    category: "clothing",
  },
  {
    id: "abaya",
    label: "Abaya/Hijab (Sisters)",
    description: "Modest dress and head covering for women",
    category: "clothing",
  },
  {
    id: "socks",
    label: "Socks (Multiple Pairs)",
    description: "The mosque floors can be cold at night",
    category: "clothing",
  },
  {
    id: "comfortable_shoes",
    label: "Comfortable Walking Shoes",
    description: "You will walk a lot — bring comfortable shoes",
    category: "clothing",
  },
  {
    id: "belt",
    label: "Belt/Pouch",
    description: "Money belt or neck pouch for keeping valuables safe",
    category: "clothing",
  },

  // Medicine
  {
    id: "prescription_meds",
    label: "Prescription Medications",
    description: "Bring enough supply for the full trip",
    category: "medicine",
  },
  {
    id: "pain_relief",
    label: "Pain Relief (Paracetamol)",
    description: "For headaches and general pain",
    category: "medicine",
  },
  {
    id: "antidiarrheal",
    label: "Anti-Diarrheal Medicine",
    description: "Change in food and water can affect digestion",
    category: "medicine",
  },
  {
    id: "cold_medicine",
    label: "Cold & Flu Medicine",
    description: "Large crowds increase chances of getting sick",
    category: "medicine",
  },
  {
    id: "plasters",
    label: "Plasters/Band-Aids",
    description: "For blisters from walking",
    category: "medicine",
  },
  {
    id: "hand_sanitizer",
    label: "Hand Sanitizer",
    description: "Keep hands clean in crowded areas",
    category: "medicine",
  },

  // Toiletries
  {
    id: "unscented_soap",
    label: "Unscented Soap & Shampoo",
    description: "Fragrance-free products required during Ihram",
    category: "toiletries",
  },
  {
    id: "unscented_deodorant",
    label: "Unscented Deodorant",
    description: "No fragrance allowed in state of Ihram",
    category: "toiletries",
  },
  {
    id: "toothbrush",
    label: "Toothbrush & Toothpaste",
    description: "And miswak (Sunnah)",
    category: "toiletries",
  },
  {
    id: "sunscreen",
    label: "Sunscreen (Unscented)",
    description: "Sun in Makkah can be very intense",
    category: "toiletries",
  },
  {
    id: "lip_balm",
    label: "Lip Balm (Unscented)",
    description: "Dry heat can cause chapped lips",
    category: "toiletries",
  },
  {
    id: "nail_clippers",
    label: "Nail Clippers",
    description: "Trim nails before entering Ihram",
    category: "toiletries",
  },
  {
    id: "prayer_mat",
    label: "Small Prayer Mat",
    description: "Compact travel prayer mat",
    category: "toiletries",
  },
  {
    id: "quran",
    label: "Quran / Dua Book",
    description: "Pocket Quran and dua booklet for Umrah",
    category: "toiletries",
  },
];
