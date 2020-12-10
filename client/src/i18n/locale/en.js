export default {
  error: {
    generic: 'Error occured.',

    phone_exists: 'Phone number is used by another account.',
    code_verify_failed: 'Unable to verify code.',
    phone_submit_failed: 'Unable to submit phone number. Please try again.',
    phone_save_failed: 'Unable to save phone. Please try again.',

    password_reset_failed: 'Unable to reset password. Please try again.',

    otp_invalid: 'erkeerde verificatiecode.',
    activation_failed: 'Unable to activate 2FA. Please try again.',
  },

  header: {
    find_sitter: 'Find a cat sitter',
    about: 'About',
    bookings: 'Bookings',
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
    reset: 'Reset',
  },

  login: {
    login: 'Login',
    // response: 'Login failed; Invalid user ID or password.',
    error_message: '',
  },

  register: {
    register: 'Register',
    // response: 'A link to activate your account has been emailed to the address provided.',
    success_message: '',
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

    showing: (total) => `Showing ${total} cat sitter`,
    no_results: 'No cat sitters can be found',
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
    general_info: 'General info',
    sitter_profile: 'Cat sitter profile',
    owner_profile: 'Cat owner profile',
    settings: 'Settings',
  },

  general_info: {
    profile_picture: 'Profile picture',

    personal_info: 'Personal info',
    first_name: 'First name',
    last_name: 'Last name',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    postcode: 'Postcode',

    social_media: 'Social media',
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
    one_day: 'One day visit',
    date: 'Date',
    start_time: 'Start time',
    end_time: 'End time',
    overnight: 'Overnight visit',
    start_date: 'Start date',
    end_date: 'End date',
    add_period: 'Add another period',
    remove: 'Remove',

    about_cat: 'About my cat',
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
    pictures: 'Pictures of your cat',
    upload: 'Upload',
    add_cat: 'Add another cat',

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

  settings: {
    payment_method: 'Payment method',
    add_card: 'Add credit / debit card',
    card_number: 'Card number',
    expiry_date: 'Expiry date',
    add_bank_account: 'Add bank account',

    change_password: 'Change password',
    current_password: 'Current password',
    new_password: 'New password',
    repeat_new_password: 'Repeat new password',

    two_factor_auth: 'Two-factor authentication',
    two_factor_auth_description: '',
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
