const BRAND_COLOR = "#2563EB";
const BG_COLOR = "#F8FAFC";
const TEXT_MAIN = "#0F172A";
const TEXT_MUTED = "#64748B";

const BASE_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: ${BG_COLOR}; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #E5E7EB; overflow: hidden; box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.03); }
    .header { padding: 32px 32px 24px; text-align: left; }
    .logo { width: 40px; height: 40px; background-color: ${BRAND_COLOR}; color: #ffffff; border-radius: 12px; font-weight: bold; font-size: 22px; display: inline-flex; align-items: center; justify-content: center; line-height: 40px; text-align: center; }
    .content { padding: 0 32px 32px; }
    .title { font-size: 24px; font-weight: 700; color: ${TEXT_MAIN}; margin: 0 0 20px; letter-spacing: -0.5px; }
    .text { font-size: 15px; line-height: 1.6; color: ${TEXT_MUTED}; margin: 0 0 20px; }
    .otp-box { background-color: ${BG_COLOR}; border: 1px dashed #CBD5E1; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }
    .otp-code { font-size: 32px; font-weight: 800; letter-spacing: 6px; color: ${TEXT_MAIN}; margin: 0; }
    .footer { padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #E5E7EB; text-align: center; font-size: 13px; color: #94A3B8; }
    .footer a { color: ${TEXT_MUTED}; text-decoration: underline; }
    .features { list-style: none; padding: 0; margin: 24px 0; }
    .features li { font-size: 15px; color: ${TEXT_MAIN}; padding: 8px 0; border-bottom: 1px solid #F1F5F9; }
    .features li:last-child { border-bottom: none; }
    .features span { color: ${BRAND_COLOR}; font-weight: bold; margin-right: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">T</div>
    </div>
    <div class="content">
      <!--CONTENT-->
    </div>
    <div class="footer">
      <p>Need help? <a href="https://tooliqo.com/contact">Contact Support</a></p>
      <p>&copy; ${new Date().getFullYear()} Tooliqo All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const AccountVerificationEmail = (name: string, otp: string) => {
  const content = `
    <h1 class="title">Welcome to Tooliqo 👋</h1>
    <p class="text">Hi ${name},</p>
    <p class="text">Thanks for joining Tooliqo. To keep your account secure, please verify your email address using the OTP below.</p>
    <div class="otp-box">
      <p class="otp-code">${otp}</p>
    </div>
    <p class="text" style="font-size: 14px;">The OTP expires in 10 minutes.</p>
    <p class="text" style="font-size: 13px;">If you didn't create this account, you can safely ignore this email.</p>
  `;
  return BASE_TEMPLATE.replace("<!--CONTENT-->", content);
};

export const ForgotPasswordEmail = (name: string, otp: string) => {
  const content = `
    <h1 class="title">Reset your password</h1>
    <p class="text">Hi ${name},</p>
    <p class="text">We received a request to reset your password. Use the OTP below to continue.</p>
    <div class="otp-box">
      <p class="otp-code">${otp}</p>
    </div>
    <p class="text" style="font-size: 14px;">This OTP expires in 10 minutes.</p>
    <p class="text" style="font-size: 13px;">If you didn't request a password reset, ignore this email.</p>
  `;
  return BASE_TEMPLATE.replace("<!--CONTENT-->", content);
};

export const PasswordChangedEmail = () => {
  const content = `
    <h1 class="title">Password Updated Successfully</h1>
    <p class="text">Your Tooliqo account password has been changed successfully.</p>
    <p class="text">If this wasn't you, please <a href="https://tooliqo.com/contact" style="color: ${BRAND_COLOR};">contact support immediately</a> to secure your account.</p>
  `;
  return BASE_TEMPLATE.replace("<!--CONTENT-->", content);
};

export const WelcomeEmail = () => {
  const content = `
    <h1 class="title">You're all set!</h1>
    <p class="text">Welcome to Tooliqo. You can now access all our free online tools with a secure experience.</p>
    <ul class="features">
      <li><span>✔</span> 100% Free</li>
      <li><span>✔</span> No Premium plans</li>
      <li><span>✔</span> Save Favorites</li>
      <li><span>✔</span> Tool History</li>
      <li><span>✔</span> Fast Processing</li>
      <li><span>✔</span> Secure Experience</li>
    </ul>
    <p class="text">Enjoy using the platform!</p>
  `;
  return BASE_TEMPLATE.replace("<!--CONTENT-->", content);
};
