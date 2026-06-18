Test cases link -https://docs.google.com/spreadsheets/d/1w5iq_lM6r0qKrIY1KPakdewrCpk9X4cCRnBXwx0ZgnA/edit?gid=452880375#gid=452880375

Check .env  file -> node -e "require('dotenv').config(); console.log(process.env.USER_EMAIL)"


tests/
│
├── tests/
└── api/
    └── smoke/
        ├── auth.api.smoke.spec.js - Done
        ├── profile.api.smoke.spec.ts
        ├── cases.api.smoke.spec.ts
        ├── docs.api.smoke.spec.ts
        ├── search.api.smoke.spec.ts
        ├── notify.api.smoke.spec.ts
        └── health.api.smoke.spec.ts
│
├── regression/
│   ├── login.regression.spec.ts
│   ├── draft.regression.spec.ts
│   └── search.regression.spec.ts
│
├── e2e/
│   ├── user-flow.spec.ts
│   └── publish-flow.spec.ts
│
├── api/
│   ├── auth.api.spec.ts
│   └── search.api.spec.ts
│
├── performance/
│   └── jmeter/
│
└── utils/
    ├── helpers.ts
    ├── fixtures.ts
    └── test-data.ts




    🔑 1. Authentication & Session Management (Completed)
You already have these handled! They ensure users can enter and exit the application securely.

LGN-01: Successful login with valid credentials (Happy Path).

LGN-02: Rejection of login with invalid credentials (Security Guard).

LGN-03: Successful programmatic logout (Session Cleanup).

💳 2. Subscription & Gatekeeping (Crucial for Revenue)
Since the app blocks certain settings or dashboards based on subscription status, you must ensure the gating mechanics are online.

SUB-01: Fetch current active subscription status

What it does: Fires a GET request to /api/subscriptions/my-subscription?user_id=... using a valid auth token.

Expectation: Returns a 200 OK status with valid subscription payload keys (e.g., plan type, expiry date).

SUB-02: Enforce Paywall/Unauthorized restriction

What it does: Tries to access the subscription endpoint without an authorization header.

Expectation: Returns a 401 Unauthorized or 403 Forbidden status code (verifying that unauthorized users can't sneak past data walls).

🧑‍💻 3. User Profile & Settings Dashboard
This verifies that the server can communicate with the main user database.

USR-01: Fetch logged-in user account settings

What it does: Hits the endpoints related to your redirect path (/dashboard/user/settings).

Expectation: Returns a 200 OK code along with the corresponding profile fields (verifying that things like the user's name or configurations display correctly upon dashboard load).

⚖️ 4. Core Product Feature (Legal Document / Question Querying)
Looking at your previous interface capture, the central feature of the user portal is titled "Ask a question" or analyzing a legal matter. If this core feature fails, the app is effectively down.

CORE-01: Validate search query / legal question submission initialization

What it does: Simulates a query action payload (or fetches existing listed matters like "Sharma vs Union").

Expectation: The server responds with a valid 200 OK containing data arrays.

CORE-02: Personal DB / Document Vault access

What it does: Attempts to fetch available reference documents from the private document vault dropdown.

Expectation: Asserts that the document collection array returns successfully (even if empty, the API array response structure must be valid).

📋 Recommended Smoke Suite Execution Order
To build a highly efficient automation cycle, you should run these test cases in a logical chain where one setup step flows into the next:

Code snippet
graph TD
    A[LGN-01: Login & Get Token] --> B[USR-01: Check Profile Settings]
    A --> C[SUB-01: Verify Active Subscription]
    A --> D[CORE-01: Check Document/Matter Vault]
    B & C & D --> E[LGN-03: Destroy Token via Logout]
By verifying these specific endpoints across Authentication, Subscriptions, Profiles, and Queries, you cover 95% of what keeps the platform operational during an automated environment deployment check.