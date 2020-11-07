export default {
  header: {
    find_sitter: 'Oppas zoeken',
    about: 'Over',
    bookings: 'Bookings',
    account: 'Account',
    login: 'Inloggen',
    logout: 'Uitloggen',
  },

  home: {
    i_am: 'Ik ben een...',
    owner_finds_sitter: 'Kat eigenaar op zoek naar een oppas',
    sitter_finds_owner: 'Oppas op zoek naar een kat',
  },

  form: {
    no_empty: 'Kan niet leeg blijven',
    only_alphabet: 'Alleen alfabetische tekens',
    or: 'OF',
    email: 'E-mailadres',
    password: 'Wachtwoord',
    first_name: 'Voornaam',
    last_name: 'Achternaam',
    save: 'Save',
    reset: 'Resetten',
  },

  login: {
    login: 'Inloggen',
    // response: 'Login failed; Invalid user ID or password.',
    error_message: '',
  },

  register: {
    register: 'Registreren',
    // response: 'A link to activate your account has been emailed to the address provided.',
    success_message: '',
    password_instruction: 'Password should be 8 to 12 characters',
  },

  forgot_password: {
    response:
      'If that email address is in our database, we will send you an email to reset your password.',
  },

  find_sitter: {
    address: 'Adres',
    start_date: 'Startdatum',
    end_date: 'Einddatum',
    review: 'Recensie',
    reviews: 'Recensies',
    distance: 'Afstand',
    price: 'Prijs',
    reset: 'Resetten',

    showing: (total) => `Showing ${total} cat sitter`,
    no_results: 'Geen kattenoppas gevonden',
    new_member: 'Nieuw lid',
    completed_booking: 'Voltooide afspraak',
    completed_bookings: 'Voltooide afspraken',
    repeated_customer: 'Repeated customer',
    repeated_customers: 'Repeated customers',
    view_profile: 'Bekijk profiel',
  },

  profile_summary: {
    verified: 'Geverifieerd',
    id_verified: 'ID geverifieerd',
    phone_verified: 'Phone geverifieerd',
    address_verified: 'Address geverifieerd',
  },

  sitter_profile: {
    send_message: 'Stuur bericht',
    request_appointment: 'Send request for sitting job',
    appointment_type: 'Appointment type',
    send_request: 'Send request',
    appointment_fee: 'Appointment fee',

    location: 'Location',
    feedback: 'Feedback from cat owners',
  },

  owner_profile: {
    sitter_needed: 'Sitter needed',
    location: 'Location',
    feedback: 'Feedback from cat sitters',
  },

  account: {
    general_info: 'Algemene informatie',
    sitter_profile: 'Kattenoppasprofiel',
    owner_profile: 'Katteneigenaarsprofiel',
    settings: 'Instellingen',
  },

  general_info: {
    profile_picture: 'Profielfoto',

    personal_info: 'Persoonsgegevens',
    first_name: 'Voornaam',
    last_name: 'Achternaam',
    phone: 'Telefoon',
    email: 'Email',
    address: 'Adres',
    postcode: 'Postcode',

    social_media: 'Sociale media',
    facebook: 'Facebook profiel',
    instagram: 'Instagram profiel',
    other: 'Andere profiel',

    proof_address: 'Proof of address',
    proof_address_description1:
      'Before we can make your profile live we need proof of your address. We accept photo/scan of a physical letter or PDF copies of your digital statements within the past year.',
    proof_address_description2: 'Read more on the documents we accept',
  },

  sitter_form: {
    view_profile: 'Bekijk mijn openbare kattenoppasprofiel',

    about_me: 'Over mij',
    about_me_description:
      'Tell cat owners about yourself. Start with a little description of yourself - What do you do for a living? Why do you want to be a cat sitter?',

    experience_serivce: 'Ervaring en service',
    experience_description:
      'Please select relevant experience / skills you possess. For every item selected, please briefly explain the details in the text box below.',
    has_cat: 'Eigenaar van een kat',
    volunteer: 'Heeft vrijwillegerswerk gedaan',
    medication: 'Kan medicijnen toedienen ',
    injection: 'Kan injecties toedienen',
    certificate: 'Heeft certificaat voor dierenverzorging ',
    grooming: 'Heeft verzorgings bekwaamheid voor huisdieren',

    pricing: 'Prijsstelling',
    one_day: 'Eendaags bezoek',
    per_hour: '/ uur',
    overnight: 'Overnachting',
    per_night: '/ nacht',

    availability: 'Beschikbaarheid',
    availability_description:
      'Select the dates that you are not available, so that cat owners can send you requests based on your availability.',
    available: 'Beschikbaar',
    unavailable: 'Niet beschikbaar',
  },

  owner_form: {
    view_profile: 'Bekijk mijn openbare katteneigenaarsprofiel',

    about_me: 'Over mij',
    about_me_description: '',

    appointment: 'Cat sitting appointment',
    one_day: 'Eendaags bezoek',
    date: 'Datum',
    start_time: 'Starttijd',
    end_time: 'Eindtijd',
    overnight: 'Overnachting',
    start_date: 'Startdatum',
    end_date: 'Einddatum',
    add_period: 'Periode toevoegen',
    remove: 'Verwijderen',

    about_cat: 'Over mijn kat',
    name: 'Naam',
    age: 'Leeftijd',
    gender: 'Geslacht',
    male: 'Man',
    female: 'Vrouw',
    medical_needs: 'Medische behoeften',
    injection: 'Injecties',
    pill: 'Pil',
    vaccinated: 'Gevaccineerd',
    insured: 'Verzekerd',
    yes: 'Ja',
    no: 'Nee',
    breed: 'Ras',
    favourite_treat: 'Favoriete traktatie',
    pictures: "Foto's van je kat",
    upload: 'Uploaden',
    add_cat: 'Kat toevoegen',

    cat_description: 'Description of my cat(s)',
    cat_description_text: '',
  },

  cat_breed: {
    abyssinian: 'Abessijn',
    bengal_cat: 'Bengaalse kat',
    birman: 'Birmaan',
    burmese: 'Birmees',
    british_shorthair: 'Britse korthaar',
    devon_rex: 'Devon Rex',
    exotioc: 'Exotisch',
    maine_coon: 'Maine Coon',
    moggy: 'Moggy',
    oriental: 'Oosters',
    persian: 'Pers',
    ragdoll: 'Ragdoll',
    siamese: 'Siamees',
    sphynx: 'Sphynx',
    tabby: 'Tabby',
    other: 'Andere',
  },

  settings: {
    payment_method: 'Betalingsmiddel',
    add_card: 'Kredietkaart / debetkaart toevoegen',
    card_number: 'Kaartnummer',
    expiry_date: 'Vervaldatum',
    add_bank_account: 'Bankrekening toevoegen',

    change_password: 'Wachtwoord wijzigen',
    current_password: 'Huidig wachtwoord',
    new_password: 'Nieuw wachtwoord',
    repeat_new_password: 'Herhaal nieuw wachtwoord',

    two_factor_auth: 'Tweefactorauthenticatie',
    two_factor_auth_description: '',
  },

  bookings: {
    sitting_jobs: 'Oppas jobs voor mij',
    sitting_service: 'Oppas diensten voor mijn kat',

    requested: 'Aangevraagd',
    decline: 'Weigeren',
    decline_confirm:
      'Click "OK" to confirm the booking decline. It is recommended that you write the cat owner about the reason you reject the booking',
    accept: 'Accepteren',
    accept_confirm:
      'Click "OK" to confirm the booking acceptance. The status of this booking will be changed from "Requested" to "Confirmed".',

    confirmed: 'Bevestigd',
    cancel: 'Annuleren',
    cancel_confirm:
      'Click "OK" to confirm the booking cancellation. Make sure to inform the cat owner about the cancellation and the reason.',
    pay_now: 'Nu betalen',
    complete: 'Afspraak voltooid',
    complete_confirm:
      'Click "OK" to confirm the booking completion. The status of this booking will be changed from "Confirmed" to "Completed". You will be able to write the cat sitter a review.',

    completed: 'Voltooid',
    write_review: 'Schrijf een recensie',

    declined: 'Geweigerd',

    view_profile: 'Bekijk profiel',
    view_conversation: 'Bekijk gesprek',

    sitter: 'Kattenoppas',
    owner: 'Katteneigenaar',
    location: 'Locatie',
    time: 'Tijd',
    price: 'Prjs',
  },
};
