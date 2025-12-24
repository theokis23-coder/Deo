


```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendWelcomeEmail(email, name) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Bienvenue sur DEO 🦅',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1a1a1a;">Bienvenue sur DEO, ${name} !</h1>
        <p>Votre compte a été créé avec succès.</p>
        <p>🦅 <strong>DEO - Le réseau social sécurisé</strong></p>
        <p>Protection maximale contre le harcèlement et contenu inapproprié.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', email);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
}

async function sendModerationAlert(email, reason) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Alerte Modération DEO ⚠️',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #e74c3c;">Alerte de Modération</h1>
        <p>Votre contenu a été signalé pour: <strong>${reason}</strong></p>
        <p>Raison: Violation des règles de la communauté DEO</p>
        <p>🦅 <strong>DEO - Tolérance Zéro</strong></p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Moderation alert email failed:', error);
  }
}

module.exports = { sendWelcomeEmail, sendModerationAlert };
```



```javascript
const AWS = require('aws-sdk');

const rekognition = new AWS.Rekognition();

async function moderateImage(imageBuffer) {
  const params = {
    Image: {
      Bytes: imageBuffer
    },
    MinConfidence: 70
  };

  try {
    const result = await rekognition.detectModerationLabels(params).promise();
    
    const inappropriateLabels = result.ModerationLabels.filter(label => 
