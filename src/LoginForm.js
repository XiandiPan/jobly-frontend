import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * LoginForm
 *
 * props: login: function taking { username, password }
 *
 * state:
 * * data: current form state
 * * error: any error received from the backend
 *
 * RoutesList => LoginForm
 */
function LoginForm({ login }) {
  const initState = {
    username: '',
    password: '',
  };
  const [data, setData] = useState(initState);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
      await login(data);
    } catch (errorMsg) {
      setData(currentData =>
        ({ ...currentData, password: "" })
        );
        setError(errorMsg);
        return;
      }
      navigate("/");
  }

  return (
    <div className="d-flex flex-column justify-content-start m-5 ">
      <h1>Log In</h1>

      <form onSubmit={handleSubmit} className="d-flex flex-column m-3 align-items-start text-start gap-2 fw-bold">

        {error && <Alert variant="danger">{error}</Alert>}

        <div>
          <label htmlFor="username">Username</label><br />
          <input id="username" type="text" name="username" value={data.username} onChange={handleChange} required></input>
        </div>
        <div>
          <label htmlFor="password">Password</label><br />
          <input id="password" type="password" name="password" value={data.password} onChange={handleChange} required></input>
        </div>

        <button className="mt-4 w-100 btn btn-primary">Submit!</button>
      </form>
    </div>

  );
}
// end

export default LoginForm;
