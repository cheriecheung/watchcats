export default {
  error: {
    generic: 'Error occured. Please try again.',

    email_exists: 'Email already exists.',

    login_failed: 'Unable to login. Please try again.',
    login_credentials_invalid: 'Email and password combination is incorrect.',

    phone_exists: 'Phone number is used by another account.',
    code_verify_failed: 'Unable to verify code.',
    phone_submission_failed: 'Unable to submit phone number. Please try again.',
    phone_saving_failed: 'Unable to save phone. Please try again.',

    password_reset_failed: 'Unable to reset password. Please try again.',

    otp_expired: 'You enter an expired code. Click "Resend code" to get a new one.',
    otp_invalid: 'Invalid code.',
    two_factor_activation_failed: 'Unable to activate 2FA. Please try again.',
  },

  success: {
    register: 'Registration successful. A link to activate your account has been sent to the email provided.',
    notification_setting: 'Notification setting updated',
    password_reset: 'You have successfully reset your password.',
    '2FA_enabled': 'You have enabled 2-factor authentication. You will now need to login by phone on top of logging in by email and password.',
    '2FA_disabled': 'You have disabled 2-factor authentication. You will now only log in by email and password.'
  },

  header: {
    home: 'Home',
    find_sitter: 'Find a cat sitter',
    about: 'About',
    bookings: 'Bookings',
    messages: 'Chats',
    account: 'Account',
    login: 'Login',
    logout: 'Logout',
  },

  home: {
    i_am: 'I am a...',
    owner_finds_sitter: 'Cat owner looking for a cat sitter',
    sitter_finds_owner: 'Cat sitter looking for homes to sit.',
  },

  form: {
    no_empty: "Field can't be empty",
    only_alphabet: 'Enter alphabets only',
    or: 'OR',
    email: 'Email address',
    password: 'Password',
    first_name: 'First name',
    last_name: 'Last name',
    save: 'Save',
    submit: 'Submit',
    reset: 'Reset',
  },

  login: {
    login: 'Login',
  },

  register: {
    register: 'Register',
    password_instruction: 'Password should be 8 to 12 characters',
  },

  forgot_password: {
    response:
      'If that email address is in our database, we will send you an email to reset your password.',
  },

  find_sitter: {
    address: 'Address',
    start_date: 'Start date',
    end_date: 'End date',
    review: 'Review',
    reviews: 'Reviews',
    distance: 'Distance',
    price: 'Price',
    reset: 'Reset',

    // no 's if only one result
    showing: '{{total}} cat sitters found',
    no_results: 'No cat sitters found',
    new_member: 'New member',
    completed_booking: 'Completed booking',
    completed_bookings: 'Completed bookings',
    repeated_customer: 'Repeated customer',
    repeated_customers: 'Repeated customers',
    view_profile: 'View profile',
  },

  profile_summary: {
    verified: 'Verified',
    id_verified: 'ID verified',
    phone_verified: 'Phone verified',
    address_verified: 'Address verified',
  },

  sitter_profile: {
    send_message: 'Send message',
    request_appointment: 'Request an appointment',
    appointment_type: 'Appointment type',
    one_day: 'One day',
    overnight: 'Overnight',
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
    settings: 'Settings',
    general_info: 'General info',
    sitter_profile: 'Cat sitter profile',
    owner_profile: 'Cat owner profile',
  },

  settings: {
    contact_details: 'Contact details',
    reveal: 'Reveal',
    hide: 'Hide',
    edit: 'Edit',
    add: 'Add',
    remove: 'Remove',
    receive_notifications: 'Receive notifications',
    email: 'Email',
    phone: 'Phone number',
    receive_sms_code: 'You will receive an SMS with a verification code.',
    save_phone_description: 'Your phone number is only used for verification and notifications. It will not be shared to anyone on this application',
    enter_sms_code: 'Enter the 6-digit code we sent to your phone via SMS.',
    code_to_expire: ' The code will expire in 2 minutes.',
    resend_code: 'Resend code',

    stripe_account: 'Stripe Account',
    payment_description: 'To send and / or receive payments, please set up payouts on Stripe. Clicking below will guide you to a secure online form which will guide you to connect your bank account.',
    setup_payouts: 'Set up payouts',

    authentication: 'Password and Authentication',
    not_available: 'Not available for accounts login via Google',
    password: 'Password',
    password_description: 'Update your password for the next time you log in.',
    change_password: 'Change password',
    current_password: 'Current password',
    new_password: 'New password',
    repeat_new_password: 'Repeat new password',

    two_factor_auth: 'Two-factor authentication',
    '2FA_description': ' Protect your account with an extra layer of security. Once configured, you\'ll be required to enter both your password and an authentication code from your mobile phone in order to sign in.',
    '2FA_enabled': 'You have already enabled two factor authentication',
    disable_2FA: 'Disable 2FA',
    enable_2FA: 'Enable 2FA',
    enable_2FA_description: 'Make your account safer in three easy steps',
    enable_2FA_step1: '1. Download an authenticator app',
    enable_2FA_step1_detail1: 'Download and install ',
    enable_2FA_step1_detail2: ' for your phone or tablet.',
    enable_2FA_step2: '2. Scan the QR code',
    enable_2FA_step2_detail: 'Open the authenticator app and scan the image to the left using your phone\'s camera.',
    enable_2FA_step3: '3. Log in met je code',
    enable_2FA_step3_detail: 'Enter the 6-digit verification code generated.',
    activate: 'Activate'
  },

  general_info: {
    profile_picture: 'Profile picture',
    picture_requirement_1: 'Please choose a high quality picture of yourself',
    picture_requirement_2: 'No filters, effects or stickers applied to the image',
    picture_requirement_3: 'Best image format JPG, JPEG, PNG',
    picture_requirement_4: 'Minimum size 360 x 254 pixels',

    personal_info: 'Personal info',
    first_name: 'First name',
    last_name: 'Last name',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    address_tooltip: 'Your address will not be shared with anyone in any manner',
    postcode: 'Postcode',
    postcode_tooltip: "Once submitted, your location will appear in the map on 'Find Cat Sitter' page",

    social_media: 'Social media',
    optional: 'Optional',
    facebook: 'Facebook profile',
    instagram: 'Instagram profile',
    other: 'Other profile',
  },

  sitter_form: {
    view_profile: 'View my public cat sitter profile',

    about_me: 'About me',
    about_me_description:
      'Tell cat owners about yourself. Start with a little description of yourself - What do you do for a living? Why do you want to be a cat sitter?',

    experience_serivce: 'Experience and service',
    experience_description:
      'Please select relevant experience / skills you possess. For every item selected, please briefly explain the details in the text box below.',
    has_cat: 'Owns / owned a cat',
    volunteer: 'Has done volunteer work',
    medication: 'Able to administer medication',
    injection: 'Able to do injections',
    certificate: 'Has animal care certification',
    grooming: 'Has pet grooming skills',

    pricing: 'Pricing',
    one_day: 'One day visit',
    per_hour: '/ hour',
    overnight: 'Overnight visit',
    per_night: '/ night',

    availability: 'Availability',
    availability_description:
      'Select the dates that you are not available, so that cat owners can send you requests based on your availability.',
    available: 'Available',
    unavailable: 'Unavailable',
  },

  owner_form: {
    view_profile: 'View my public cat owner profile',

    about_me: 'About me',
    about_me_description: 'Tell cat sitters about yourself. Start with a little description of yourself - What do you do for a living? Why are you looking for a cat sitter?',

    appointment: 'Cat sitting appointment',
    one_day: 'One day visit {{index}}',
    maximum_one_day: 'You can at most request 2 one-day appointments at the same time!',
    date: 'Date',
    start_time: 'Start time',
    end_time: 'End time',
    overnight: 'Overnight visit {{index}}',
    maximum_overnight: 'You can at most request 2 overnight sitting appointments at the same time!',
    start_date: 'Start date',
    end_date: 'End date',
    add_period: 'Add period',
    remove: 'Remove',

    about_cat: 'About my cat',
    picture: 'Picture',
    share_picture: 'Show a picture of your cat to cat sitters!',
    name: 'Name',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    medical_needs: 'Medical needs',
    injection: 'Injection',
    pill: 'Pill',
    vaccinated: 'Vaccinated',
    insured: 'Insured',
    yes: 'Yes',
    no: 'No',
    breed: 'Breed',
    favourite_treat: 'Favourite treat',
    personality: 'Personality that fits your cat the best',
    pictures: 'Pictures of your cat',
    upload: 'Upload',
    add_cat: 'Add cat',
    cat_index: 'And my #{{index}} cat',
    maximum_cat: 'If you have 5 or more cats, perhaps you would want to consider having them stay at a pet hotel, so they can all be taken care of by full time staff!',

    cat_description: 'Description of my cat(s)',
    cat_description_text:
      'Please write a description about your cat(s) - include their feeing, litter, playtime routine, and other needs. It is also important to include your vets details should the cat sitter needs to get hold if them.',

  },

  cat_breed: {
    abyssinian: 'Abyssinian',
    bengal_cat: 'Bengal cat',
    birman: 'Birman',
    burmese: 'Burmese',
    british_shorthair: 'British shorthair',
    devon_rex: 'Devon Rex',
    exotioc: 'Exotic',
    maine_coon: 'Maine Coon',
    moggy: 'Moggy',
    oriental: 'Oriental',
    persian: 'Persian',
    ragdoll: 'Ragdoll',
    siamese: 'Siamese',
    sphynx: 'Sphynx',
    tabby: 'Tabby',
    other: 'Other',
  },



  bookings: {
    // sitting_jobs: 'Sitting jobs for me',
    // sitting_service: 'Sitting service for my cat',
    as_cat_sitter: 'As a cat sitter',
    as_cat_owner: 'As a cat owner',

    requested: 'Requested',
    decline: 'Decline',
    decline_confirm:
      'Click "OK" to confirm the booking decline. It is recommended that you write the cat owner about the reason you reject the booking',
    accept: 'Accept',
    accept_confirm:
      'Click "OK" to confirm the booking acceptance. The status of this booking will be changed from "Requested" to "Confirmed".',

    confirmed: 'Confirmed',
    cancel: 'Cancel',
    cancel_confirm:
      'Click "OK" to confirm the booking cancellation. Make sure to inform the cat owner about the cancellation and the reason.',
    pay_now: 'Pay now',
    complete: 'Appointment completed',
    complete_confirm:
      'Click "OK" to confirm the booking completion. The status of this booking will be changed from "Confirmed" to "Completed". You will be able to write the cat sitter a review.',

    completed: 'Completed',
    write_review: 'Write a review',

    declined: 'Declined',

    view_profile: 'View profile',
    view_conversation: 'View conversation',

    sitter: 'Sitter',
    owner: 'Owner',
    location: 'Location',
    time: 'Time',
    price: 'Price',
  },
};
