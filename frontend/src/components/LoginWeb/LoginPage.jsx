import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./LoginPage.css";
import { handleError, handleSuccess } from "../util/Toasting.jsx";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../redux/Slicers/profileToken.js";
import { useNavigate } from "react-router-dom";
import { Url } from "../api/Url.js";
function LoginPage({ setLogin }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentState, setCurrentState] = useState("Login");
    const [googleContent, setGoogletext] = useState("continue_with");
    const [googleUserData, setGoogleUser] = useState(null);
    const [token, setToken] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();
    //    SUBMIT HANDLER
    const onSubmit = async (data) => {

        try {

            /*SIGN UP*/
            if (currentState === "Sign-up") {

                const response = await fetch(Url+"/auth/signup", {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                const { success, message, error } = result;

                if (success) {
                    handleSuccess("Sign-up Successful.");
                    setCurrentState("Login")
                    reset();
                }
                else if (error) {
                    handleError("Error to Signup");
                }
                else {
                    handleError(message);
                }
            }

            /*LOGIN */
            else {

                const response = await fetch(Url+"/auth/login", {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                const { success, message, error, token } = result;

                if (success) {
                    handleSuccess("Login Successful!");
                    setToken(token);
                    dispatch(addToken(token))
                    // this helped to check before proceed to buy whether the person is logged in or not.
                    // console.log(token);
                    console.log()
                    localStorage.setItem("token", token);
                    reset();
                    setLogin(false);
                    navigate('/');
                }
                else if (error) {
                    handleError(message);
                    reset();
                }
                else {
                    handleError(message);
                    reset();
                }
            }

        } catch (err) {
            handleError("Something went wrong. Please try again later.");
            console.log(err);
        }
    };

    // Google signup/Login
    useEffect(() => {
  if (window.google && window.google.accounts) {

    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: responseOnCallback
    });

    google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      {
        theme: "outline",
        size: "large",
        width: 300,
        text: googleContent
      }
    );
  }
}, [googleContent]);
    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join('')
        );
        return JSON.parse(jsonPayload);
    }
    const responseOnCallback = async (response) => {

        const res = await fetch(Url+"/auth/google", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: response.credential
            })
        });

        const result = await res.json();

        if (result.success) {
            dispatch(addToken(result.token));
            localStorage.setItem("token", result.token);
            handleSuccess("Google Login Successful!");
            setLogin(false);
            navigate('/');
        }
        else {
            handleError(result.message);
        }
    }

    const signupHandler = () => {
        setCurrentState("Sign-up");
        setGoogletext("signup_with");
    }
    const loginHandler = () => {
        setCurrentState("Login");
        setGoogletext("continue_with");
    }

    return (
        <div className="loginPage">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="login-popup-container"
            >

                {/* TITLE */}
                <div className="login-popup-title">
                    <h2 className="text-4xl font-bold">{currentState}</h2>
                    <X onClick={() => setLogin(false)} className="cursor-pointer" />
                </div>


                {/* INPUTS */}
                <div className="login-popup-input">

                    {/* NAME (only signup) */}
                    {
                        currentState === "Sign-up" &&
                        <>
                            <input
                                type="text"
                                placeholder="Your Name"
                                {...register("name", {
                                    required: "Name is required"
                                })}
                            />
                            {errors.name && <p className="error">{errors.name.message}</p>}
                        </>
                    }


                    {/* EMAIL */}
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required"
                        })}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}


                    {/* PASSWORD */}
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            }
                        })}
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}

                </div>


                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="transition duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {
                        isSubmitting
                            ? "Please wait..."
                            : currentState === "Sign-up"
                                ? "Create Account"
                                : "Login"
                    }
                </button>
                <div id="googleButton"></div>


                {/* TERMS */}
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>
                        By continuing, I agree to the terms of use & privacy policy.
                    </p>
                </div>


                {/* TOGGLE */}
                {
                    currentState === "Login"
                        ?
                        <p>
                            Create a new account?
                            <span onClick={() => signupHandler()}> Click here </span>
                        </p>
                        :
                        <p>
                            Already have an account?
                            <span onClick={() => loginHandler()}> Login here </span>
                        </p>
                }

            </form>
        </div>
    );
}

export default LoginPage;
