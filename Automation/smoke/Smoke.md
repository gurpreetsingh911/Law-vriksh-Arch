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