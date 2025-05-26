'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  console.log('Данные для входа:', data);

  ApiConnector.login(data, (response) => {
    console.log('Ответ от сервера:', response);

    if (response.success) {
      console.log('Авторизация успешна!');
      location.reload();
    } else {
      console.error('Ошибка авторизации:', response.error);
      userForm.setLoginErrorMessage(response.error);
    }
  });
};

userForm.registerFormCallback = (data) => {
  console.log('Данные для регистрации:', data);

  ApiConnector.register(data, (response) => {
    console.log('Ответ от сервера:', response);

    if (response.success) {
      console.log('Регистрация успешна!');
      location.reload();
    } else {
      console.error('Ошибка регистрации:', response.error);
      userForm.setRegisterErrorMessage(response.error);
    }
  });
};