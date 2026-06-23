import { test, expect } from '@playwright/test';
//import { apiPost, validateSuccess, validateLoginBody, validateSecurity, validateFailure } from 'Law-vriksh-Arch\utils\api-helper.js';


const EMAIL = '';
const PASS = '';
const DEVICE_ID = '11BwnGUw7gupnSkGW5h7PkGdoU3ueGx6dDU';
const ENDPOINT = 'https://dev-api.lawvriksh.in/api/auth/login';
const LOGOUT = 'https://dev-api.lawvriksh.in/api/auth/logout';

let response;

// 1. Login with correct credentials
// 2. Login with incorrect credentials
// 3. logout 



// test('LGN-02: Failed login with invalid credentials', async ({ request }) => {
//   response = await request.post(ENDPOINT, {

//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Referer': 'https://testing.lawvriksh.in/login', // Mimicking the browser
//     },
//     data: {
//       request: {
//         device_id: DEVICE_ID, // Use the ID from your logs
//         email: 'gpswazir@gmail.com',
//         password: 'wrongpassword',
//         remember_me: false
//       }
//     }
//   });

//   expect(response.status()).toBe(401);


//   // const data = await response.json();
//   // console.log("responseBody:", data);


// });



test('LGN-02: login with invalid credentials', async ({ request }) => {
  response = await request.post(ENDPOINT, {

    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Referer': 'https://testing.lawvriksh.in/login', // Mimicking the browser
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
  console.log("responseBody:", data);


});


// test('LGN-03: Logout', async ({ request }) => {

//   response = await request.post(ENDPOINT, {

//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Referer': 'https://testing.lawvriksh.in/login', // Mimicking the browser
//     },
//     data: {
//       request: {
//         device_id: DEVICE_ID, // Use the ID from your logs
//         email: EMAIL,
//         password: PASS,
//         remember_me: false
//       }
//     }
//   });

//   expect(response.status()).toBe(200);

//   const data = await response.json();
//   const token = data.access_token;  // token_type: 'bearer',


//   const logoutResponse = await request.post(LOGOUT, {

//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//       'Referer': 'https://dev-api.lawvriksh.in/api/auth/logout', // Mimicking the browser
//     },

//   });

//   console.log(`Logout Status Code: ${logoutResponse.status()}`);

//   // 3. Assertions to confirm the server accepted the logout request
//   expect(logoutResponse.status()).toBe(200);

//   // Safely check if the logout endpoint responds with JSON
//   const contentType = logoutResponse.headers()['content-type'];
//   if (contentType && contentType.includes('application/json')) {
//     const logoutData = await logoutResponse.json();
//     console.log("Logout Response Body:", logoutData);
//   } else {
//     console.log("Logout successful, raw text response:", await logoutResponse.text());
//   }




// });










