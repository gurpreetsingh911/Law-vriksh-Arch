import { test, expect } from '@playwright/test';
//import { apiPost, validateSuccess, validateLoginBody, validateSecurity, validateFailure } from 'Law-vriksh-Arch\utils\api-helper.js';


const EMAIL = 'gpswazir@gmail.com';
const PASS = 'ZXcvbnm@123';
const DEVICE_ID = '11BwnGUw7gupnSkGW5h7PkGdoU3ueGx6dDU';
const ENDPOINT = 'https://testing.lawvriksh.in/api/auth/login/';

let response;

 test('LGN-03: Logout', async ({ request }) => {
  response = await request.post('https://dev-api.lawvriksh.in/api/auth/logout', {

    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Referer': 'https://dev-api.lawvriksh.in/api/auth/logout', // Mimicking the browser
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

  //expect(response.status()).toBe(200);


  const data = await response.json();
  console.log("responseBody:", data);


});



