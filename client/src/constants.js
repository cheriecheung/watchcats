export const sitterBookings = {
  request: [
    {
      name: 'Owner1',
      email: 'owner_1@gmail.com',
      phone: '0633577246',
      cat: 'Tom',
      message:
        'Hi, would you have time the next Saturday night to look after my cat Tom. He can be a little feisty but nothing too hard to handle',
    },
    {
      name: 'Owner2',
      cat: 'Jerry',
      email: 'owner_two@gmail.com',
      phone: '0623477622',
      message:
        "Hey cat sitter, my fat cat Jerry would need someone to feed him shrimps when I'm out of town for my 3 week vacation. Can we have a meet up first to talk about it?",
    },
  ],
  confirmed: [{ name: 'Owner3', cat: 'Aiden' }],
  completed: [
    { name: 'Owner4', cat: 'Mary' },
    { name: 'Owner5', cat: 'Tom' },
    { name: 'Owner6', cat: 'Helena' },
    { name: 'Owner1', cat: 'Baby' },
  ],
  reviews: [
    { name: 'Owner4', cat: 'Mary' },
    { name: 'Owner6', cat: 'Helena' },
    { name: 'Owner1', cat: 'Baby' },
  ],
};

export const sitterExperience = [
  { value: 'ownCat', label: 'Owns / owned a cat' },
  { value: 'volunteer', label: 'Has done volunteer work' },
  { value: 'medication', label: 'Able to administer medication' },
  { value: 'injections', label: 'Able to do injections' },
  { value: 'certification', label: 'Has pet sitting certification' },
  { value: 'grooming', label: 'Has pet grooming skills' },
];

export const catBreedOptions = [
  { value: 1, label: 'Abyssinian' },
  { value: 2, label: 'Bengal cat' },
  { value: 3, label: 'Birman' },
  { value: 4, label: 'British Shorthair' },
  { value: 5, label: 'Burmese' },
  { value: 6, label: 'Devon Rex' },
  { value: 7, label: 'Exotic' },
  { value: 8, label: 'Maine Coon' },
  { value: 9, label: 'Moggy' },
  { value: 10, label: 'Oriental' },
  { value: 11, label: 'Persian' },
  { value: 12, label: 'Ragdoll' },
  { value: 13, label: 'Siamese' },
  { value: 14, label: 'Sphynx' },
  { value: 15, label: 'Tabby' },
  { value: 16, label: 'Other' },
];

export const medicineOptions = [
  { value: 'injection', label: 'Injection' },
  { value: 'pill', label: 'Pill' },
];

export const personalityOptions = [
  { value: 1, label: 'Shy and can be easily scared' },
  { value: 2, label: 'Curious and hyper' },
  { value: 3, label: 'Dominant and can be aggressive' },
  { value: 4, label: 'Friendly and affectionate' },
  { value: 5, label: 'Solitary and calm' },
];

export const hourlyRateOptions = [
  { value: 6, label: '€ 6,00' },
  { value: 7, label: '€ 7,00' },
  { value: 8, label: '€ 8,00' },
  { value: 9, label: '€ 9,00' },
  { value: 10, label: '€ 10,00' },
  { value: 11, label: '€ 11,00' },
  { value: 12, label: '€ 12,00' },
  { value: 13, label: '€ 13,00' },
  { value: 14, label: '€ 14,00' },
  { value: 15, label: '€ 15,00' },
  { value: 16, label: '€ 16,00' },
  { value: 17, label: '€ 17,00' },
  { value: 18, label: '€ 18,00' },
  { value: 19, label: '€ 19,00' },
  { value: 20, label: '€ 20,00' },
  { value: 21, label: '€ 21,00' },
  { value: 22, label: '€ 22,00' },
  { value: 23, label: '€ 23,00' },
  { value: 24, label: '€ 24,00' },
  { value: 25, label: '€ 25,00' },
];

export const nightlyRateOptions = [
  { value: 10, label: '€ 10,00' },
  { value: 15, label: '€ 15,00' },
  { value: 20, label: '€ 20,00' },
  { value: 25, label: '€ 25,00' },
  { value: 30, label: '€ 30,00' },
  { value: 35, label: '€ 35,00' },
  { value: 40, label: '€ 40,00' },
  { value: 45, label: '€ 45,00' },
  { value: 50, label: '€ 50,00' },
];

export const sortingTypeOptions = [
  { value: 'totalReviews', label: 'Reviews' },
  { value: 'totalCompletedBookings', label: 'Completed bookings' },
  { value: 'totalRepeatedCustomers', label: 'Repeated customers' },
  { value: 'hourlyRate', label: 'Hourly rate' },
  { value: 'nightlyRate', label: 'Nightly rate' },
];
