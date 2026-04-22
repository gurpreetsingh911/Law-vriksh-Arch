import { expect } from '@playwright/test';

export async function apiPost(request, endpoint, body) {
  // Uses baseURL from playwright.config.js automatically
  const response = await request.post(endpoint, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: body,
  });

  const statusCode = response.status();
  const rawText    = await response.text();

  let json = null;
  try { json = JSON.parse(rawText); } catch {}

  return { statusCode, json, rawText };
}




export function validateSuccess(statusCode, json, rawText) {
  expect(statusCode, `❌ Expected 200\nBody: ${rawText}`).toBe(200);
  expect(json,         `❌ Not valid JSON\nRaw: ${rawText}`).not.toBeNull();
  expect(json.success, `❌ success should be true`).toBe(true);
  expect(json.data,    `❌ data block missing`).toBeTruthy();
  expect(json.errors,  `❌ errors should be null`).toBeNull();
}

export function validateLoginBody(json) {
  expect(json.data.access_token,  `❌ access_token missing`).toBeTruthy();
  expect(json.data.refresh_token, `❌ refresh_token missing`).toBeTruthy();
  expect(json.data.token_type,    `❌ token_type should be bearer`).toBe('bearer');
  expect(json.data.expires_in,    `❌ expires_in should be 1800000`).toBe(1800000);
  expect(json.data.user.user_id,  `❌ user_id missing`).toBeTruthy();
  expect(json.data.user.email,    `❌ email missing`).toBeTruthy();
}

export function validateFailure(statusCode, json, expectedStatus) {
  expect(statusCode,   `❌ Expected ${expectedStatus} but got ${statusCode}`).toBe(expectedStatus);
  expect(json.success, `❌ success should be false`).toBe(false);
  expect(json.message, `❌ error message should exist`).toBeTruthy();
}

// ✅ New — pass password in
export function validateSecurity(json, password) {
  if (!password) return; // skip if no password provided
  const str = JSON.stringify(json);
  expect(str, `❌ password exposed in response`).not.toContain(password);
}