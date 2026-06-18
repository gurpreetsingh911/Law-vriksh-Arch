// This verifies that the server can communicate with the main user database.

// USR-01: Fetch logged-in user account settings

// What it does: Hits the endpoints related to your redirect path (/dashboard/user/settings).

// Expectation: Returns a 200 OK code along with the corresponding profile fields (verifying that things like the user's name or configurations display correctly upon dashboard load).



//https://dev-api.lawvriksh.in/dashboard/user/profile

"profession": "Corporate Lawyer",
            "email": "professional@lawvriksh.in",
            "role": "professional",
    "message": "User profile retrieved successfully",
USR-01: Fetch logged-in user account settings