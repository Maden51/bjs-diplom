'use strict'


const OutButton = new LogoutButton();
OutButton.action = () => {
    ApiConnector.logout((responseBody) => {
        if(responseBody.success){
            location.reload();
        }
    });
}

ApiConnector.current((responseBody) => {
    if(responseBody.success) {
        ProfileWidget.showProfile(responseBody.data);
    }
});

const rates = new RatesBoard();
function getRates(responseBody) {
    if(responseBody.success) {
        rates.clearTable();
        rates.fillTable(responseBody.data);
    }
}
ApiConnector.getStocks(getRates);
setInterval(() => ApiConnector.getStocks(getRates), 1000 * 60);

const money = new MoneyManager();
money.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (responseBody) => {
        if(responseBody.success) {
            ProfileWidget.showProfile(responseBody.data);
            money.setMessage(true, "Баланс успешно пополнен");
        } else {
            money.setMessage(false, responseBody.error);
        }
    });
}
money.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (responseBody) => {
        if(responseBody.success) {
            ProfileWidget.showProfile(responseBody.data);
            money.setMessage(true, "Конвертация прошла успешна");
        } else {
            money.setMessage(false, responseBody.error);
        }
    });
}
money.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (responseBody) => {
        if(responseBody.success) {
            ProfileWidget.showProfile(responseBody.data);
            money.setMessage(true, "Отправка средств прошла успешна");
        } else {
            money.setMessage(false, responseBody.error);
        }
    });
}

const favorite = new FavoritesWidget();
ApiConnector.getFavorites((responseBody) => {
    if(responseBody.success){
        favorite.clearTable();
        favorite.fillTable(responseBody.data);
        money.updateUsersList(responseBody.data);
    }
});
favorite.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (responseBody) => {
        if(responseBody.success) {
            favorite.clearTable();
            favorite.fillTable(responseBody.data);
            money.updateUsersList(responseBody.data);
            favorite.setMessage(true, "Пользователь успешно добавлен");
        } else {
            favorite.setMessage(false, responseBody.error);
        }
    });
}
favorite.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (responseBody) => {
        if(responseBody.success) {
            favorite.clearTable();
            favorite.fillTable(responseBody.data);
            money.updateUsersList(responseBody.data);
            favorite.setMessage(true, "Пользователь успешно удалён");
        } else {
            favorite.setMessage(false, responseBody.error);
        }
    });
}