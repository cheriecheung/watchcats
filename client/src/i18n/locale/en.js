export default {
  api_error: {
    generic: 'Error occured. Please try again.',

    auth_rate_limited: 'You are being rate limited. Please try again in 30 minutes.',
    form_rate_limited: 'You are being rate limited. Please try again in 5 minutes.',

    email_exists: 'Email already exists.',
    password_incorrect: 'You submitted the incorrect password.',
    password_reset_failed: 'Unable to reset password. Please try again.',

    login_failed: 'Unable to login. Please try again.',
    login_credentials_invalid: 'Email and password combination is incorrect.',

    google_login_failed: 'Google login failed',
    google_login1: 'An error has occured',
    google_login2: 'the email you used was locally registered on Watch Cats.',
    google_login3: '(i.e. please use the local login)',
    google_login_redirect: 'You will be redirected to the login page in 5 seconds...',

    phone_exists: 'Phone number is used by another account.',
    code_verify_failed: 'Unable to verify code.',
    phone_submission_failed: 'Unable to submit phone number. Please try again.',
    phone_saving_failed: 'Unable to save phone. Please try again.',

    otp_expired: 'You enter an expired code. Click "Resend code" to get a new one.',
    otp_invalid: 'Invalid code.',
    two_factor_activation_failed: 'Unable to activate 2FA. Please try again.',
  },

  form_error: {
    field_required: 'Required field',
    email_format: 'Invalid email format',
    address_required: 'Enter an address',
    postcode_format: 'Invalid postcode format. A Dutch postcode consists of four digits followed by a space and two uppercase letters, e.g. 1234 AB',
    date_order: 'End date must be after start date',
    time_order: 'End time must be after start time',
    select_gender: 'Select a gender',
    select_option: 'Select an option',
    password_critera: 'Make sure your password pass all the criteria',
    same_old_password: 'New password cannot be the same as current password',
    new_passwords_unmatched: 'New passwords must match',
    review_length: 'Please write a longer review',
  },

  success: {
    register1: 'Registration successful',
    register2: 'An activation link has been sent to your email address.',
    register3: 'Click the link (expires in an hour) to activate your account. You can then log in',
    check_spam_folder: 'If you do not receive the email within a few minutes, check your spam/junk folder.',
    reset_forgot_password: 'Your password has been reset successfully. You can now log in with your new password.',
    notification_setting: 'Notification setting updated',
    password_reset: 'Your password has been reset successfully.',
    phone_verified: 'You phone number has been verified successfully.',
    phone_removed: 'You phone number has been removed successfully.',
    '2FA_enabled': 'You have enabled 2-factor authentication successfully. You are now required to enter both your password and an authentication code from your mobile phone in order to sign in.',
    '2FA_disabled': 'You have disabled 2-factor authentication. You will now only log in by email and password.',
    booking_request: 'You have successfully sent your booking request.',
    review: 'You have successfully submitted a review. You will now be redirected back to the booking page.'
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

  footer: {
    made_with: 'Made with',
    by: 'by',
  },

  home: {
    find_sitter: 'Find your ideal cat sitter in town today!',
    welcome_back: 'Welcome back, {{name}}!'
  },

  form: {
    yes: 'Yes',
    no: 'No',
    or: 'OR',
    email: 'Email address',
    password: 'Password',
    first_name: 'First name',
    last_name: 'Last name',
    select: 'Select...',
    save: 'Save',
    submit: 'Submit',
    reset: 'Reset',
    ok: 'Ok',
    cancel: 'Cancel'
  },

  login: {
    title: 'Login',
    demo_user: 'Login as a demo user',
    forgot_password: 'Forgot password?',
    google_login: 'Login with Google',
    loading: 'Loading...',
    '2FA_login': 'Enter the 6-digit code in the Google Authenticator app on your phone.',
  },

  register: {
    title: 'Register',
  },

  account_activation: {
    success1: 'You have sucecssfully activated your account.',
    success2: 'You are now able to ',
    error_title: 'Expired or invalid activation link',
    error_description: 'Please enter your registered email below to get another link to activate your account.',
    response: 'If the provided email is in our database, a new activation link will be sent to it. Please be sure to check the spam / junk mailbox if it is not found in the main inbox'
  },

  reset_password: {
    title: 'Reset your password',
    new_password: 'New Password',
    repeat_password: 'Repeat password'
  },

  forgot_password: {
    instruction: 'To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.',
    response: 'If the provided email is in our database, a password reset link will be sent to it. The link will expire in 30 minutes.'
  },

  find_sitter: {
    address: 'Address',
    start_date: 'Start date',
    end_date: 'End date',
    review: 'Review',
    reviews: 'Reviews',
    distance: 'Distance',
    price: 'Price',
    per_hour: '/ hour',
    per_night: '/ night',
    reset: 'Reset',

    // no 's if only one result
    showing: 'Showing {{from}} - {{to}} of {{totalResults}} matches',
    no_results: 'No cat sitters found',
    new_member: 'New member',
    completed_booking: 'Completed booking',
    repeated_customer: 'Repeated customer',
    total_reviews: 'Total reviews',
    total_completed_bookings: 'Completed bookings',
    total_repeated_customers: 'Repeated customers',
    hourly_rate: 'Hourly rate',
    nightly_rate: 'Nightly rate',

    view_profile: 'View profile'
  },

  profile_summary: {
    email_verified: 'Email verified',
    phone_verified: 'Phone verified',
  },

  sitter_profile: {
    no_own_profile_action: 'You cannot do actions to your own profile',
    send_message: 'Send message',
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
    set_up_owner_profile: 'Please set up an owner profile first',
    no_owner_profile: 'You can only send a request to a cat sitter if you have a cat owner profile.',
    create_owner_profile1: 'To create your cat owner profile, go to the',
    create_owner_profile2: 'account',
    create_owner_profile3: 'page, and click on the \'Cat owner profile\' tab.',
    select_time: 'Select a time',
    existing_time: ' The following is/are the appointment time you previously filled out in your cat owner profile.',
    one_day_appointment: 'One-day appointment',
    overnight_appointment: 'Overnight appointment',
  },

  owner_profile: {
    sitter_needed: 'Sitter needed',
    one_day_appointment: 'One-day appointment',
    overnight_appointment: 'Overnight appointment',
    location: 'Location',
    feedback: 'Feedback from cat sitters',
  },

  account: {
    settings: 'Settings',
    personal_info: 'Personal info',
    sitter_profile: 'Cat sitter profile',
    owner_profile: 'Cat owner profile',
  },

  settings: {
    contact_details: 'Contact details',
    contact_details_tooltip: 'Via your email and/or phone, you can receive notifications when someone sends you a booking request; updates your booking status; or messages you. Your contact details will not be shared to anyone.',
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
    payment_description: 'To receive payment as a cat sitter, please set up payouts on Stripe. Clicking below will guide you to a secure online form which will guide you to connect your bank account.',
    setup_payouts: 'Set up payouts',
    edit_account: 'Edit account',

    authentication: 'Password and Authentication',
    not_available: 'Not available for accounts login via Google',

    password: 'Password',
    password_description: 'Update your password for the next time you log in.',
    change_password: 'Change password',
    password_criteria1: 'Your new password should have',
    password_criteria2: 'at least 8 characters',
    password_criteria3: 'a mixture of letters and numbers',
    password_criteria4: 'a mixture of both uppercase and lowercase letters',
    current_password: 'Current password',
    new_password: 'New password',
    repeat_new_password: 'Repeat new password',

    two_factor_auth: 'Two-factor authentication',
    two_factor_auth_as_demo_user: 'If you logged in as a demo user, 2FA can NOT be enabled. To test the feature, please make your own account.',
    '2FA_description': ' Protect your account with an extra layer of security. Once configured, you\'ll be required to enter both your password and an authentication code from your mobile phone to sign in.',
    '2FA_enabled': 'You have already enabled two factor authentication',
    disable_2FA: 'Disable 2FA',
    enable_2FA: 'Enable 2FA',
    enable_2FA_description: 'Make your account safer in three easy steps',
    enable_2FA_step1: '1. Download an authenticator app',
    enable_2FA_step1_detail1: 'Download and install ',
    enable_2FA_step1_detail2: ' for your phone or tablet.',
    enable_2FA_step2: '2. Scan the QR code',
    enable_2FA_step2_detail: 'Open the authenticator app and scan the image to the left using your phone\'s camera.',
    enable_2FA_step3: '3. Log in with your code',
    enable_2FA_step3_detail: 'Enter the 6-digit verification code generated.',
    activate: 'Activate'
  },

  personal_info: {
    profile_picture: 'Profile picture',
    picture_requirement_1: 'Please choose a high quality picture of yourself',
    picture_requirement_2: 'No filters, effects or stickers applied',
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
    postcode_tooltip: "Only Dutch postcodes are accepted (four digits followed by two uppercase letters, i.e. AB1234). Your location will appear in the map on 'Find Cat Sitter' page once you filled out your cat sitter profile",

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

    experience: 'Experience',
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
    you_make: 'You will make € {{euros}}',

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
    none: 'None',
    injection: 'Injection',
    pill: 'Pill',
    vaccinated: 'Vaccinated',
    insured: 'Insured',
    yes: 'Yes',
    no: 'No',
    breed: 'Breed',
    favourite_treat: 'Favourite treat',
    personality: 'Personality',
    pictures: 'Pictures of your cat',
    upload: 'Upload',
    add_cat: 'Add cat',
    cat_index: 'And my #{{index}} cat',
    maximum_cat: 'If you have 5 or more cats, perhaps you would want to consider having them stay at a pet hotel, so they can all be taken care of by full time staff!',

    responsibilities: 'Responsibilities',
    responsibilities_text:
      'Please write a description about your cat(s) - include their feeing, litter, playtime routine, and other needs. It is also important to include your vets details should the cat sitter needs to get hold if them.',

  },

  cat_breed: {
    abyssinian: 'Abyssinian',
    bengal_cat: 'Bengal cat',
    birman: 'Birman',
    burmese: 'Burmese',
    british_shorthair: 'British shorthair',
    devon_rex: 'Devon Rex',
    exotic: 'Exotic',
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

  cat_personality: {
    outdoor_explorer: 'Outdoor explorer',
    outdoor_occasionally: 'Outdoor occasionally',
    indoor_playful: 'Indoor and playful',
    indoor_chilled: 'Indoor and chilled',
    others: 'Others'
  },

  bookings: {
    as_cat_sitter: 'As a cat sitter',
    as_cat_owner: 'As a cat owner',

    no_jobs: 'You have no {{status}} sitting jobs at the moment.',
    receive_sitting_jobs: 'You will only receive sitting jobs requests when a cat owner  sends you one.',
    no_service: 'You have no {{status}} sitting service at the moment. ',
    go_to: 'Go to',
    find_sitter: 'to start looking for a cat sitter now.',

    requested: 'Requested',
    await_acceptance: 'Waiting for cat sitter to accept booking',
    decline: 'Decline',
    decline_confirm:
      'Click "OK" to decline the booking. It is recommended that you write the cat owner about the reason you reject the booking',
    accept: 'Accept',
    accept_confirm:
      'Click "OK" to accept the booking. The status of this booking will be changed from "Requested" to "Confirmed".',

    confirmed: 'Confirmed',
    await_payment: 'Waiting for cat owner to pay',
    pay_now: 'Pay now',

    complete: 'Appointment completed',
    complete_confirm:
      'Click "OK" to confirm the appointment completion. The status of this booking will be changed from "Confirmed" to "Completed". You will be able to write a review about your experience.',
    completed: 'Completed',
    await_completion: 'Waiting for cat sitter to complete sitting job',
    write_review: 'Write a review',

    declined: 'Declined',

    sitter: 'Sitter',
    owner: 'Owner',
    type: 'Type',
    one_day_appointment: 'One-day appointment',
    overnight_appointment: 'Overnight appointment',
    location: 'Location',
    time: 'Time',
    price: 'Price',
  },

  pay: {
    title: 'Pay',
    description: 'Below is the appointment you\'ll be paying for:',
  },

  review: {
    title: 'Rate and review',
    booking_information: 'Booking information',
    describe_experience: 'Describe your experience',
    reminder: 'Your review will be public on the reviewee\'s public profile',
    give_rating: 'Give your rating'
  },

  chats: {
    no_chats: 'No chats yet',
    if_sitter: 'If you\'re a sitter, only owners can write to you',
    if_owner: 'If you\'re an owner, start by',
    find_sitter: 'finding a sitter',
    view_owner_profile: 'View cat owner profile',
    view_sitter_profile: 'View cat sitter profile',
  },

  auto_message: {
    reminder: 'Reminder - Leave a review',
    booking_requested: 'A booking request is made by {{owner}}',
    booking_accepted: 'Booking has been accepted by {{sitter}}',
    booking_declined: 'Booking has been declined by {{sitter}}',
    booking_completed: 'Booking has been marked as completed by {{sitter}}',
    you: 'you'
  }
};
