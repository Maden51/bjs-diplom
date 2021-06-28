'use strict';


const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (responseBody) => {
        if (responseBody.success) {
            location.reload();
        }
        userform.setLoginErrorMessage(responseBody.error);
    });
}

userForm.registerFormCallback = (data) => {
    ApiConnector.login(data, (responseBody) => {
        if (responseBody.success) {
            location.reload();
        }
        userform.setLoginErrorMessage(responseBody.error);
    });
}