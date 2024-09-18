const User = require('../models/userModels')
const jwt = require('jsonwebtoken');
const sendPasswordResetSuccessEmail= require ('../services/resendServices')

  const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user with the matching token and valid expiration
    const user = await User.findOne({
      _id: decoded.userId,
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    // If user is not found or token is invalid/expired
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    // Update the user's password and clear the reset token details
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    // Send a success email
    await sendPasswordResetSuccessEmail(user.email);

    // Respond with success message
    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    // Respond with error message
    res.status(500).json({ error: error.message });
  }
};
module.exports = resetPassword
