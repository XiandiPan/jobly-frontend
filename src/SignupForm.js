import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

/**
 * SignupForm
 *
 * props: signup: function taking
 *          { username, password, firstName, lastName, email }
 *
 * state:
 * * data: current form state
 * * error: any error received from the backend
 *
 * RoutesList => SignupForm
 */
function SignupForm({ signup }) {
  const initState = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  };

  const navigate = useNavigate();

  const [data, setData] = useState(initState);
  const [error, setError] = useState(null);

  function handleChange(evt) {
    setData(currState => ({ ...currState, [evt.target.name]: evt.target.value }));
  }

  /**
  * on submit, attempt to login and navigate to "/" if successful, else
  * display the error received
  */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(data);
    } catch (errorMsg) {
      setError(errorMsg);
      return;
    }
    navigate("/");
  }

  return (
    <div className="d-flex flex-column justify-content-start m-5 ">

      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit} className="d-flex flex-column m-3 align-items-start text-start gap-2 fw-bold">

        {error && <Alert variant="danger">{error}</Alert>}

        <div>
          <label htmlFor="username">Username</label><br />
          <input id="username" type="text" name="username" value={data.username} onChange={handleChange} required></input>
        </div>
        <div>
          <label htmlFor="password">Password</label><br />
          <input id="password" type="password" name="password" value={data.password} onChange={handleChange} required minLength={5}></input>
        </div>
        <div>
          <label htmlFor="firstName">First Name</label><br />
          <input id="firstName" type="text" name="firstName" value={data.firstName} onChange={handleChange} required></input>
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label><br />
          <input id="lastName" type="text" name="lastName" value={data.lastName} onChange={handleChange} required></input>
        </div>
        <div>
          <label htmlFor="email">Email</label><br />
          <input id="email" type="email" name="email" value={data.email} onChange={handleChange} required></input>
        </div>

        <button className="mt-4 w-100 btn btn-primary">Submit!</button>
      </form>
    </div>
  );
}
// end

export default SignupForm;
