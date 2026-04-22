import { test, expect } from '@playwright/test';
//import { apiPost, validateSuccess, validateLoginBody, validateSecurity, validateFailure } from 'Law-vriksh-Arch\utils\api-helper.js';



const EMAIL = 'gpswazir@gmail.com';
const PASS = 'ZXcvbnm@123';
const DEVICE_ID = '97b2ecbc-35c9-4da9-aab3-690a8a5ea1bb';
const ENDPOINT = '/api/auth/login';



//test('LGN-01: Successful login with valid credentials', async ({ request }) => {


// test('LGN-01: Successful login with valid credentials', async ({ request }) => {


//   const response = await request.post(`https://app.lawvriksh.com/api/auth/login`, {

//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Referer': 'https://app.lawvriksh.com/login', // Mimicking the browser
//     },
//     data: {
//       request: {
//         device_id: "Web_browser_01", // Use the ID from your logs
//         email: "vadiya.tester@gmail.com",
//         password: "ZXcvbnm@123",
//         remember_me: false
//       }
//     }
//   });

//   const statusCode = response.status();
//   // console.log("Status Code:", statusCode);

//   const responseBody = await response.text(); // Get the raw response body as text
//   // console.log("Response Body:", responseBody); // Log the response body for debugging

//   // This ensures your test report shows a RED FAILURE if it's not 200
//   expect(statusCode, `Expected 200 but got ${statusCode}`).toBe(200);

//   const body = await response.json();
//   console.log(statusCode, "LGN-01 - Passed");
// });






test('LGN-01: Login with valid credentials', async ({ request }) => {
  const { statusCode, json, rawText } = await apiPost(request, ENDPOINT, {
    request: {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASS,
      device_id: DEVICE_ID,
      remember_me: false
    }
  });
  validateSuccess(statusCode, json, rawText);
  validateLoginBody(json);
  validateSecurity(json, PASS); // ← pass password directly
});









