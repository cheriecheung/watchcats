export default {
  api_error: {
    generic: 'Er is een fout opgetreden. Probeer het opnieuw a.u.b',

    auth_rate_limited: 'You are being rate limited. Wacht 30 minuten en probeer het opvieuw',
    form_rate_limited: 'You are being rate limited. Wacht 5 minuten en probeer het opvieuw',

    email_exists: 'E-mailadres bestaat al',
    password_incorrect: 'U heeft het verkeerde wachtwoord ingevoerd',
    password_reset_failed: 'Kan wachtwoord niet resetten. Probeer het opnieuw a.u.b',

    login_failed: 'Aanmelden mislukt. Probeer het opnieuw a.u.b',
    login_credentials_invalid: 'De ingegeven combinatie e-mailadres en wachtwoord is ongeldig',

    google_login_failed: 'Google login failed',
    google_login1: 'Er is een fout opgetreden',
    google_login2: 'the email you used was locally registered on Watch Cats.',
    google_login3: '(i.e. please use the local login)',
    google_login_redirect: 'U wordt in 5 seconden doorgestuurd naar de aanmeldenpagina.',

    phone_exists: 'Dit telefoonnummer is al gebruikt',
    code_verify_failed: 'Kan het code niet verifiëren',
    phone_submission_failed: 'Kan het telefoonnummer niet wijzigen. Probeer het opnieuw a.u.b',
    phone_saving_failed: 'Kan het telefoonnummer niet opslaan. Probeer het opnieuw a.u.b',

    otp_expired: 'Uw code is niet meer geldig. Klik \'Code opnieuw verzenden\' om een nieuwe code op te halen',
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
    same_old_password: 'Het nieuwe paswoord kan niet hetzelfde zijn als je huidige paswoord.',
    new_passwords_unmatched: 'De nieuwe paswoorden moeten overeenkomen',
    review_length: 'De geschreven review is niet lang genoeg',
  },

  success: {
    register1: 'Registratie gelukt',
    register2: 'Wij hebben u een e-mail gestuurd met daarin een activatielink.',
    register3: 'Klik op deze link (verloopt na 1 uur) om uw account te activeren. U kunt daarna aanmelden.',
    check_spam_folder: 'Mocht u binnen enkele minuten geen mail ontvangen, controleer je spam/junk folder.',
    reset_forgot_password: 'Wachtwoord reset gelukt. U kunt nu aanmelden met uw nieuwe wachtwoord.',
    notification_setting: 'Meldingsinstelling bijgewerkt',
    password_reset: 'Uw wachtwoord is succesvol resetten',
    phone_verified: 'Uw telefoonnummer is succesvol geverifieerd',
    phone_removed: 'Uw telefoonnummer is succesvol verwijderd',
    '2FA_enabled': 'U hebt tweefactor-authenticatie succesvol ingeschakeld. Je bent verplicht om zowel je wachtwoord als een authentiatiecode van je mobiele telefoon in te voeren om aan te melden.',
    '2FA_disabled': 'U hebt tweefactor-authenticatie succesvol uitgeschakeld. U kunt nu aanmelden met alleen uw wachtwoord.',
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
    login: 'Aanmelden',
    logout: 'Afmelden',
  },

  footer: {
    made_with: 'Met',
    by: 'gemaakt door',
  },

  home: {
    find_sitter: 'Zoek vandaag de ideale kattenoppas in je buurt!',
    welcome_back: 'Welkom terug, {{name}}!'
  },

  form: {
    or: 'OF',
    email: 'E-mailadres',
    password: 'Wachtwoord',
    first_name: 'Voornaam',
    last_name: 'Achternaam',
    select: 'Selecteer...',
    save: 'Opslaan',
    submit: 'Indienen',
    reset: 'Resetten',
    ok: 'Oke',
    cancel: 'Annuleren'
  },

  login: {
    title: 'Aanmelden',
    demo_user: 'Aanmelden als een demo gebruiker',
    forgot_password: 'Wachtwoord vergeten?',
    google_login: 'Aanmelden met Google',
    loading: 'Bezig met laden...',
    '2FA_login': 'Geef de 6-cijferige code in in de Google authenticator app op je gsm',
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
    total_completed_bookings: 'Voltooide afspraken',
    total_repeated_customers: 'Terugkerende klanten',
    hourly_rate: 'Uurtarief',
    nightly_rate: 'Nachttarief',

    view_profile: 'Bekijk profiel'
  },

  profile_summary: {
    email_verified: 'E-mailadres geverifieerd',
    phone_verified: 'Phone geverifieerd',
  },

  sitter_profile: {
    no_own_profile_action: 'U kan geen activiteiten op je eigen profiel maken',
    send_message: 'Stuur bericht',
    request_appointment: 'Aanvraag afspraak',
    appointment_type: 'Afspraak type',
    one_day: 'Een dag',
    overnight: 'Overnacht',
    send_request: 'Zend uitnodiging',
    appointment_fee: 'Vergoeding afspraak',
    skills_summary: 'Overzicht van kwaliteiten',
    location: 'Locatie',
    feedback: 'Feedback from cat owners',

    create_appointment_time: 'As you haven\'t set an appointment time in your owner profile, please select a time in the following.',
    set_up_owner_profile: 'Please set up an owner profile first',
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
    contact_details_tooltip: 'Je kan notificaties krijgen via de mail of op je telefoon voor het volgende: bij een boekings verzoek, bij updates van de boekings status en bij berichten van de boekers. Uw gegevens worden met niemand gedeeld.',
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
    edit_account: 'Bewerk account',

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
    two_factor_auth_as_demo_user: 'If you logged in as a demo user, 2FA can NOT be enabled. To test the feature, please make your own account.',
    '2FA_description': 'Bescherm je Watchcats-account met een extra beveiligingslaag. Na de configuratie ben je verplicht om zowel je wachtwoord als een authentiatiecode van je mobiele telefoon in te voeren om aan te melden.',
    '2FA_enabled': 'U hebt tweefactor-authenticatie ingeschakeld.',
    disable_2FA: 'Tweefactor-authenticatie uitschakelen',
    enable_2FA: 'Tweefactor-authenticatie inschakelen',
    enable_2FA_description: 'Maak je account veiliger in 3 eenvoudige stappen',
    enable_2FA_step1: 'Download een authenticator-app',
    enable_2FA_step1_detail1: 'Download en installeer ',
    enable_2FA_step1_detail2: ' voor je telefoon of je tablet.',
    enable_2FA_step2: '2. Scan de QR code',
    enable_2FA_step2_detail: 'Open de authenticator-app en scan de afbeelding links met de camera van je telefoon.',
    enable_2FA_step3: '3. Aanmelden met beveiligingscode via Google-authenticator app',
    enable_2FA_step3_detail: 'Voer de gegenereerde 6-cijferige verificatecode in.',
    activate: 'Activeren'
  },

  personal_info: {
    profile_picture: 'Profielfoto',
    picture_requirement_1: 'Zoek alstublieft van jezelf een afbeelding met hoger qualiteit',
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
    postcode_tooltip: "Only Dutch postcodes are accepted (four digits followed by two uppercase letters, i.e. 1234AB). Uw locatie zal verschijnen op de map van de 'Zoek een kattenoppas' pagina wanneer u uw kattenoppas profiel hebt uitgewerkt",
    social_media: 'Sociale media',
    optional: 'Optioneel',
    facebook: 'Facebook profiel',
    instagram: 'Instagram profiel',
    other: 'Andere profiel',
  },

  sitter_form: {
    view_profile: 'Bekijk mijn openbare oppasprofiel',

    about_me: 'Over mij',
    about_me_description: 'Tell cat owners about yourself. Start with a little description of yourself - What do you do for a living? Why do you want to be a cat sitter?',
    experience: 'Ervaring',
    experience_description: 'Please select relevant experience / skills you possess. For every item selected, please briefly explain the details in the text box below.',
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
    you_make: 'You will make € {{euros}}',

    availability: 'Beschikbaarheid',
    availability_description: 'Selecteer de datums wanneer u niet beschikbaar bent, zodat katteneigenaren u aanvragen gebaseerd op je beschikbaarheid kunnen verzenden.',
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
    share_picture: 'Toon een foto van je kat aan kattenoppassers!',
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
    receive_sitting_jobs: 'U zal alleen oppas aanvragen ontvangen wanner een katteneigenaar ze zend.',
    no_service: 'U hebt geen afspraak {{status}} op het moment',
    go_to: 'Ga naar de',
    find_sitter: 'pagina om een katoppas te zoeken.',

    requested: 'Aangevraagd',
    await_acceptance: 'Wacht tot de kattenoppas de booking accepteert',
    decline: 'Weigerde',
    decline_confirm:
      'Klik op "Ok" om de afspraak te weigeren. De status van deze boeking zal veranderen van "Aangevraagd" naar "Weigerde".',
    accept: 'Accepteren',
    accept_confirm:
      'Klik op "Ok" om de afspraak te accepteren. De status van deze boeking zal veranderen van "Aangevraagd" naar "Bevestigd".',
    confirmed: 'Bevestigd',
    await_payment: 'Wachten tot de betaling van de kat eigenaar',
    pay_now: 'Nu betalen',

    complete: 'Afspraak voltooid',
    complete_confirm: 'Klik op "Ok" om de afspraak te voltooien. De status van deze boeking zal veranderen van "Bevestigd" naar "Voltooid". Je kan nu een recensie achterlaten.',
    completed: 'Voltooid',
    await_completion: 'Wacht tot een kattenoppas de voltooiïng van een oppas bevestigd',
    write_review: 'Schrijf een recensie',

    declined: 'Geweigerd',

    sitter: 'Oppas',
    owner: 'Eigenaar',
    type: 'Type',
    one_day_appointment: 'One-day appointment',
    overnight_appointment: 'Overnight appointment',
    location: 'Locatie',
    time: 'Tijd',
    price: 'Prjs',
  },

  pay: {
    title: 'Betalen',
  },

  review: {
    title: 'Beoordeel en recenseer',
    booking_information: 'Boekingsinformatie',
    describe_experience: 'Beschrijf uw ervaring',
    reminder: 'Je review zal publiekelijk gemaak worden op de reviewers openbaar profiel',
    give_rating: 'Geef je beoordeling'
  },

  chats: {
    no_chats: 'Geen berichten',
    if_sitter: 'Ben je een oppasser, dan kunnen alleen eigenaren een bericht naar je sturen.',
    if_owner: 'Als u een eigenaar bent, start met het ',
    find_sitter: 'zoeken van een katoppas',
    view_owner_profile: 'Eigenaarsprofiel kijken',
    view_sitter_profile: 'Oppasprofiel kijken',
  },

  auto_message: {
    reminder: 'Herinnering - Laat een recensie achter',
    booking_requested: 'Boeking is geaccepteerd door {{owner}}',
    booking_accepted: 'Booking has been accepted by {{sitter}}',
    booking_declined: 'Boeking is geweigerd door {{sitter}}',
    booking_completed: 'Boeking is gemarkeerd als voltooid door {{sitter}}',
    you: 'jou'
  }
};
