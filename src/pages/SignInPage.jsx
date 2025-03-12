import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Validate password strength
  const isPasswordStrong = (password) => {
    const strongPasswordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleAuth = async () => {
    setError("");

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!isLogin && !isPasswordStrong(password)) {
      setError(
        "Password must be at least 6 characters long, include one letter, one number, and one special character."
      );
      return;
    }

    const endpoint = isLogin
      ? `http://localhost:5000/signIn?email=${email}&password=${password}`
      : "http://localhost:5000/signIn";

    const options = {
      method: isLogin ? "GET" : "POST",
      headers: { "Content-Type": "application/json" },
      body: isLogin
        ? null
        : JSON.stringify({
            name,
            email,
            password,
          }),
    };

    try {
      const response = await fetch(endpoint, options);
      const data = await response.json();
      console.log("Data from API:", data);

      if (isLogin) {
        // Login logic: Check if the user exists
        if (data.length > 0) {
          localStorage.setItem("authToken", JSON.stringify(data[0]));
          navigate("/dashboard");
        } else {
          setError("Invalid email or password.");
        }
      } else {
        // Signup logic: Handle success or failure
        if (response.ok) {
          localStorage.setItem("authToken", JSON.stringify(data));
          navigate("/dashboard");
          console.log("Navigating to dashboard...");
        } else {
          setError("Failed to sign up. Please try again.");
        }
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-96 shadow-lg p-6 rounded-xl">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">
            {isLogin ? "Welcome to ECHOHUB" : "Create an Account"}
          </h2>

          {!isLogin && (
            <div>
              <label htmlFor="name">Full name</label>
              <Input
                type="text"
                placeholder="Name"
                className="mb-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div>
            <label htmlFor="email">Email Address</label>
            <Input
              type="email"
              placeholder="Email"
              className="mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirm-password">Confirm Password</label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="mb-4"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label htmlFor="show-password" className="text-sm">
              Show Password
            </label>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <Button
            className="w-full mb-4 text-bulb-blue bg-bulb-yellow rounded-[18px]"
            onClick={handleAuth}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>

          <p className="text-sm text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
