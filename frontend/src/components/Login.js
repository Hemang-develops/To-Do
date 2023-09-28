import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import axios from 'axios';


function Login(props) {
    const [signUpModal, setSignUpModal] = useState(false);
    const [userData, setUserData] = useState({
        userName: '',
        password: '',
        email: '',
        rememberMe: false,
    });

    const handleLogin = () => {
        setSignUpModal(!signUpModal)
    };

    const handleSignUp = () => {
        setSignUpModal(!signUpModal)
    }

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const updatedItem = { ...userData, [name]: value };
        setUserData(updatedItem);
    };

    const loginUser = async (event) => {
        event.preventDefault();

        try {

            const response = await axios.post("accounts/login", {
                username: userData.userName,
                password: userData.password,
            });


            console.log("Login successful", response.data);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const signupUser = async (event) => {
        event.preventDefault();

        try {

            const response = await axios.post("accounts/signup", {
                username: userData.userName,
                password: userData.password,
                email: userData.email,
            });


            console.log("Login successful", response.data);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <Modal isOpen={true} toggle={props.loginToggle}>
            <ModalHeader toggle={props.toggle}>Log In</ModalHeader>
            <ModalBody>
                <Form>
                    {signUpModal ?
                        <p>
                            Already have an account? Then please.
                            {" "}
                            <span
                                style={{ cursor: "pointer", textDecoration: "underline" }}
                                onClick={handleLogin}
                            >
                                Log in
                            </span>.
                        </p> :
                        <p>
                            If you have not created an account yet, then please
                            {" "}
                            <span
                                style={{ cursor: "pointer", textDecoration: "underline" }}
                                onClick={handleSignUp}
                            >
                                sign up
                            </span>
                            {" "}
                            first.
                        </p>
                    }
                    <FormGroup>
                        <Label for="Username">Username</Label>
                        <Input
                            type="text"
                            id="Username"
                            name="userName"
                            value={userData.userName}
                            onChange={handleChange}
                            placeholder="Enter Username"
                        />
                    </FormGroup>
                    {signUpModal ? <FormGroup>
                        <Label for="Email">Email (optional)</Label>
                        <Input
                            type="email"
                            id="Email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                        />
                    </FormGroup> : ''}
                    <FormGroup>
                        <Label for="Password">Password</Label>
                        <Input
                            type="password"
                            id="Password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                        />
                    </FormGroup>
                    {signUpModal ? <FormGroup>
                        <Label for="Password">Password (again)</Label>
                        <Input
                            type="password"
                            id="Password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            placeholder="Enter Password again"
                        />
                    </FormGroup> : ''}
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox"
                                name="rememberMe"
                                checked={userData.rememberMe}
                                onChange={handleChange}
                            />
                            Remember Me
                        </Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                {signUpModal ? <Button color="success"
                    onClick={(e) => signupUser(e)}
                >
                    Sign Up
                </Button> : <Button color="success"
                    onClick={(e) => loginUser(e)}
                >
                    Log In
                </Button>}
            </ModalFooter>
        </Modal >
    )
}

export default Login