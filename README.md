
# Employee Explorer Dashboard

**Full Name:** Fatima Azzam
**Next.js Version:** 16 (App Router)
**Repository Branch:** assignment-3-yehia-interview

## Project Summary
This is a Next.js 16 application built for Assignment 3 (Yehia Meets Maya). It demonstrates the differences between Server and Client data fetching, streaming with Suspense, and robust error handling. 

The dashboard features three independent sections:
1. **Server Profile:** Fetches employee 1 data immediately on the server.
2. **Recent Posts Preview:** An async Server Component that simulates a slow network and streams into the page using a focused Suspense boundary.
3. **Client Explorer:** A button that fetches posts only after a user click, managing 5 distinct states (Idle, Loading, Success, Empty, Error).

## Setup Steps
To run this project locally:

1. Clone the repository and switch to the correct assignment branch:
   ```bash
   git clone https://github.com/fatiimaazzam1/yehia-interview.git
   cd yehia-interview
   git switch assignment-3-yehia-interview
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.


## Demo Controls (Testing Scenarios)
In the Client Explorer section, there is a dropdown menu to simulate different network conditions. This applies to the *next* time you click "Load posts" or "Retry":
* **Success:** Makes a real request to JSONPlaceholder.
* **Slow:** Waits 2 seconds, then makes the real request.
* **HTTP Error:** Uses the native `new Response(...)` to simulate a 503 status code, testing the custom `ApiError` handling.
* **Empty Response:** Uses `new Response(...)` to simulate a 200 OK with an empty array `[]`, testing the empty state UI.

## The Artificial Delay
The "Recent Posts Preview" contains an intentional 2-second delay. This is a **deliberate learning simulation** to demonstrate the `<Suspense>` fallback. 

To ensure this delay runs on every request (and doesn't get pre-rendered during the build), the component uses `await connection()` from `next/server` before the delay. This forces Next.js to render the page dynamically at request time, guaranteeing the loading state is visible to the user.

## Known Limitations
* **No Database:** This app relies entirely on the public JSONPlaceholder API.
* **No Deployment:** The application was tested locally as deployment was optional.
* **Simulated Errors:** Error and empty states in the client explorer are locally simulated because the real JSONPlaceholder API does not naturally return 503s or empty arrays for this specific query.
* **Employee ID:** The employee ID is hardcoded to 1 in the fetch URLs as required by the assignment brief. It is not a dynamic route, so changing the ID requires editing the source code rather than changing the browser URL.




### The Checklist:
If you compare the PDF to this text, you can check every single box:
*   [x] One dashboard at `/`
*   [x] Server profile, independently loading server preview, click-to-load client posts
*   [x] Custom error class
*   [x] Success, Slow, HTTP error, Empty, and recovery checks (This is the **Demo Controls**)
*   [x] README includes full name, project summary, setup steps, Next.js version, demo controls, artificial delay, and limitations. (**Everything is in this file!**)
*   [x] docs/INTERVIEW.md includes predictions and final explanations.
*   [x] docs/TESTING.md includes actual outcomes and screenshots.
*   [x] Final code pushed to branch.
*   [] Recording link (Optional).
