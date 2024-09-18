require('dotenv').config();
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API);

const sendRequestPasswordEmail = async (email, token) => {
  try {
    const resetUrl = `http://localhost:3200/reset-password?token=${token}`;
    const data = await resend.emails.send({
      from: 'Asia <onboarding@resend.dev>',
      to: email,
      subject: 'Password Reset',
      html: `<p>Click the link below to reset your password ${resetUrl}!</p> `,
    });
    console.log(data);
   
  } catch (error) {
    console.error(error); 
    res.status(400).json({
      message: 'Error sending email',
    });
  }
};
 const sendPasswordResetSuccessEmail = async (email) => {
    try {
      const response = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'Password Reset Successful',
        html: '<p>Your password has been reset successfully. If you did not perform this action, please contact support immediately.</p>'
      });
  
      console.log('Password reset confirmation email sent successfully:', response);
    } catch (error) {
      console.error('Error sending password reset confirmation email:', error);
      throw new Error('Failed to send password reset confirmation email');
    }
  };
  


module.exports = {sendRequestPasswordEmail, sendPasswordResetSuccessEmail};
