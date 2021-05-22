//#region General

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
exports.telegramAPI = 'https://api.telegram.org/';

//#region General buttons

exports.backToMainMenuButton = '🔙 В главное меню';
exports.aboutButton = 'О Zammi';
exports.ourPlantsButton = '🌿 Наши растения 🌿';
exports.ourServicesButton = '🌱 Наши услуги 🌱';
exports.plantCareButton = '🌳 Уход за растениями 🌳';
exports.remindersButton = '⏰ Напоминания ⏰';

//#endregion

//#endregion


//#region Admin

//#region Access

exports.requestPassword = 'Введите пароль администратора';
exports.alreadyHasAdminRights = 'Вы уже обладаете правами администратора';
exports.passwordError = 'Вы ввели неправильный пароль';
exports.passwordApproved = 'Доступ к функция администратора получен';
exports.requestNewPassword = 'Введите новый пароль';
exports.newPasswordSuccess = 'Новый пароль успешно установлен. Всем администраторам необходимо заново войти в систему';
exports.newPasswordFailure = 'Упс. Возникла ошибка при установке нового пароля, попробуйте позже';
exports.unauthorizedAccess = 'У вас нет доступа к этой команде. Пожалуйста, заново войдите в систему'; // For usual users

//#endregion

//#region Mailing

exports.requestMailingText = 'Вы начали создание рассылки для пользователей. Чтобы прекратить ее создание в любой момент времени ' +
                             'просто отправьте команду /stopMailing. А теперь введите текст рассылки';
exports.requestMailingImage = 'Отправьте картинку для рассылки или отправьте /withoutImage, чтобы создать рассылку без картинки ';
exports.mailingPreview = 'Вот так будет выглядеть для пользователей ваша рассылка:';
exports.approveAndSendMailing = 'Подтверждаете рассылку и отправляете ее всем вашим пользователям?';
exports.approveMailingButton = 'Подтвердить и отправить';
exports.disapproveMailingButton = 'Отменить рассылку';
exports.requestButtonPress = 'Нажмите, пожалуйста, на кнопку!';
exports.mailingStarted = 'Рассылка началась... Когда она закончится, вам придет об этом сообщение';
exports.mailingSuccess = 'Рассылка была отправлена пользователям!';
exports.mailingFailure = 'Рассылка не была отправлена. Попробуйте еще раз';

//#endregion

exports.adminCommands = 'Управление функциями администратора осуществляется с помощью команд \n' +
                        '/setNewPassword - установить новый пароль \n' +
                        '/createMailing - создать и отправить рассылку пользователям бота'

//#endregion


//#region Reminders

exports.remidersMenu = 'В этом меню можно установить или убрать напоминания';
exports.setRemindersMenu = 'Выбери растение для которого хочешь установить напоминание о поливе';
exports.repeatReminderSuccess = 'Ура! Напоминание о поливе установлено повторно';
exports.wrongReminder = 'Выбрано неправильное напоминание';
exports.reminderFailure = 'Во время установки напоминания произошла ошибка, попробуй позже';
exports.requestRepeatReminder = 'Повторить напоминание о поливе еще раз?';
exports.repeatReminderFailure = 'Не удалось повторно установить напоминание. Попробуйте позже';
exports.remindersDeleted = `Все напоминания были удалены. Чтобы поставить их заново используй кнопку "${setRemindersButton}"`;

//#region Reminders buttons

exports.actionCompletedButton = 'Сделано!';
exports.repeatReminderButton = 'Повторить';
exports.deleteAllRemindersButton = '🚫 Удалить все напоминания';
exports.setRemindersButton = '📌 Установить напоминания';

//#endregion

//#endregion