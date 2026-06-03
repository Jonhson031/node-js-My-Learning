const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,

    // service: 'Gmail',
    // Activete in gmail "less secure app" option

    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Maksym Yaremko <test@test.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Send email wih nodeMailer
  await transporter.sendMail(mailOptions);
};
