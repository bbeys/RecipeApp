const { findUserByEmail, createUser } = require('../models/user');

exports.getLogin = (req, res) => {
  res.render('login', { error: null });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body || {};
  console.log('Login attempt - Email:', email);
  const user = await findUserByEmail(email);
  console.log('Found user:', user ? `ID: ${user.id}, Name: ${user.name}, Role: ${user.role}` : 'null');
  if (!user || user.password !== password) return res.render('login', { error: 'Invalid credentials' });
  req.session.userId = user.id;
  req.session.userRole = user.role;
  console.log('Session userId set to:', user.id, 'Role:', user.role);
  res.redirect('/');
};

exports.getSignup = (req, res) => {
  res.render('signup', { error: null });
};

exports.postSignup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body || {};
  
  // Validation
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.render('signup', { error: 'All fields are required' });
  }
  
  if (password !== confirmPassword) {
    return res.render('signup', { error: 'Passwords do not match' });
  }
  
  if (password.length < 6) {
    return res.render('signup', { error: 'Password must be at least 6 characters long' });
  }
  
  // Check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.render('signup', { error: 'An account with this email already exists' });
  }
  
  // Create new user
  try {
    const newUser = await createUser({ firstName, lastName, email, password });
    if (!newUser) {
      return res.render('signup', { error: 'Failed to create account. Please try again.' });
    }
    
    // Log the user in automatically
    req.session.userId = newUser.id;
    req.session.userRole = 'user';
    console.log('New user created and logged in:', newUser.id);
    res.redirect('/');
  } catch (error) {
    console.error('Signup error:', error);
    return res.render('signup', { error: 'An error occurred during registration. Please try again.' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};
