// TEMP diagnostic: live EmailJS end-to-end test (reads server/.env, sends one email)
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const { sendReply } = require("../utils/emailService");

(async () => {
  console.log("EmailJS env check:", {
    service: process.env.EMAILJS_SERVICE_ID,
    template: process.env.EMAILJS_TEMPLATE_ID,
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
    privateKey: process.env.EMAILJS_PRIVATE_KEY ? "SET" : "MISSING",
  });
  try {
    const result = await sendReply({
      to: process.env.RECIPIENT_EMAIL || process.env.ADMIN_EMAIL,
      subject: "✅ EmailJS live test (SEKA portfolio)",
      body: "If you received this in your inbox, EmailJS is fully working: keys OK, template OK, To-email = {{to_email}} OK. Render will now send email without SMTP.",
      fromName: "SEKA Portfolio Test",
    });
    console.log("RESULT:", JSON.stringify(result, null, 2));
    console.log(result.delivered ? "EMAILJS_TEST_OK" : "EMAILJS_TEST_FAILED");
  } catch (e) {
    console.error("EMAILJS_TEST_ERROR:", e.message);
  }
  process.exit(0);
})();