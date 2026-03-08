// ─────────────────────────────────────────────────────────
// Password Reset Email Template
// ─────────────────────────────────────────────────────────
export const resetPasswordTemplate = (name, resetUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          background-color: #F8F5F0;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 560px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
        }
        .header {
          background: linear-gradient(135deg, #1B4332, #40916C);
          padding: 40px 32px;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 26px;
          letter-spacing: 0.5px;
        }
        .header p {
          color: #B7E4C7;
          margin: 8px 0 0;
          font-size: 14px;
        }
        .body {
          padding: 40px 32px;
        }
        .greeting {
          font-size: 18px;
          color: #1A1A2E;
          font-weight: 600;
          margin-bottom: 16px;
        }
        .message {
          font-size: 15px;
          color: #4A4A6A;
          line-height: 1.7;
          margin-bottom: 32px;
        }
        .btn {
          display: block;
          width: fit-content;
          margin: 0 auto 32px;
          background: linear-gradient(135deg, #1B4332, #40916C);
          color: #ffffff !important;
          text-decoration: none;
          padding: 14px 40px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
        }
        .expiry {
          background: #FFF8E7;
          border-left: 4px solid #D4A017;
          border-radius: 8px;
          padding: 14px 18px;
          font-size: 14px;
          color: #7A5C00;
          margin-bottom: 32px;
        }
        .ignore {
          font-size: 13px;
          color: #9999AA;
          text-align: center;
          line-height: 1.6;
        }
        .footer {
          background: #F8F5F0;
          padding: 24px 32px;
          text-align: center;
          font-size: 12px;
          color: #AAAABC;
        }
        .kaaba {
          font-size: 36px;
          margin-bottom: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">

        <div class="header">
          <div class="kaaba">🕋</div>
          <h1>Umrah Companion</h1>
          <p>Your trusted Umrah preparation guide</p>
        </div>

        <div class="body">

          <div class="greeting">As-salamu alaykum, ${name} 👋</div>

          <div class="message">
            We received a request to reset the password for your
            Umrah Companion account. Click the button below to
            create a new password.
          </div>

          <a href="${resetUrl}" class="btn">
            Reset My Password
          </a>

          <div class="expiry">
            ⏰ This link will expire in <strong>10 minutes</strong>.
            If you did not request this, you can safely ignore this email.
          </div>

          <div class="ignore">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <span style="color: #40916C; word-break: break-all;">${resetUrl}</span>
          </div>

        </div>

        <div class="footer">
          © ${new Date().getFullYear()} Umrah Companion. All rights reserved.<br>
          This is an automated message, please do not reply.
        </div>

      </div>
    </body>
    </html>
  `;
};
