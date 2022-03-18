import React from "react";

export default function Register() {
  return (
    <form>
      <label>
        <p>Name</p>
        <input type="text" />
      </label>
      <label>
        <p>Email</p>
        <input type="text" />
      </label>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
  );
}
