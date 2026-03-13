// backend/utils/sendEmail.js

const nodemailer = require("nodemailer");

const sendOrderEmail = async (userEmail, orderData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Shopnbliss <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `✅ Order Confirmed – Shopnbliss`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Order Confirmation</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);
                       border-radius:16px 16px 0 0;padding:40px 40px 36px;text-align:center;">

              <div style="display:inline-block;background:rgba(255,255,255,0.07);
                          border:1px solid rgba(255,255,255,0.12);border-radius:10px;
                          padding:7px 18px;margin-bottom:28px;">
                <span style="color:#fff;font-size:17px;font-weight:800;letter-spacing:-0.5px;">
                  Shopn<span style="color:#2F80ED;">bliss</span>
                </span>
              </div>

              <div style="width:70px;height:70px;background:rgba(34,197,94,0.12);
                          border:2px solid rgba(34,197,94,0.4);border-radius:50%;
                          margin:0 auto 20px;font-size:32px;line-height:70px;text-align:center;">
                ✅
              </div>

              <div style="display:inline-block;background:rgba(34,197,94,0.1);
                          border:1px solid rgba(34,197,94,0.3);border-radius:20px;
                          padding:4px 14px;margin-bottom:16px;">
                <span style="color:#22c55e;font-size:11px;font-weight:700;letter-spacing:0.08em;">
                  PAYMENT SUCCESSFUL
                </span>
              </div>

              <h1 style="margin:0 0 10px;color:#ffffff;font-size:26px;
                         font-weight:900;letter-spacing:-0.5px;">
                Order Confirmed! 🎉
              </h1>
              <p style="margin:0;color:rgba(255,255,255,0.45);font-size:14px;line-height:1.7;">
                Hi <strong style="color:rgba(255,255,255,0.85);">${orderData.name}</strong>,<br/>
                your order has been placed successfully and is being processed.
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <!-- Order ID -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#f8fafc;border:1px solid #e2e8f0;
                       border-radius:12px;margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <span style="font-size:11px;color:#94a3b8;text-transform:uppercase;
                                 letter-spacing:0.08em;display:block;margin-bottom:4px;">
                      Order Reference
                    </span>
                    <span style="font-size:15px;font-weight:800;color:#0f172a;font-family:monospace;">
                      #SNB${Date.now()}
                    </span>
                  </td>
                  <td align="right" style="padding:16px 20px;">
                    <span style="background:#dbeafe;color:#1d4ed8;font-size:11px;
                                 font-weight:700;padding:5px 14px;border-radius:20px;">
                      Processing
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Payment Summary label -->
              <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#94a3b8;
                        text-transform:uppercase;letter-spacing:0.1em;">
                Payment Summary
              </p>

              <!-- Summary table -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="border:1px solid #e2e8f0;border-radius:12px;
                       overflow:hidden;margin-bottom:28px;">

                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td style="padding:15px 20px;font-size:14px;color:#64748b;">
                    💳 &nbsp;Amount Paid
                  </td>
                  <td align="right" style="padding:15px 20px;">
                    <strong style="font-size:16px;color:#0f172a;">
                      ₹${Number(orderData.amount).toLocaleString("en-IN")}
                    </strong>
                  </td>
                </tr>

                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td style="padding:15px 20px;font-size:14px;color:#64748b;">
                    🪙 &nbsp;Coins Earned
                  </td>
                  <td align="right" style="padding:15px 20px;">
                    <strong style="font-size:14px;color:#22c55e;">
                      +${orderData.coinsEarned}
                    </strong>
                  </td>
                </tr>

                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td style="padding:15px 20px;font-size:14px;color:#64748b;">
                    🪙 &nbsp;Coins Used
                  </td>
                  <td align="right" style="padding:15px 20px;">
                    <strong style="font-size:14px;color:#f59e0b;">
                      ${orderData.coinsUsed > 0 ? "−" + orderData.coinsUsed : "0"}
                    </strong>
                  </td>
                </tr>

                <tr style="background:linear-gradient(90deg,#fffbeb,#fef3c7);">
                  <td style="padding:18px 20px;font-size:14px;font-weight:700;color:#92400e;">
                    💰 &nbsp;Total Coins Balance
                  </td>
                  <td align="right" style="padding:18px 20px;">
                    <strong style="font-size:20px;color:#d97706;">
                      ${orderData.totalCoins}
                    </strong>
                  </td>
                </tr>
              </table>

              <!-- Delivery Steps label -->
              <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#94a3b8;
                        text-transform:uppercase;letter-spacing:0.1em;">
                Delivery Status
              </p>

              <!-- Steps -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#f8fafc;border:1px solid #e2e8f0;
                       border-radius:12px;padding:20px 24px;margin-bottom:28px;">
                <tr>
                  <td align="center" style="width:30%;">
                    <div style="width:44px;height:44px;background:rgba(34,197,94,0.12);
                                border:2px solid rgba(34,197,94,0.45);border-radius:50%;
                                margin:0 auto 8px;font-size:20px;line-height:44px;text-align:center;">
                      📦
                    </div>
                    <span style="font-size:11px;font-weight:700;color:#22c55e;">
                      Confirmed
                    </span>
                  </td>
                  <td style="padding-bottom:24px;">
                    <div style="height:2px;background:linear-gradient(90deg,#22c55e,#e2e8f0);border-radius:2px;"></div>
                  </td>
                  <td align="center" style="width:30%;opacity:0.4;">
                    <div style="width:44px;height:44px;background:#f1f5f9;
                                border:2px solid #e2e8f0;border-radius:50%;
                                margin:0 auto 8px;font-size:20px;line-height:44px;text-align:center;">
                      🚚
                    </div>
                    <span style="font-size:11px;font-weight:600;color:#94a3b8;">
                      Dispatching
                    </span>
                  </td>
                  <td style="padding-bottom:24px;">
                    <div style="height:2px;background:#e2e8f0;border-radius:2px;"></div>
                  </td>
                  <td align="center" style="width:30%;opacity:0.4;">
                    <div style="width:44px;height:44px;background:#f1f5f9;
                                border:2px solid #e2e8f0;border-radius:50%;
                                margin:0 auto 8px;font-size:20px;line-height:44px;text-align:center;">
                      🏠
                    </div>
                    <span style="font-size:11px;font-weight:600;color:#94a3b8;">
                      Delivered
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Info note -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#eff6ff;border:1px solid #bfdbfe;
                       border-radius:12px;padding:16px 20px;margin-bottom:30px;">
                <tr>
                  <td style="vertical-align:top;width:28px;padding-right:10px;font-size:18px;">
                    📧
                  </td>
                  <td style="font-size:13px;color:#1e40af;line-height:1.7;">
                    This confirmation has been sent to <strong>${userEmail}</strong>.<br/>
                    Estimated delivery in <strong>3–5 business days</strong>.
                    Same-day dispatch for orders placed before 2 PM.
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://shopnbliss.in/apple"
                       style="display:inline-block;background:#2F80ED;color:#ffffff;
                              text-decoration:none;font-size:15px;font-weight:700;
                              padding:14px 40px;border-radius:12px;letter-spacing:0.02em;">
                      Continue Shopping →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#0f172a;border-radius:0 0 16px 16px;
                       padding:28px 40px;text-align:center;">
              <p style="margin:0 0 6px;font-size:16px;font-weight:800;color:#fff;">
                Shopn<span style="color:#2F80ED;">bliss</span>
              </p>
              <p style="margin:0 0 16px;font-size:12px;color:rgba(255,255,255,0.3);line-height:1.6;">
                Genuine Apple Products · Fast Delivery · 24/7 Support
              </p>
              <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 0 16px;"></div>
              <p style="margin:0 0 12px;">
                <a href="https://shopnbliss.in" style="color:#2F80ED;font-size:12px;text-decoration:none;margin:0 10px;">Website</a>
                <a href="https://shopnbliss.in/contact" style="color:#2F80ED;font-size:12px;text-decoration:none;margin:0 10px;">Support</a>
              </p>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.18);line-height:1.7;">
                12, Anna Salai, T. Nagar, Chennai, Tamil Nadu 600017<br/>
                © ${new Date().getFullYear()} Shopnbliss. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOrderEmail;