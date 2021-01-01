export default {
  api_error: {
    generic: 'Er is een fout opgetreden. Probeer het opnieuw a.u.b',

    auth_rate_limited: 'You are being rate limited. Wacht 30 minuten en probeer het opvieuw',
    form_rate_limited: 'You are being rate limited. Wacht 5 minuten en probeer het opvieuw',

    email_exists: 'E-mailadres bestaat al',
    password_incorrect: 'U heeft het verkeerde wachtwoord ingevoerd',
    password_reset_failed: 'Kan wachtwoord niet resetten. Probeer het opnieuw a.u.b',
    login_failed: 'Inloggen mislukt. Probeer het opnieuw a.u.b',
    login_credentials_invalid: 'De ingegeven combinatie e-mailadres en wachtwoord is ongeldig',

    phone_exists: 'Dit telefoonnummer is al gebruikt',
    code_verify_failed: 'Kan het code niet verifiëren',
    phone_submission_failed: 'Kan het telefoonnummer niet wijzigen. Probeer het opnieuw a.u.b',
    phone_saving_failed: 'Kan het telefoonnummer niet opslaan. Probeer het opnieuw a.u.b',

    otp_expired: 'You enter an expired code. Klik \'Code opnieuw verzenden\' om een nieuwe code op te halen',
    otp_invalid: 'Verkeerde verificatiecode',
    two_factor_activation_failed: 'Kan het 2FA niet activeren. Probeer het opnieuw a.u.b',
  },

  form_error: {
    field_required: 'Verplichte veld',
    email_format: 'Verkeerde e-mailadres format',
    address_required: 'Voer een adres in',
    postcode_format: 'Verkeerde postcode formaat. De Nederlandse postcode bestaat uit vier cijfers, een spatie en twee letters, e.g. 1234 AB',
    date_order: 'De einddatum moet na de startdatum liggen',
    time_order: 'De eindtijd moet na de starttijd liggen',
    select_gender: 'Kies een geslacht',
    select_option: 'Kies een optie',
    password_critera: 'Een wachtwoord moet voldoen aan de eisen',
    same_old_password: '',
    new_passwords_unmatched: 'New passwords must match',
    review_length: 'Please write a longer review',
  },

  success: {
    register1: 'Registratie gelukt',
    register2: 'Wij hebben u een e-mail gestuurd met daarin een activatielink.',
    register3: 'Klik op deze link (verloopt na 1 uur) om uw account te activeren. U kunt daarna inloggen.',
    check_spam_folder: 'Mocht u binnen enkele minuten geen mail ontvangen, controleer je spam/junk folder.',
    reset_forgot_password: 'Wachtwoord reset gelukt. U kunt nu inloggen met uw nieuwe wachtwoord.',
    notification_setting: 'Meldingsinstelling bijgewerkt',
    password_reset: 'Uw wachtwoord is succesvol resetten',
    phone_verified: 'Uw telefoonnummer is succesvol geverifieerd',
    phone_removed: 'Uw telefoonnummer is succesvol verwijderd',
    '2FA_enabled': 'U hebt tweefactor-authenticatie succesvol ingeschakeld. Je bent verplicht om zowel je wachtwoord als een authentiatiecode van je mobiele telefoon in te voeren om in te loggen.',
    '2FA_disabled': 'U hebt tweefactor-authenticatie succesvol uitgeschakeld. U kunt nu inloggen met alleen uw wachtwoord.',
    booking_request: 'Uw boekingsaanvraag is succesvol verzonden.',
    review: 'U heeft uw recensie succesvol ingediend. U wordt nu teruggeleid naar de boekingspagina.'
  },

  header: {
    home: 'Startpagina',
    find_sitter: 'Oppas zoeken',
    about: 'Over',
    bookings: 'Boekings',
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
    select: 'Selecteer',
    save: 'Save',
    submit: 'Submit',
    reset: 'Resetten',
    ok: 'Oke',
    cancel: 'Annuleren'
  },

  login: {
    title: 'Inloggen',
    log_in: 'inloggen',
    demo_user: 'Login als een demo gebruiker',
    forgot_password: 'Wachtwoord vergeten?',
    google_login: 'Inloggen met Google',
    '2FA_login': 'Enter the 6-digit code in the Google Authenticator app on your phone.',
    // Voer de code van 6 cijfers van de Google Authenticator app 
  },

  register: {
    title: 'Registreren',
  },

  account_activation: {
    success1: 'U hebt uw account succesvol geactiveerd.',
    success2: 'U kunt nu ',
    error_title: 'De activatielink is verlopen of ongeldig',
    error_desription: 'Voer uw geldige e-mailadres in om een nieuwe activatelink te ontvangen.',
    response: 'Als de e-mailadres in onze database staan, er wordt een e-mail gestuurd met een activatelink (verloopt na 1 uur). Mocht u binnen enkele minuten geen mail ontvangen, controleer je spam/junk folder.'
  },

  reset_password: {
    title: 'Wachtwoord resetten',
    new_password: 'Nieuwe wachtwoord',
    repeat_password: 'Herhaal wachtwoord'
  },

  forgot_password: {
    instruction: 'Als u uw e-mailadres invoeren, worden de instructies voor het opnieuw instellen van het wachtwoord naar je e-mailadres verzonden.',
    response: 'Als de e-mailadres in onze database staan, er wordt een e-mail gestuurd met een link om je wachtwoord opnieuw in te stellen. Deze link verloopt na 30 minuten.'
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
    repeated_customer: 'Repeated customer',
    total_reviews: 'Aantal recensies',
    completed_bookings: 'Voltooide afspraken',
    repeated_customers: 'Terugkerende klanten',
    hourly_rate: 'Uurtarief',
    nightly_rate: 'Nachttarief',
  },

  profile_summary: {
    email_verified: 'E-mailadres geverifieerd',
    phone_verified: 'Phone geverifieerd',
  },

  sitter_profile: {
    no_own_profile_action: 'You cannot do actions to your own profile',
    send_message: 'Stuur bericht',
    request_appointment: 'Request an appointment',
    appointment_type: 'Appointment type',
    one_day: 'One day',
    overnight: 'Overnight',
    send_request: 'Send request',
    appointment_fee: 'Appointment fee',
    skills_summary: 'Summary of skills',
    location: 'Locatie',
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
    personal_info: 'Algemene informatie',
    sitter_profile: 'Oppasprofiel',
    owner_profile: 'Eigenaarsprofiel',
  },

  settings: {
    contact_details: 'Contactgegevens',
    contact_details_tooltip: 'Via your email and/or phone, you can receive notifications when someone sends you a booking request; updates your booking status; or messages you. Uw gegevens worden met niemand gedeeld',
    reveal: 'Onthullen',
    hide: 'Verbergen',
    edit: 'Bewerken',
    add: 'Toevoegen',
    remove: 'Verwijderen',
    receive_notifications: 'Meldingen inschakelen',
    email: 'E-mailadres',
    phone: 'Telefoonnummer',
    receive_sms_code: 'You will receive an SMS with a verification code.',
    save_phone_description: 'Your phone number is only used for verification and notifications. Uw telefoonnummer wordt met niemand gedeeld.',
    enter_sms_code: 'Voer de 6-cijferige code die je via sms ontvangt in.',
    code_to_expire: 'Deze code verloopt na 2 minuten.',
    resend_code: 'Stuur opnieuw',

    stripe_account: 'Stripe-account',
    payment_description: 'To send and / or receive payments, please set up payouts on Stripe. Clicking below will guide you to a secure online form which will guide you to connect your bank account.',
    setup_payouts: 'Maak een Stripe account aan',

    authentication: 'Wachtwoord en authenticatie',
    not_available: 'Niet beschikbaar als u bent ingelogd via Google',

    password: 'Wachtwoord',
    password_description: 'Update your password for the next time you log in.',
    change_password: 'Wachtwoord wijzigen',
    password_criteria1: 'Uw wachtwoord moet uit',
    password_criteria2: 'ten minste 8 tekens',
    password_criteria3: 'ten minste één cijfer en één letter bestaan',
    password_criteria4: 'een combinatie van hoofdletters en kleine letters',
    current_password: 'Huidig wachtwoord',
    new_password: 'Nieuw wachtwoord',
    repeat_new_password: 'Herhaal nieuw wachtwoord',

    two_factor_auth: 'Tweefactor-authenticatie',
    '2FA_description': 'Bescherm je Watchcats-account met een extra beveiligingslaag. Na de configuratie ben je verplicht om zowel je wachtwoord als een authentiatiecode van je mobiele telefoon in te voeren om in te loggen.',
    '2FA_enabled': 'U hebt tweefactor-authenticatie ingeschakeld.',
    disable_2FA: 'Tweefactor-authenticatie uitschakelen',
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

  personal_info: {
    profile_picture: 'Profielfoto',
    picture_requirement_1: 'Please choose a high quality picture of yourself',
    picture_requirement_2: 'Geen filters, effecten of stickers worden toegepast',
    picture_requirement_3: 'Gebruik het beste beeldformaat: JPG, JPEG, of PNG',
    picture_requirement_4: 'Minimale afmetingen: 360 x 254 pixels',

    personal_info: 'Persoonsgegevens',
    first_name: 'Voornaam',
    last_name: 'Achternaam',
    phone: 'Telefoon',
    email: 'E-mailadres',
    address: 'Adres',
    address_tooltip: 'Uw adres worden met niemand gedeeld',
    postcode: 'Postcode',
    postcode_tooltip: "Only Dutch postcodes are accepted (four digits followed by two uppercase letters, i.e. 1234AB). Once submitted, your location will appear in the map on 'Find Cat Sitter' page",

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
    exotic: 'Exotisch',
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

  cat_personality: {
    outdoor_explorer: 'Vaak naar buiten',
    outdoor_occasionally: 'Af en toe naar buiten',
    indoor_playful: 'Binnen blijven en speelse',
    indoor_chilled: 'Binnen blijven en rustig',
    others: 'Andere'
  },

  bookings: {
    as_cat_sitter: 'Als een oppas',
    as_cat_owner: 'Als een eigenaar',

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
      'Click "OK" to confirm the appointment completion. The status of this booking will be changed from "Confirmed" to "Completed". You will be able to write a review about your experience.',

    completed: 'Voltooid',
    await_completion: 'Waiting for cat sitter to confirm completion of sitting job',
    write_review: 'Schrijf een recensie',

    declined: 'Geweigerd',

    sitter: 'Oppas',
    owner: 'Eigenaar',
    location: 'Locatie',
    time: 'Tijd',
    price: 'Prjs',
  },

  review: {
    title: 'Beoordeel en recenseer',
    booking_information: 'Boekingsinformatie',
    describe_experience: 'Beschrijf uw ervaring',
    reminder: 'Your review will be public on the reviewee\'s public profile',
    give_rating: 'Geef je beoordeling'
  },

  chats: {
    no_chats: 'No chats yet',
    if_sitter: 'If you\'re a sitter, only owners can write to you',
    if_owner: 'If you\'re an owner, start by',
    find_sitter: 'finding a sitter'
  }
};
