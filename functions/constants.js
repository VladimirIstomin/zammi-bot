exports.greetings = 'Привет! Я - Бот Zammi, и я буду тебе всячески помогать.';
exports.howTo = '<b>Чтобы управлять мной, тебе понадобятся следующие команды:</b> \n' +
                '/setreminders - ты сможешь поставить напоминания, которые помогут тебе ухаживать за растениями \n'  +
                '/stopreminders - эта команда остановить все напоминания. Если ты захочешь опять их получать, то воспользуйся /setReminders \n' +
                '/help - ты увидишь ответы на основные вопросы, связанные с тем, что я умею и как меня использовать:)';
exports.help = 'Я - Бот Zami, и я что-то умею. \n\n' +
               'Коротко напомню о командах: \n' +
               '/setreminders - поставить напоминания \n' +
               '/stopreminders - убрать все напоминания';
exports.mainMenu = 'Главное меню';
exports.goToWebsite = 'Перейти на наш вебсайт 🌿';
exports.websiteUrl = 'https://zammi.me/';

exports.requestPassword = 'Введите пароль администратора';
exports.alreadyHasAdminRights = 'Вы уже обладаете правами администратора';
exports.passwordError = 'Вы ввели неправильный пароль';
exports.passwordApproved = 'Доступ к функция администратора получен';
exports.unauthorizedAccess = 'У вас нет доступа к этой команде. Пожалуйста, заново войдите в систему';
exports.requestNewPassword = 'Введите новый пароль';
exports.newPasswordSuccess = 'Новый пароль успешно установлен. Всем администраторам необходимо заново войти в систему';
exports.newPasswordFailure = 'Упс. Возникла ошибка при установке нового пароля, попробуйте позже';

// Mailing
exports.requestMailingText = 'Вы начали создание рассылки для пользователей. Чтобы прекратить ее создание в любой момент времени ' +
                             'просто отправьте команду /stopMailing. А теперь введите текст рассылки';
exports.mailingPreview = 'Вот так будет выглядеть для пользователей ваша рассылка:';
exports.requestMailingImage = 'Отправьте картинку для рассылки или отправьте любой текст, чтобы создать рассылку без картинки';
exports.approveAndSendMailing = 'Подтверждаете рассылку и отправляете ее всем вашим пользователям?';
exports.approveMailingButton = 'Подтвердить и отправить';
exports.disapproveMailingButton = 'Отменить рассылку';
exports.requestButtonPress = 'Нажмите, пожалуйста, на кнопку!';
exports.mailingStarted = 'Рассылка началась... Когда она закончится, вам придется об этом сообщение';
exports.mailingSuccess = 'Рассылка была отправлена пользователям!';
exports.mailingFailure = 'Рассылка не была отправлена. Попробуйте еще раз';

//Reminders
exports.remindersDeleted = 'Все напоминания были удалены. Чтобы поставить их заново используй /setreminders';
exports.chooseReminders = 'Выбери из списка выше напоминания, которые ты хочешь установить. ' +
                          'Просто напиши номера этих напоминаний в отдельных сообщениях. ' +
                          'Когда выберешь все необходимые тебе напоминания, то напиши команду /confirmReminders. ' +
                          'А если решишь не выбирать никакие напоминания, то напиши /cancelReminders';
exports.wrongReminder = 'Выбрано неправильное напоминание';
exports.remindersSuccess = 'Напоминания под номерами NUMBERS успешно установлены';
exports.oneReminderSuccess = 'Напоминание под номером NUMBER успешно установлено'
exports.remindersFailue = 'Во время установки напоминаний произошла ошибка, попробуйте позже';
exports.noRemindersChosen = 'Не было выбрано ни одно напоминание. Если вы хотите закончить, то напишите /cancelReminders';
exports.actionCompleted = 'Сделано!';
exports.requestRepeatReminder = 'Повторить напоминание под номером NUMBER? Список напоминаний можно увидеть с помощью команды /setreminders';
exports.repeatReminder = 'Повторить';
exports.repeatReminderSuccess = 'Напоминание под номером NUMBER установлено повторно';
exports.repeatReminderFailure = 'Не удалось установить напоминание. Попробуйте позже';
