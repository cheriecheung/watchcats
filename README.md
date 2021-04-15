# <img src="https://www.dropbox.com/s/afc3s0uo47fa7pi/logo.png?raw=1" width="250" />
Watch Cats app helps cat owners find their ideal cat sitter in designated cities (demo focuses on Amsterdam, the Netherlands).

This is a self-initiated project where everything is done independently. Through working on this project, I aim to challenge myself and grow as a developer.

Demo link: [https://watchcats.nl](https://watchcats.nl)

## 1. App Info

The project is put together by the following: 
&nbsp;        | Frontend     | Backend
------------- | ------------- | ------------- 
**Tech stacks**        | React.js, Redux, React Hooks  | Node.js, Express.js, Mongoose, MongoDB
**Hosting solutions**  | AWS S3 and CloudFront  | AWS Elastic Beanstalk
**Architecture**       | Model-view-viewmodel (MVVM) | Model-view-controller (MVC)
**Optimization**       | Lazy loading by React.lazy | Compression of files, requests and responses
**Security**       | Redirect to HTTPS (SSL), Input validation | Rate limiting, 2FA enabling, Input validation

&nbsp;  
The features of Watch Cats app includes:

 Features     | APIs and tools | Description
------------- | ------------- | ------------- 
Two-Factor Authentication | Speakeasy, Google Authenticator app | Verify users with one time password
Payment Gateway | Stripe (testing version) | Accept payments via bank transfer
Private chat | Socket.IO | Facilitate real-time messaging
Email / SMS notifications | Mailgun / Twilio | Notify users of new bookings or new private messages
Oauth-based Google login | Google APIs | Login with user's existing Google account
Map & Place Autocomplete | Google Maps API | Locate and display cat sitters on Google Maps
Multi-Language Support | i18n | Offer English and Dutch as display language options

## 2. Screen shots
### Home page
![alt text](https://www.dropbox.com/s/9z39eeihwfsdubp/01_home.png?raw=1)
&nbsp;  
### Find a cat sitter page
![alt text](https://www.dropbox.com/s/qvljyk7d7c98pt9/02_find_cat_sitter.png?raw=1)
&nbsp;  
### Account page - Sitter Profile
![alt text](https://www.dropbox.com/s/gbhacco3e2yd71x/05_account_sitter_info.png?raw=1)
&nbsp;  

-- More coming soon --

## 3. Activity diagram
The following portrays the booking system flow in the project:
![alt text](https://i.imgur.com/mMFN39H.png)
