import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful, you can redirect to another page
        this.setState({ error: null });

        // Use this.props.history to access the history object and perform the redirect
        this.props.history.push("/"); // Redirect to the home page (change the path as needed)
      } else {
        const data = await response.json();
        this.setState({ error: data.message });
      }
    } catch (error) {
      console.error("Login failed:", error);
      this.setState({ error: "Login failed. Please try again later." });
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <div>
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={this.handleLogin}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
