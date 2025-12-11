import { comments } from "./comments.js";

// 2. Создать массив чисел от 1 до 10. Отфильтровать его таким образом, что бы мы получил массив чисел, начиная с 5.
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const filterNumbers = numbers.filter(number => number >= 5)
console.log(filterNumbers);

// 3. Создать массив строк, относящихся к любой сущности (название фильмов/книг, кухонные приборы, мебель и т.д.), проверить, есть ли в массиве какая-то определенная сущность.

const books = [
  {
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    year: 1967,
    coverColor: "черный",
    genre: "роман"
  },
  {
    title: "1984",
    author: "Джордж Оруэлл",
    year: 1949,
    coverColor: "красный",
    genre: "антиутопия"
  },
    {
    title: "Преступление и наказание",
    author: "Федор Достоевский",
    year: 1866,
    coverColor: "коричневый",
    genre: "психологический роман"
  },
  {
    title: "Гарри Поттер и философский камень",
    author: "Джоан Роулинг",
    year: 1997,
    coverColor: "синий",
    genre: "фэнтези"
  }
];

const bookYearFilters = books.filter(book => book.year < 1950);
const bookAuthorFilters = books.filter(book => book.author.includes('Булгаков'))

console.log(bookYearFilters);
console.log(bookAuthorFilters)

//4. Написать функцию, которая аргументом будет принимать массив и изменять его порядок на противоположный ("переворачивать") . Два вышеуказанных массива с помощью этой функции перевернуть.

function reverseArray(array) {
  return array.reverse()
}

reverseArray(books);
reverseArray(numbers);

console.log(books);
console.log(numbers);

//7. Вывести в консоль массив тех комментариев, почта пользователей которых содержит ".com"

const searchComments = comments.filter(comment => comment.email.includes(".com"))
console.log(searchComments)

//8. Перебрать массив таким образом, что бы пользователи с id меньше или равно 5 имели postId: 2, а те, у кого id больше 5, имели postId: 1

const updatedComments = comments.map(comment => ({
  ...comment,
  postId: comment.id <= 5 ? 2 : 1
}));

//9. Перебрать массив, что бы объекты состояли только из айди и имени

const simplifiedComments = comments.map(comment => ({
  id: comment.id,
  name: comment.name
}));

console.log(simplifiedComments);

//10. Перебираем массив, добавляем объектам свойство isInvalid и проверяем: если длина тела сообщения (body) больше 180 символов - устанавливаем true, меньше - false.

const commentIsInvalid = comments.map(comment => ({ ...comment, isInvalid: comment.body.length <= 180}));


//11. Почитать про метод массива reduce. Используя его, вывести массив почт и провернуть тоже самое с помощью метода map

const outputEmail = comments.reduce((acc, user) => {
  acc.push(user.email);
  return acc;
}, []);

console.log(outputEmail);

const outputEmailMap = comments.map(comment => ({ email: comment.email }));

console.log(outputEmailMap);

//12. Почитать про методы toString(), join() и перебрав массив с задания №11, привести его к строке.

const emailList = outputEmailMap.toString()
const emailJoin = outputEmailMap.join('|')

console.log(emailList)
console.log(emailJoin)