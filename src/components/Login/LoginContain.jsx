
import { useState } from 'react';
import { Input, FormFeedback } from 'reactstrap';
import AddAccountLink from './AddAccountLink';
import { Link } from 'react-router-dom';
import { Btn } from '../AbstractElements';
import { useLogin } from '../../hooks/useLogin';
import { Forgotyourpassword, Logins } from '@/Constant';
import { LogIn } from 'react-feather';

const LoginContain = () => {

  const { mutate, isLoading } = useLogin();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // ---------------- Handle Change ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ---------------- Validation ----------------
  const validate = () => {
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Minimum 3 characters required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- Submit ----------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form Data Submitted:", formData);
      mutate(formData);
    }
  };

  return (
    <div className='login-section'>
      <div className='materialContainer'>
        <div className='box'>
          <div className='login-title'>
            <h2>{Logins}</h2>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Username */}
            <div className='input'>
              <Input
                type='text'
                name='username'
                placeholder='Username'
                value={formData.username}
                onChange={handleChange}
                style={{
                  borderBottom: errors.username ? "2px solid red" : "1px solid #ccc"
                }}
              />
              <span className='spin'></span>

              {errors.username && (
                <p style={{
                  color: "red",
                  fontSize: "13px",
                  marginTop: "7px",
                  marginBottom: "0"
                }}>
                  {errors.username}
                </p>
              )}
            </div>


            {/* Password */}
            <div className='input'>
              <Input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                style={{
                  borderBottom: errors.password ? "2px solid red" : "1px solid #ccc"
                }}
              />
              <span className='spin'></span>

              {errors.password && (
                <p style={{
                  color: "red",
                  fontSize: "13px",
                  marginTop: "7px",
                  marginBottom: "0"
                }}>
                  {errors.password}
                </p>
              )}
            </div>


            {/* Forgot Password */}
            <Link href={`/page/forgot_password`} className='pass-forgot'>
              {Forgotyourpassword}
            </Link>

            {/* Login Button */}
            <div className='button login'>
              <Btn type="submit" disabled={isLoading}>
                <span>{isLoading ? 'Logging in...' : LogIn}</span>
                <i className='fa fa-check'></i>
              </Btn>
            </div>

          </form>

          <AddAccountLink />

        </div>
      </div>
    </div>
  );
};

export default LoginContain;




