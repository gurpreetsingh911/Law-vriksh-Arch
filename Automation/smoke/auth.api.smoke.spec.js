import { test, expect } from '@playwright/test';
//import { apiPost, validateSuccess, validateLoginBody, validateSecurity, validateFailure } from 'Law-vriksh-Arch\utils\api-helper.js';


const EMAIL = 'gpswazir@gmail.com';
const PASS = 'ZXcvbnm@123';
const DEVICE_ID = '11BwnGUw7gupnSkGW5h7PkGdoU3ueGx6dDU';
const ENDPOINT = 'https://testing.lawvriksh.in/api/auth/login/';

let response;

// test('LGN-01: Successful login with valid credentials', async ({ request }) => {
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
//  // console.log("responseBody:", data);


// });


test('LGN-02: Failed login with invalid credentials', async ({ request }) => {
  response = await request.post(ENDPOINT, {

    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Referer': 'https://testing.lawvriksh.in/login', // Mimicking the browser
    },
    data: {
      request: {
        device_id: DEVICE_ID, // Use the ID from your logs
        email: 'gpswazir@gmail.com',
        password: 'wrongpassword',
        remember_me: false
      }
    }
  });

 expect(response.status()).toBe(401);


  // const data = await response.json();
  // console.log("responseBody:", data);


});
 









