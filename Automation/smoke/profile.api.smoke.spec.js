// This verifies that the server can communicate with the main user database.

// USR-01: Fetch logged-in user account settings

// What it does: Hits the endpoints related to your redirect path (/dashboard/user/settings).

// Expectation: Returns a 200 OK code along with the corresponding profile fields (verifying that things like the user's name or configurations display correctly upon dashboard load).



//https://dev-api.lawvriksh.in/dashboard/user/profile

// "profession": "Corporate Lawyer",
//             "email": "professional@lawvriksh.in",
//             "role": "professional",
//     "message": "User profile retrieved successfully",
// USR-01: Fetch logged-in user account settings


import { test, expect } from '@playwright/test';
//import { apiPost, validateSuccess, validateLoginBody, validateSecurity, validateFailure } from 'Law-vriksh-Arch\utils\api-helper.js';


const EMAIL = '';
const PASS = '';
const DEVICE_ID = '11BwnGUw7gupnSkGW5h7PkGdoU3ueGx6dDU';
const ENDPOINT = 'https://dev-api.lawvriksh.in/api/auth/login';
const USERPROFILE = 'https://dev-api.lawvriksh.in/api/users/profile';

let response;

test('USR-01: Fetch logged-in user account settings', async ({ request }) => {
  response = await request.post(ENDPOINT, {

    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Referer': 'https://dev-api.lawvriksh.in/api/auth/login', // Mimicking the browser
    },
    data: {
      request: {
        device_id: DEVICE_ID, // Use the ID from your logs
        email: EMAIL,
        password: PASS,
        remember_me: false
      }
    }
  });

  expect(response.status()).toBe(200);

  const data = await response.json();
   
  const token = data.data.access_token;  // token_type: 'bearer',

  //const two = data.token_type;  // token_type: 'bearer',

    
  //console.log("message:", token);



  const Userresponse = await request.get(USERPROFILE, {

    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Referer': USERPROFILE, // Mimicking the browser
    },

  });
  

    const second_data = await Userresponse.json();

    const message = second_data.message;  // message: 'User profile retrieved successfully',
    const profession = second_data.data.profile.profession;  // profession: 'Corporate Lawyer',
  const email = second_data.data.profile.email;  // email: '

    expect(email).toMatch(EMAIL);

    console.log("responseBody:", message, profession, email);
  







});