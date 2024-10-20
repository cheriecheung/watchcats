# <img src="https://github.com/user-attachments/assets/fa24c57b-ad97-4b19-bedd-90a98b01eb35" width="250" />
Watch Cats app helps cat owners find their ideal cat sitter in designated cities (demo focuses on Amsterdam, the Netherlands).

This is a self-initiated project where everything is done independently. Through working on this project, I aim to challenge myself and grow as a developer.

Demo link: [https://watchcats.nl](https://watchcats.nl) (currently not deployed anymore!)

## 1. App Info

The project is put together by the following: 
&nbsp;        | Frontend     | Backend
------------- | ------------- | ------------- 
**Tech stacks**        | React.js, Redux, React Hooks  | Node.js, Express.js, Mongoose, MongoDB
**Hosting solutions**  | AWS S3 and CloudFront  | AWS Elastic Beanstalk
**Architecture**       | Model-view-viewmodel (MVVM) | Model-view-controller (MVC)
**Optimization**       | Lazy loading by React.lazy | Compression of files, requests and responses
**Security**       | Redirect to HTTPS (SSL), [Input validation](https://github.com/cheriecheung/watchcats/blob/3c3f85b06f5c615c876663519b916ef8c1d0732b/client/src/views/Authentication/_formConfig/_validationSchema.js) | [Rate limiting](https://github.com/cheriecheung/watchcats/blob/master/server/helpers/limiter.js), 2FA enabling, [Input validation](https://github.com/cheriecheung/watchcats/blob/3c3f85b06f5c615c876663519b916ef8c1d0732b/server/helpers/validation.js)

&nbsp;  
The features of Watch Cats app includes:

 Features     | APIs and tools | Description
------------- | ------------- | ------------- 
[Two-Factor Authentication](https://github.com/cheriecheung/watchcats/blob/master/server/controllers/TwoFactorAuthController.js) | Speakeasy, Google Authenticator app | Verify users with one time password
[Payment Gateway](https://github.com/cheriecheung/watchcats/blob/master/server/controllers/PaymentController.js) | Stripe (testing version) | Accept payments via bank transfer
[Private chat](https://github.com/cheriecheung/watchcats/blob/master/server/controllers/ChatController.js) | Socket.IO | Facilitate real-time messaging
[Email](https://github.com/cheriecheung/watchcats/blob/master/server/helpers/mailer.js) / [SMS notifications](https://github.com/search?q=repo%3Acheriecheung%2Fwatchcats+twilio&type=code) | Mailgun / Twilio | Notify users of new bookings or new private messages
[Oauth-based Google login](https://github.com/cheriecheung/watchcats/blob/master/server/controllers/AuthController.js) | Google APIs | Login with user's existing Google account
[Map](https://github.com/cheriecheung/watchcats/blob/master/client/src/components/Google/Maps/index.js) & [Place Autocomplete](https://github.com/cheriecheung/watchcats/blob/master/client/src/components/Google/PlaceAutocomplete.js) | Google Maps API | Locate and display cat sitters on Google Maps
[Multi-Language Support](https://github.com/cheriecheung/watchcats/blob/master/client/src/i18n/i18n.js) | i18n | Offer English and Dutch as display language options

### Home page
![alt text](https://github.com/user-attachments/assets/07c33cb7-9621-4f5d-b0bf-b1b88122cab3)
&nbsp;  
### Find a cat sitter page
![alt text](https://github.com/user-attachments/assets/b805bebd-933a-4260-8b55-2e63eba8e72a)
&nbsp;  
### Account page - Sitter Profile
![alt text](https://github.com/user-attachments/assets/8942c902-21de-408b-ba18-7c7a1cd351c3)
&nbsp;

-- More coming soon --

## 3. Activity diagram
The following portrays the booking system flow in the project:
![alt text](https://i.imgur.com/mMFN39H.png)
