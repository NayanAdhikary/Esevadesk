const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

const sendMail = async (to, subject, html) => {
  await transporter.sendMail({ from: `"Esevadesk" <${process.env.SMTP_USER}>`, to, subject, html });
};

exports.sendNewApplicationEmail = async (app) => {
  await sendMail(process.env.ADMIN_EMAIL, `New Application: ${app.referenceId}`, `
    <h2>New application received</h2>
    <p><b>Service:</b> ${app.serviceName}</p>
    <p><b>Name:</b> ${app.fullName}</p>
    <p><b>Email:</b> ${app.email}</p>
    <p><b>Phone:</b> ${app.phone}</p>
    <p><b>Reference ID:</b> ${app.referenceId}</p>
  `);
};

exports.sendUserConfirmationEmail = async (app) => {
  await sendMail(app.email, `Application Received — ${app.referenceId}`, `
    <h2>Thank you, ${app.fullName}!</h2>
    <p>Your application for <b>${app.serviceName}</b> has been received.</p>
    <p><b>Reference ID:</b> ${app.referenceId}</p>
    <p>You can track status at: <a href="https://esevadesk.com/status">esevadesk.com/status</a></p>
  `);
};

exports.sendStatusUpdateEmail = async (app) => {
  await sendMail(app.email, `Status Update — ${app.referenceId}`, `
    <h2>Your application status has changed</h2>
    <p><b>Service:</b> ${app.serviceName}</p>
    <p><b>New Status:</b> ${app.status}</p>
    <p><b>Reference ID:</b> ${app.referenceId}</p>
  `);
};