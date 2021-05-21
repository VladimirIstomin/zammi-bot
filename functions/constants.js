exports.greetings = 'Привет! Я - Бот Zammi, и я буду тебе всячески помогать.';

exports.mainMenu = 'Главное меню 🏠\n' +
                   'Чтобы управлять ботом используй кнопки. ' +
                   'Если их не видно, но нужно нажать на значок слева от скрепки 📎';
exports.websiteUrl = 'https://zammi.me/';
exports.about = 'ZAMMI — ваши домашние джунгли\n' +
                '• Онлайн-магазин домашних растений \n' +
                '• Консультации и озеленение любых пространств\n' +
                '📍 Доставляем по Москве в пределах МКАД';

exports.plantCareMenu = 'Выберите из списка растение, о котором вы хотите узнать информацию';
exports.remidersMenu = 'В этом меню можно установить или убрать напоминания';
exports.setRemindersMenu = 'Выбери растение для которого хочешь установить напоминание о поливе';

exports.requestPassword = 'Введите пароль администратора';
exports.alreadyHasAdminRights = 'Вы уже обладаете правами администратора';
exports.passwordError = 'Вы ввели неправильный пароль';
exports.passwordApproved = 'Доступ к функция администратора получен';
exports.unauthorizedAccess = 'У вас нет доступа к этой команде. Пожалуйста, заново войдите в систему';
exports.requestNewPassword = 'Введите новый пароль';
exports.newPasswordSuccess = 'Новый пароль успешно установлен. Всем администраторам необходимо заново войти в систему';
exports.newPasswordFailure = 'Упс. Возникла ошибка при установке нового пароля, попробуйте позже';
exports.adminCommands = 'Управление функциями администратора осуществляется с помощью команд \n' +
                        '/setNewPassword - установить новый пароль \n' +
                        '/createMailing - создать и отправить рассылку пользователям бота'

// Mailing
exports.requestMailingText = 'Вы начали создание рассылки для пользователей. Чтобы прекратить ее создание в любой момент времени ' +
                             'просто отправьте команду /stopMailing. А теперь введите текст рассылки';
exports.mailingPreview = 'Вот так будет выглядеть для пользователей ваша рассылка:';
exports.requestMailingImage = 'Отправьте картинку для рассылки или отправьте /withoutImage, чтобы создать рассылку без картинки ';
exports.approveAndSendMailing = 'Подтверждаете рассылку и отправляете ее всем вашим пользователям?';
exports.approveMailingButton = 'Подтвердить и отправить';
exports.disapproveMailingButton = 'Отменить рассылку';
exports.requestButtonPress = 'Нажмите, пожалуйста, на кнопку!';
exports.mailingStarted = 'Рассылка началась... Когда она закончится, вам придет об этом сообщение';
exports.mailingSuccess = 'Рассылка была отправлена пользователям!';
exports.mailingFailure = 'Рассылка не была отправлена. Попробуйте еще раз';

//Reminders
exports.remindersDeleted = 'Все напоминания были удалены. Чтобы поставить их заново используй кнопку "📌 Установить напоминания"';
exports.chooseReminders = 'Выбери из списка выше напоминания, которые ты хочешь установить. ' +
                          'Просто напиши номера этих напоминаний в отдельных сообщениях. ' +
                          'Когда выберешь все необходимые тебе напоминания, то напиши команду /confirmReminders. ' +
                          'А если решишь не выбирать никакие напоминания, то напиши /cancelReminders';
exports.wrongReminder = 'Выбрано неправильное напоминание';
exports.reminderFailure = 'Во время установки напоминания произошла ошибка, попробуй позже';

exports.noRemindersChosen = 'Не было выбрано ни одно напоминание. Если вы хотите закончить, то напишите /cancelReminders';
exports.actionCompleted = 'Сделано!';
exports.requestRepeatReminder = 'Повторить напоминание о поливе еще раз?';
exports.repeatReminder = 'Повторить';
exports.repeatReminderSuccess = 'Ура! Напоминание о поливе установлено повторно';
exports.repeatReminderFailure = 'Не удалось повторно установить напоминание. Попробуйте позже';
