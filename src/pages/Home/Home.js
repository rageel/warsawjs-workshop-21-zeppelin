import React from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { required, length } from "redux-form-validators";

import { Input, CheckInput } from "../../components";
import { login } from "../../actions/user";

let Home = ({ handleSubmit, termsCheckbox, invalid, loginUser }) => {
    const handleLogin = values => {
        loginUser(values);
        console.log(values);
    };
    console.log(termsCheckbox);

    return (
        <div className="display-flex">
            <img
                className="flex-2"
                src="https://placehold.it/2000x300"
                alt="randomowy obrazek"
            />
            <form className="flex-1" onSubmit={handleSubmit(handleLogin)}>
                <Field
                    name="username"
                    component={Input}
                    label="Your name"
                    type="text"
                    validate={[required()]}
                />
                <Field
                    name="password"
                    component={Input}
                    label="password"
                    type="password"
                    validate={[required(), length({ min: 5 })]}
                />
                <Field
                    name="termsCheckbox"
                    component={CheckInput}
                    type="checkbox"
                />
                <button type="submit" disabled={!termsCheckbox || invalid}>
                    Submit
                </button>
            </form>
        </div>
    );
};

Home = reduxForm({
    form: "LoginForm"
})(Home);

Home = connect(
    state => {
        const termsCheckbox = formValueSelector("LoginForm")(
            state,
            "termsCheckbox"
        );
        return {
            termsCheckbox
        };
    },
    {
        loginUser: login
    }
)(Home);

export default Home;
