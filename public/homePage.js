'use strict';

const logoutButton = new LogoutButton();

logoutButton.action = () => {
  console.log('logoutButton.action вызвана!');
  console.log('ApiConnector.logout вызвана!');
  ApiConnector.logout((response) => {
    console.log('Ответ от сервера при выходе:', response);

    if (response.success) {
      console.log('Выход выполнен успешно!');
      location.reload();
    } else {
      console.error('Ошибка при выходе:', response.error);
    }
  });
};
ApiConnector.current((response) => {
    console.log('Ответ от сервера при получении пользователя:', response);
  
    if (response.success) {
      console.log('Данные пользователя получены успешно!');
      ProfileWidget.showProfile(response.data); 
    } else {
      console.error('Ошибка при получении данных пользователя:', response.error);
    }
  });

  const ratesBoard = new RatesBoard();

  function updateRates() {
    ApiConnector.getStocks((response) => { 
      console.log('Ответ от сервера при получении курсов валют:', response);
  
      if (response.success) {
        console.log('Курсы валют получены успешно!');
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data); 
      } else {
        console.error('Ошибка при получении курсов валют:', response.error);
      }
    });
  }

  updateRates();  
  setInterval(updateRates, 60000);
  /**
 * Отображает сообщение на странице.
 * @param {string} text - Текст сообщения.
 * @param {string} type - Тип сообщения ('success' или 'error').
 */
function setMessage(text, type) {
  const messageContainer = document.getElementById('message-container'); 
  if (!messageContainer) {
    console.error('Не найден элемент message-container');
    return;
  }

  messageContainer.textContent = text;
  messageContainer.className = `message ${type}`; 


  setTimeout(() => {
    messageContainer.textContent = '';
    messageContainer.className = 'message'; 
  }, 3000);
}

  const moneyManager = new MoneyManager();

  // Пополнение баланса
  moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
      console.log('Ответ от сервера при пополнении баланса:', response);
  
      if (response.success) {
        console.log('Баланс пополнен успешно!');
        ProfileWidget.showProfile(response.data); 
        moneyManager.setMessage(true, 'Операция успешна'); 
      } else {
        console.error('Ошибка при пополнении баланса:', response.error);
        moneyManager.setMessage(false, response.error);
      }
    });
  };

  // Конвертирование валюты
  moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
      console.log('Ответ от сервера при конвертации валюты:', response);
  
      if (response.success) {
        console.log('Конвертация успешна!');
        ProfileWidget.showProfile(response.data); 
        moneyManager.setMessage(true, 'Операция успешна'); 
      } else {
        console.error('Ошибка при конвертации валюты:', response.error);
        moneyManager.setMessage(false, response.error); 
      }
    });
  };
  
  // Перевод валюты
  moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
      console.log('Ответ от сервера при переводе денег:', response);
  
      if (response.success) {
        console.log('Перевод успешен!');
        ProfileWidget.showProfile(response.data); 
        moneyManager.setMessage(true, 'Операция успешна'); 
      } else {
        console.error('Ошибка при переводе денег:', response.error);
        moneyManager.setMessage(false, response.error); 
      }
    });
  };
  
  const favoritesWidget = new FavoritesWidget();

// Начальный список избранного
ApiConnector.getFavorites((response) => {
  console.log('Ответ от сервера при получении списка избранного:', response);

  if (response.success) {
    console.log('Список избранного получен успешно!');
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  } else {
    console.error('Ошибка при получении списка избранного:', response.error);
  }
});

// Добавление пользователя в избранное
favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    console.log('Ответ от сервера при добавлении пользователя в избранное:', response);

    if (response.success) {
      console.log('Пользователь добавлен в избранное успешно!');
          favoritesWidget.clearTable();
          favoritesWidget.fillTable(response.data);
          moneyManager.updateUsersList(response.data);
          favoritesWidget.setMessage(true, 'Пользователь добавлен в избранное'); 
    } else {
      console.error('Ошибка при добавлении пользователя в избранное:', response.error);
      favoritesWidget.setMessage(false, response.error);
    }
  });
};

// Удаление пользователя из избранного
favoritesWidget.removeUserCallback = (id) => {
  ApiConnector.removeUserFromFavorites(id, (response) => {
    console.log('Ответ от сервера при удалении пользователя из избранного:', response);

    if (response.success) {
      console.log('Пользователь удален из избранного успешно!');
          favoritesWidget.clearTable();
          favoritesWidget.fillTable(response.data);  
          moneyManager.updateUsersList(response.data);  
          favoritesWidget.setMessage(true, 'Операция успешна! Пользователь удален');
    } else {
      console.error('Ошибка при удалении пользователя из избранного:', response.error);
      favoritesWidget.setMessage(false, response.error);
    }
  });
};
