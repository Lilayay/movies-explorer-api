const IS_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const MOVIE_INCORRECT = 'Ошибка при заполнении данных о фильме';
const MOVIE_NOT_FOUND = 'Такого фильма не существует';
const MOVIE_WRONG_OWNER = 'Нельзя удалить чужой фильм';
const MOVIE_WRONG_ID = 'Некорректный id фильма';
const MOVIE_DELETED = 'Фильм удален';

const USER_NOT_FOUND = 'Пользователь не найден';
const USER_DUPLICATES = 'Такой пользователь уже существует';
const USER_DATA_INCORRECT = 'Ошибка при заполнении данных пользователя';

const UNAUTHORIZED = 'Необходима авторизация';

const SERVER_ERROR = 'На сервере произошла ошибка';

const PAGE_NOT_FOUND = 'Страница не найдена';

const LINK_ERROR = 'Неправильный формат ссылки';
const MIN_LENGTH = 'Должно быть не менее 2 символов';
const MAX_LENGTH = 'Должно быть не более 30 символов';
const EMAIL_ERROR = 'Некорректный адрес электронной почты';
const EMAIL_PASSWORD_ERROR = 'Некорректный адрес электронной почты или пароль';

module.exports = {
  IS_URL,
  MOVIE_INCORRECT,
  MOVIE_NOT_FOUND,
  MOVIE_WRONG_OWNER,
  MOVIE_WRONG_ID,
  MOVIE_DELETED,
  USER_NOT_FOUND,
  USER_DUPLICATES,
  USER_DATA_INCORRECT,
  UNAUTHORIZED,
  SERVER_ERROR,
  PAGE_NOT_FOUND,
  LINK_ERROR,
  MIN_LENGTH,
  MAX_LENGTH,
  EMAIL_ERROR,
  EMAIL_PASSWORD_ERROR,
};
