# Initial Predictions

**1. Where will each of the three requests run?**
Employee Profile and Recent Posts Preview runs on the Server. However, Explore all posts runs after click on the Browser.

**2. What should remain visible while the server posts preview loads?**
Instead of displaying a placeholder while waiting to load Posts Preview, the page title, the employee profile and the button should stay visible.
Only the preview area should show a loading fallback.



**3. Will wrapping a click-handler fetch in Suspense automatically display its fallback?**
No. By the time the user clicks, the page is already fully rendered,  React is no longer
"building" anything, so Suspense has nothing to catch. A click happens AFTER rendering.
I think I will need to use useState to manually show a "Loading..." message when the
button is clicked.

**4. If an HTTP response has status 503, will `fetch` automatically throw?**
No. `fetch` only throws an error if it cannot reach the server at all (like a network 
failure or Wi-Fi being off). A 503 means the server DID reply, it just replied with an 
error message. `fetch` will treat this as a successful message delivery. I have to 
check `response.ok` myself, and if it is false (like a 503), I must manually throw 
an error in my code.