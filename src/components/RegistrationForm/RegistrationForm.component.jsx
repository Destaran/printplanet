import { RegistrationContainer, InnerRegistrationContainer, Form, ContainerHeader } from "./RegistrationForm.styles";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../FormInput/FormInput.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firestore/firestore";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const RegistrationForm = () => {

    const navigate = useNavigate();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {
        displayName,
        email,
        password,
        confirmPassword,
    } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            navigate('/calculator');
        } catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                alert('Email already in use!');
            } else {
                console.log('User creation encountered an error!', error);
            }
        }
    };

    return (
        <RegistrationContainer>
            <InnerRegistrationContainer>
                <ContainerHeader>
                    <h3>Register an account</h3>
                </ContainerHeader>
                <Form onSubmit={handleSubmit}>
                    <FormInput
                        label='Display Name'
                        required
                        type='text'
                        value={displayName}
                        name='displayName'
                        onChange={handleChange}
                    />
                    <FormInput
                        label='E-mail'
                        required
                        type='text'
                        value={email}
                        name='email'
                        onChange={handleChange}
                    />
                    <FormInput
                        label='Password'
                        required
                        type='password'
                        value={password}
                        name='password'
                        onChange={handleChange}
                    />
                    <FormInput
                        label='Confirm Password'
                        required
                        type='password'
                        value={confirmPassword}
                        name='confirmPassword'
                        onChange={handleChange}
                    />
                    <button>Register</button>
                </Form>
            </InnerRegistrationContainer>
        </RegistrationContainer>
    )
}

export default RegistrationForm;