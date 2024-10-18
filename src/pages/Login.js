import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Head from '../fixed/Head';
import usersData from '../data/user.json';

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      setError('Polja za prijavu su obavezna i moraju biti popunjena.');
      return;
    }

    if (email.length > 30 || password.length > 30) {
      setError('Unesi do 30 karaktera.');
      return;
    }
    
    setError(''); 

    const user = usersData.find(user => user.email === email && user.password === password);

    if (user) {
      navigate('/products');
    } else {
     
      setError('Pogrešan email ili lozinka.');
    }

  };

  return (
    <div>
      <Head />
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="row w-100">
          <div className="col-md-6 mx-auto">
            <div className="card p-5 shadow">
              <h2 className="text-center mb-4">Prijavi se na svoj nalog</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={validateForm}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-mail adresa</label>
                  <input type="email" className="form-control" id="email" placeholder="Unesite email adresu" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Upišite šifru</label>
                  <input type="password" className="form-control" id="password" placeholder="Unesite šifru" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-dark btn-block">Prijavi se na nalog</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;