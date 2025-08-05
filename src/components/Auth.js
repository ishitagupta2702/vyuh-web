import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup, login, signInWithGoogle } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setError('');
      setLoading(true);
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (error) {
      setError('Failed to ' + (isSignUp ? 'sign up' : 'log in'));
      console.error(error);
    }
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      setError('Failed to sign in with Google');
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className="auth-container">
      <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button disabled={loading} type="submit">
          {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Log In')}
        </button>
      </form>
      
      <button onClick={handleGoogleSignIn} disabled={loading}>
        {loading ? 'Loading...' : 'Sign in with Google'}
      </button>
      
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}
