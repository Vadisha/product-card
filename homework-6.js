// 3. Создал объект на основе своих данных. 

const candidate = {
  name: "Вадим",
  age: 36,
  city: "Sterlitamak",
  country: "Russia",
  job: "x-ray technician",
  children: "there's"
}

console.log(Object.keys(candidate));
console.log(Object.values(candidate));
console.log(Object.entries(candidate));

// 4.Создал объект, который будет хранить данные об автомобиле 


const infoAboutVehicle = {
  vehicleMaker: "Exeed LX",
  engine: "1,5 литра",
  transmission: "CVT, передний привод",
  fuel: "АИ - 92",
  consumption: "6,8-10,2"
}

const infoVehicleOwner = {
  ownerName: "Вадим Фазлиахметов",
  registrationDate: "12 марта 2015",
  vehicleAge: "12 лет 6 месяцев",
  vehicleMaker: "Exeed CLX"
}


const vehicleOwnerInfo =  {...infoVehicleOwner, ...infoAboutVehicle}

console.log(Object.keys(infoAboutVehicle));
console.log(Object.values(infoAboutVehicle));
console.log(Object.entries(infoAboutVehicle));

console.log (vehicleOwnerInfo);

//5. Написал функцию которая аргументом будет принимать объект, описанный в пункте №4. 

function checkAndAddMaxSpeed(infoAboutVehicle) {
  if (!("maxSpeed" in infoAboutVehicle)) {
    infoAboutVehicle.maxSpeed = "максимальная скорость 185 км/ч";
  }
}
checkAndAddMaxSpeed(infoAboutVehicle);

console.log("После вызова функции:");
console.log(infoAboutVehicle); 

// 6.Написать функцию, которая получает первым аргументом  — объект, а вторым аргументом — свойство объекта, которое нужно вывести и выводит его значение.

const field = prompt ("Что показать? (ownerName, registrationDate или vehicleMaker)");

console.log(infoVehicleOwner[field]);

//7. Создать массив, который содержит названия продуктов (просто строки)

const list = ['овсянка', 'лосось','яйца', 'брокколи', 'шпинат', 'авокадо', 'киноа', 'черника'];

console.log(list[0]);  // овсянка
console.log(list[1]);  // лосось
console.log(list[4]);  // брокколи

//  8. Создать массив, состоящий из объектов, где объект представляет собой книгу (название, автор, год выпуска, цвет обложки, жанр) (3-5 книг). После, используя известный нам метод массив, добавить еще одну книгу в конец списка. Можете заменить книги на фильмы, или другую сущность, идею вы поняли.

// Создаем массив книг
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
];

console.log("Исходный массив книг:");
console.log(books);

// Добавляем новую книгу в конец массива с помощью метода push()
books.push({
  title: "Маленький принц",
  author: "Антуан де Сент-Экзюпери",
  year: 1943,
  coverColor: "желтый",
  genre: "философская сказка"
});

console.log("\nМассив после добавления новой книги:");
console.log(books);

// 9.Создать еще один массив, состоящих из тех же книг, но относящийся к определенной вселенной (Гарри Поттер, Марвел и так далее). (Если используете другую, свою сущность - импровизируйте). С помощью известного нам метода массива или оператора (рекомендую использовать оператор), объединить эти два массива в один 
const booksList = [
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
]

console.log(booksList);

const allBooks =  [...books, ...booksList]
console.log(allBooks);

// 10. Почитать про метод массива — map. Написать функцию, которая принимает массив сущностей с задания №9. Добавляем новое свойство для объекта "isRare (это редкий)" и в зависимости от года выпуска книги (или какой-то логики, связанной с вашей сущностью), устанавливаем true или false. Что я хочу этим сказать: если книга выпущена позже 2000 года, устанавливаем true (да, это редкий), нет - false (значит это не редкий).

books.forEach(books => {
  books.isRare = books.year < 1950; // true если выпущена до 1900 года
});

console.log("Книги с свойством isRare:");
console.log(books);