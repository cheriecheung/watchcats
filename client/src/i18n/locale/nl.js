export default {
  error: {
    generic: 'Er is een fout opgetreden. Probeer het opnieuw a.u.b',

    email_exists: 'E-mailadres bestaat al.',

    login_failed: 'Unable to login. Please try again.',
    login_credentials_invalid: 'De ingegeven combinatie e-mailadres en wachtwoord is ongeldig.',

    phone_exists: 'Dit telefoonnummer is al gebruikt.',
    code_verify_failed: 'Kan het code niet verifiëren.',
    phone_submission_failed: 'Kan het telefoonnummer niet wijzigen. Probeer het opnieuw a.u.b',
    phone_saving_failed: 'Kay het telefoonnummer niet opslaan. Probeer het opnieuw a.u.b',

    password_reset_failed: 'Kan wachtwoord niet resetten. Probeer het opnieuw a.u.b.',

    otp_expired: 'You enter an expired code. Click "Resend code" to get a new one.',
    otp_invalid: 'Verkeerde verificatiecode.',
    two_factor_activation_failed: 'Kan het 2FA niet activeren. Probeer het opnieuw a.u.b.',
  },

  success: {
    password_reset: 'You have successfully reset your password.',
    notification_setting: 'Meldingsinstelling bijgewerkt',
    '2FA_enabled': 'You have enabled 2-factor authentication. You will now need to login by phone on top of logging in by email and password.',
    '2FA_disabled': 'You have disabled 2-factor authentication. You will now only log in by email and password.',
    booking_request: 'You have successfully sent your booking request.',
    review: 'You have successfully submitted a review. You will now be redirected back to the booking page.'
  },

  header: {
    home: 'Startpagina',
    find_sitter: 'Oppas zoeken',
    about: 'Over',
    bookings: 'Boeking',
    messages: 'Chats',
    account: 'Account',
    login: 'Inloggen',
    logout: 'Uitloggen',
  },

  home: {
    find_sitter: 'Find your ideal cat sitter in town today!',
  },

  form: {
    or: 'OF',
    email: 'E-mailadres',
    password: 'Wachtwoord',
    first_name: 'Voornaam',
    last_name: 'Achternaam',
    save: 'Save',
    submit: 'Submit',
    reset: 'Resetten',
  },

  login: {
    title: 'Inloggen',
    log_in: 'inloggen',
    demo_user: 'Login als een demo gebruiker',
    forgot_password: 'Wachtwoord vergeten?',
    google_login: 'Inloggen met Google',
    '2FA_login': 'Enter the 6-digit code in the Google Authenticator app on your phone.',
  },

  register: {
    title: 'Registreren',
    password_instruction: 'Password should be 8 to 12 characters',
  },

  email_verification: {
    success: 'You have sucecssfully activated your account. You are now able to ',
    error_title: 'Expired or invalid verification link',
    error_desription: 'Please enter your registered email below to get another link to activate your account.',
    response: 'If the provided email is in our database, a new verification link will be sent to it. Please be sure to check the spam / junk mailbox if it is not found in the main inbox'
  },

  reset_password: {
    title: 'Reset your password',
    enter_new_password: 'Voer uw nieuwe wachtwoord in',
    new_password: 'Nieuwe wachtwoord',
    repeat_password: 'Herhaal wachtwoord'
  },

  forgot_password: {
    instruction: 'To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.',
    response: 'If the provided email is in our database, a password reset link will be sent to it. Please be sure to check the spam / junk mailbox if it is not found in the main inbox'
  },

  find_sitter: {
    address: 'Adres',
    start_date: 'Startdatum',
    end_date: 'Einddatum',
    review: 'Recensie',
    reviews: 'Recensies',
    distance: 'Afstand',
    price: 'Prijs',
    per_hour: '/ uur',
    per_night: '/ nacht',
    reset: 'Resetten',

    // no 's if only one result
    showing: 'Showing {{from}} - {{to}} of {{totalResults}} matches',
    no_results: 'Geen oppas gevonden',
    new_member: 'Nieuw lid',
    completed_booking: 'Voltooide afspraak',
    completed_bookings: 'Voltooide afspraken',
    repeated_customer: 'Repeated customer',
    repeated_customers: 'Repeated customers',
    view_profile: 'Bekijk profiel',
  },

  profile_summary: {
    email_verified: 'Email geverifieerd',
    phone_verified: 'Phone geverifieerd',
  },

  sitter_profile: {
    send_message: 'Stuur bericht',
    request_appointment: 'Request an appointment',
    appointment_type: 'Appointment type',
    one_day: 'One day',
    overnight: 'Overnight',
    send_request: 'Send request',
    appointment_fee: 'Appointment fee',
    skills_summary: 'Summary of skills',
    location: 'Location',
    feedback: 'Feedback from cat owners',

    create_appointment_time: 'As you haven\'t set an appointment time in your owner profile, please select a time in the following.',
    no_owner_profile: 'You can only send a request to a cat sitter when you have a cat owner profile.',
    create_owner_profile1: 'To start creating your cat owner profile, go to the',
    create_owner_profile2: 'account',
    create_owner_profile3: 'page, and click on the \'Cat owner profile\' tab.',
    select_time: 'Select a time',
    existing_time: ' The following is/are the appointment time you previously filled out in your cat owner profile.',
    one_day_appointment: 'One-day appointment',
    overnight_appointment: 'Overnight appointment',
  },

  owner_profile: {
    sitter_needed: 'Oppas nodig',
    one_day_appointment: 'One-day appointment',
    overnight_appointment: 'Overnight appointment',
    location: 'Locatie',
    feedback: 'Feedback from cat sitters',
  },

  account: {
    settings: 'Instellingen',
    general_info: 'Algemene informatie',
    sitter_profile: 'Oppasprofiel',
    owner_profile: 'Eigenaarsprofiel',
  },

  settings: {
    contact_details: 'Contactgegevens',
    reveal: 'Onthullen',
    hide: 'Verbergen',
    edit: 'Bewerken',
    add: 'Toevoegen',
    remove: 'Verwijderen',
    receive_notifications: 'Meldingen inschakelen',
    email: 'Email',
    phone: 'Telefoonnummer',
    receive_sms_code: 'You will receive an SMS with a verification code.',
    save_phone_description: 'Your phone number is only used for verification and notifications. It will not be shared to anyone on this application',
    enter_sms_code: 'Enter the 6-digit code we sent to your phone via SMS.',
    code_to_expire: ' The code will expire in 2 minutes.',
    resend_code: 'Resend code',

    stripe_account: 'Stripe-account',
    payment_description: 'To send and / or receive payments, please set up payouts on Stripe. Clicking below will guide you to a secure online form which will guide you to connect your bank account.',
    setup_payouts: 'Set up payouts',

    authentication: 'Wachtwoord en authenticatie',
    not_available: 'Not available for accounts login via Google',
    password: 'Wachtwoord',
    password_description: 'Update your password for the next time you log in.',
    change_password: 'Wachtwoord wijzigen',
    current_password: 'Huidig wachtwoord',
    new_password: 'Nieuw wachtwoord',
    repeat_new_password: 'Herhaal nieuw wachtwoord',

    two_factor_auth: 'Tweefactor-authenticatie',
    '2FA_description': 'Bescherm je Watchcats-account met een extra beveiligingslaag. Na de configuratie ben je verplicht om zowel je wachtwoord als een authentiatiecode van je mobiele telefoon in te voeren om in te loggen.',
    '2FA_enabled': 'You have already enabled two factor authentication',
    disable_2FA: 'Disable Two-Factor Auth',
    enable_2FA: 'Tweefactor-authenticatie inschakelen',
    enable_2FA_description: 'Maak je account veiliger in 3 eenvoudige stappen',
    enable_2FA_step1: 'Download een authenticator-app',
    enable_2FA_step1_detail1: 'Download en installeer ',
    enable_2FA_step1_detail2: ' voor je telefoon of je tablet.',
    enable_2FA_step2: '2. Scan de QR code',
    enable_2FA_step2_detail: 'Open de authenticator-app en scan de afbeelding links met de camera van je telefoon.',
    enable_2FA_step3: '3. Log in met je code',
    enable_2FA_step3_detail: 'Voer de gegenereerde 6-cijferige verificatecode in.',
    activate: 'Activeren'
  },

  general_info: {
    profile_picture: 'Profielfoto',
    picture_requirement_1: 'Please choose a high quality picture of yourself',
    picture_requirement_2: 'No filters, effects or stickers applied to the image',
    picture_requirement_3: 'Best image format JPG, JPEG, PNG',
    picture_requirement_4: 'Minimum size 360 x 254 pixels',

    personal_info: 'Persoonsgegevens',
    first_name: 'Voornaam',
    last_name: 'Achternaam',
    phone: 'Telefoon',
    email: 'Email',
    address: 'Adres',
    address_tooltip: 'Your address will not be shared with anyone in any manner',
    postcode: 'Postcode',
    postcode_tooltip: "Once submitted, your location will appear in the map on 'Find Cat Sitter' page",

    social_media: 'Sociale media',
    optional: 'Optioneel',
    facebook: 'Facebook profiel',
    instagram: 'Instagram profiel',
    other: 'Andere profiel',
  },

  sitter_form: {
    view_profile: 'Bekijk mijn openbare oppasprofiel',

    about_me: 'Over mij',
    about_me_description:
      'Tell cat owners about yourself. Start with a little description of yourself - What do you do for a living? Why do you want to be a cat sitter?',

    experience: 'Ervaring',
    experience_description:
      'Please select relevant experience / skills you possess. For every item selected, please briefly explain the details in the text box below.',
    has_cat: 'Eigenaar van een kat',
    volunteer: 'Heeft vrijwillegerswerk gedaan',
    medication: 'Kan medicijnen toedienen',
    injection: 'Kan injecties toedienen',
    certificate: 'Bezit certificaat',
    grooming: 'Ervaring in dierenverzorging',

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
    view_profile: 'Bekijk mijn openbare eigenaarsprofiel',

    about_me: 'Over mij',
    about_me_description: 'Tell cat sitters about yourself. Start with a little description of yourself - What do you do for a living? Why are you looking for a cat sitter?',

    appointment: 'Cat sitting appointment',
    one_day: 'Eendaags bezoek {{index}}',
    maximum_one_day: 'You can at most request 2 one-day appointments at the same time!',
    date: 'Datum',
    start_time: 'Starttijd',
    end_time: 'Eindtijd',
    overnight: 'Overnachting bezoek {{index}}',
    maximum_overnight: 'You can at most request 2 overnight sitting appointments at the same time!',
    start_date: 'Startdatum',
    end_date: 'Einddatum',
    add_period: 'Periode toevoegen',
    remove: 'Verwijderen',

    about_cat: 'Over mijn kat',
    picture: 'Afbeelding',
    share_picture: 'Show a picture of your cat to cat sitters!',
    name: 'Naam',
    age: 'Leeftijd',
    gender: 'Geslacht',
    male: 'Man',
    female: 'Vrouw',
    medical_needs: 'Medische behoeften',
    none: 'None',
    injection: 'Injecties',
    pill: 'Pil',
    vaccinated: 'Gevaccineerd',
    insured: 'Verzekerd',
    yes: 'Ja',
    no: 'Nee',
    breed: 'Ras',
    favourite_treat: 'Favoriete traktatie',
    personality: 'Personality',
    pictures: "Foto's van je kat",
    upload: 'Uploaden',
    add_cat: 'Kat toevoegen',
    maximum_cat: 'If you have 5 or more cats, perhaps you would want to consider having them stay at a pet hotel, so they can all be taken care of by full time staff!',

    responsibilities: 'Verantwoordelijkheden',
    responsibilities_text: 'Please write a description about your cat(s) - include their feeing, litter, playtime routine, and other needs. It is also important to include your vets details should the cat sitter needs to get hold if them.',
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

  bookings: {
    as_cat_sitter: 'Als een oppas',
    as_cat_owner: 'Als een eigenaar',

    status_requested: 'aangevraagd',
    status_confirmed: 'bevestigd',
    status_completed: 'voltooid',
    status_declined: 'geweigerd',
    no_jobs: 'U hebt geen oppas jobs {{status}} op het moment.',
    receive_sitting_jobs: 'You will only receive sitting jobs requests when a cat owner  sends you one.',
    no_service: 'U hebt geen afspraak {{status}} op het moment',
    go_to: 'Ga naar de',
    find_sitter: 'pagina om een katoppas te zoeken.',

    requested: 'Aangevraagd',
    await_acceptance: 'Currently waiting for cat sitter to accept booking',
    decline: 'Weigeren',
    decline_confirm:
      'Click "OK" to confirm the booking decline. It is recommended that you write the cat owner about the reason you reject the booking',
    accept: 'Accepteren',
    accept_confirm:
      'Click "OK" to confirm the booking acceptance. The status of this booking will be changed from "Requested" to "Confirmed".',

    confirmed: 'Bevestigd',
    await_payment: 'Waiting for cat owner to pay',
    cancel: 'Annuleren',
    cancel_confirm:
      'Click "OK" to confirm the booking cancellation. Make sure to inform the cat owner about the cancellation and the reason.',
    pay_now: 'Nu betalen',
    complete: 'Afspraak voltooid',
    complete_confirm:
      'Click "OK" to confirm the booking completion. The status of this booking will be changed from "Confirmed" to "Completed". You will be able to write the cat sitter a review.',

    completed: 'Voltooid',
    await_completion: 'Waiting for cat sitter to confirm completion of sitting job',
    write_review: 'Schrijf een recensie',

    declined: 'Geweigerd',

    view_profile: 'Bekijk profiel',
    view_conversation: 'Bekijk gesprek',

    sitter: 'Oppas',
    owner: 'Eigenaar',
    location: 'Locatie',
    time: 'Tijd',
    price: 'Prjs',
  },

  review: {
    title: 'Beoordeel en recenseer',
    booking_information: 'Booking information',
    describe_experience: 'Describe your experience',
    reminder: 'Your review will be public on the reviewee\'s public profile',
    give_rating: 'Give your rating'
  }
};
