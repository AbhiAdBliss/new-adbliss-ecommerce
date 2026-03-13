// backend/utils/sendOtpEmail.js

const nodemailer = require("nodemailer");

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const otpDigits = String(otp).split("").map(d => `
    <span style="
      display: inline-block;
      width: 48px;
      height: 56px;
      line-height: 56px;
      text-align: center;
      font-size: 26px;
      font-weight: 800;
      color: #1a56db;
      background: #eff6ff;
      border: 2px solid #bfdbfe;
      border-radius: 10px;
      margin: 0 4px;
      letter-spacing: 0;
      font-family: 'Courier New', monospace;
    ">${d}</span>
  `).join("");

  const mailOptions = {
    from: `Shopnbliss <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔐 Your OTP Code – Shopnbliss",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification – Shopnbliss</title>
</head>
<body style="
  margin: 0; padding: 0;
  background-color: #f0f4f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f0f4f8; padding: 40px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px;">

          <!-- ── HEADER ── -->
          <tr>
            <td style="
              background: linear-gradient(135deg, #1a56db 0%, #0e3fb5 100%);
              border-radius: 16px 16px 0 0;
              padding: 36px 40px 32px;
              text-align: center;
            ">
              <!-- Logo area -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <div style="
                      display: inline-block;
                      background: rgba(255,255,255,0.15);
                      border: 1.5px solid rgba(255,255,255,0.25);
                      border-radius: 14px;
                      padding: 10px 20px;
                      margin-bottom: 20px;
                    ">
                      <span style="
                        color: #fff;
                        font-size: 18px;
                        font-weight: 800;
                        letter-spacing: -0.5px;
                      ">🛍 Shopnbliss</span>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Lock icon circle -->
              <div style="
                width: 64px; height: 64px;
                background: rgba(255,255,255,0.15);
                border: 2px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                margin: 0 auto 16px;
                line-height: 64px;
                text-align: center;
                font-size: 28px;
              ">🔐</div>

              <h1 style="
                margin: 0 0 8px;
                color: #ffffff;
                font-size: 24px;
                font-weight: 800;
                letter-spacing: -0.5px;
              ">Password Reset</h1>
              <p style="
                margin: 0;
                color: rgba(255,255,255,0.75);
                font-size: 14px;
                line-height: 1.6;
              ">We received a request to reset your Shopnbliss password.</p>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="
              background: #ffffff;
              padding: 36px 40px;
              border-left: 1px solid #e2e8f0;
              border-right: 1px solid #e2e8f0;
            ">

              <p style="
                margin: 0 0 24px;
                color: #475569;
                font-size: 15px;
                line-height: 1.7;
                text-align: center;
              ">
                Use the one-time password below to verify your identity.<br/>
                <strong style="color: #1e293b;">Do not share this code with anyone.</strong>
              </p>

              <!-- OTP label -->
              <p style="
                text-align: center;
                font-size: 11px;
                font-weight: 700;
                color: #94a3b8;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin: 0 0 12px;
              ">Your verification code</p>

              <!-- OTP digits -->
              <div style="text-align: center; margin-bottom: 10px;">
                ${otpDigits}
              </div>

              <!-- Valid timer -->
              <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                margin: 20px 0 28px;
              ">
                <span style="
                  display: inline-block;
                  background: #fef9c3;
                  border: 1px solid #fde68a;
                  border-radius: 20px;
                  padding: 6px 16px;
                  font-size: 13px;
                  font-weight: 600;
                  color: #92400e;
                ">⏱ Valid for <strong>5 minutes</strong> only</span>
              </div>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                <tr>
                  <td style="border-bottom: 1px solid #f1f5f9;"></td>
                </tr>
              </table>

              <!-- Security tips -->
              <table width="100%" cellpadding="0" cellspacing="0" style="
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 0;
                overflow: hidden;
              ">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="
                      margin: 0 0 12px;
                      font-size: 12px;
                      font-weight: 700;
                      color: #64748b;
                      text-transform: uppercase;
                      letter-spacing: 1.5px;
                    ">Security Tips</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 4px 0;">
                          <span style="color: #22c55e; font-size: 14px; margin-right: 8px;">✓</span>
                          <span style="font-size: 13px; color: #64748b;">Never share your OTP with anyone</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0;">
                          <span style="color: #22c55e; font-size: 14px; margin-right: 8px;">✓</span>
                          <span style="font-size: 13px; color: #64748b;">Shopnbliss will never call you for this code</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0;">
                          <span style="color: #22c55e; font-size: 14px; margin-right: 8px;">✓</span>
                          <span style="font-size: 13px; color: #64748b;">Ignore this email if you didn't request a reset</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-top: none;
              border-radius: 0 0 16px 16px;
              padding: 24px 40px;
              text-align: center;
            ">
              <!-- Divider line -->
              <div style="
                width: 40px; height: 3px;
                background: linear-gradient(90deg, #1a56db, #60a5fa);
                border-radius: 2px;
                margin: 0 auto 16px;
              "></div>

              <p style="
                margin: 0 0 6px;
                font-size: 13px;
                color: #94a3b8;
                line-height: 1.6;
              ">
                This email was sent to <strong style="color: #64748b;">${email}</strong>
              </p>
              <p style="
                margin: 0 0 16px;
                font-size: 12px;
                color: #cbd5e1;
              ">
                © ${new Date().getFullYear()} Shopnbliss · Chennai, India · All rights reserved
              </p>

              <!-- Links row -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="#" style="font-size: 12px; color: #94a3b8; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                    <span style="color: #cbd5e1;">·</span>
                    <a href="#" style="font-size: 12px; color: #94a3b8; text-decoration: none; margin: 0 10px;">Terms of Service</a>
                    <span style="color: #cbd5e1;">·</span>
                    <a href="#" style="font-size: 12px; color: #94a3b8; text-decoration: none; margin: 0 10px;">Support</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- end card -->

      </td>
    </tr>
  </table>

</body>
</html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;