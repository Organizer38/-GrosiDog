const DOG_PHOTOS = {
  //  ID  : 'путь к файлу'
   1  : './images/706.png',
   2  : './images/700.png',
   3  : './images/707.jpg',
   4  : './images/701.jpg',
   5  : './images/702.jpg',
   6  : './images/corgi0.jpg',
   7  : './images/corgi1.jpg',
   8  : './images/corgi2.jpg',
   9  : './images/spitz.jpg',
  10  : './images/jack_0.jpg',
  11  : './images/jack_435643.jpg',
  12  : './images/jack_1.jpg',
  13  : './images/jack_11.jpg',
};

const store = Vuex.createStore({
  // СОСТОЯНИЕ
  state() {
    return {
      activeFilter : 'all', // выбранная порода ('all' | 'shepherd' | 'corgi' | 'spitz' | 'jack')
      selectedDog  : null,  // собака, открытая в модальном окне

      dogs: [
        // НЕМЕЦКАЯ ОВЧАРКА (5 собак)
        {
          id        : 1,
          name      : 'Арес',
          breed     : 'Немецкая овчарка',
          breedKey  : 'shepherd',
          age       : 3,
          gender    : 'male',
          color     : 'Чёрно-рыжий',
          description: 'Энергичный и преданный кобель с отличными рабочими качествами. Прошёл базовый курс дрессировки.',
          available : false,
          photo     : DOG_PHOTOS[1],
        },
        {
          id        : 2,
          name      : 'Белла',
          breed     : 'Немецкая овчарка',
          breedKey  : 'shepherd',
          age       : 2,
          gender    : 'female',
          color     : 'Чёрно-рыжая',
          description: 'Ласковая и умная сука. Отличный характер, легко поддаётся обучению.',
          available : false,
          photo     : DOG_PHOTOS[2],
        },
        {
          id        : 3,
          name      : 'Граф',
          breed     : 'Немецкая овчарка',
          breedKey  : 'shepherd',
          age       : 5,
          gender    : 'male',
          color     : 'Зонарный',
          description: 'Опытный производитель с чемпионскими линиями. Многократный победитель выставок.',
          available : false,
          photo     : DOG_PHOTOS[3],
        },
        {
          id        : 4,
          name      : 'Дара',
          breed     : 'Немецкая овчарка',
          breedKey  : 'shepherd',
          age       : 1,
          gender    : 'female',
          color     : 'Чёрно-рыжая',
          description: 'Молодая активная сука. Идеальна для семьи с детьми.',
          available : true,
          photo     : DOG_PHOTOS[4],
        },
        {
          id        : 5,
          name      : 'Зевс',
          breed     : 'Немецкая овчарка',
          breedKey  : 'shepherd',
          age       : 4,
          gender    : 'male',
          color     : 'Чёрный',
          description: 'Уравновешенный кобель с крепкой нервной системой. Подходит для охраны и компаньонства.',
          available : false,
          photo     : DOG_PHOTOS[5],
        },
        // КОРГИ (3 собаки)
        {
          id        : 6,
          name      : 'Пончик',
          breed     : 'Корги',
          breedKey  : 'corgi',
          age       : 2,
          gender    : 'male',
          color     : 'Рыже-белый',
          description: 'Жизнерадостный и игривый малыш. Обожает детей и активные прогулки.',
          available : false,
          photo     : DOG_PHOTOS[6],
        },
        {
          id        : 7,
          name      : 'Рыжик',
          breed     : 'Корги',
          breedKey  : 'corgi',
          age       : 3,
          gender    : 'female',
          color     : 'Рыже-белая',
          description: 'Умная и ласковая сука. Легко обучается командам, очень общительна.',
          available : false,
          photo     : DOG_PHOTOS[7],
        },
        {
          id        : 8,
          name      : 'Снежка',
          breed     : 'Корги',
          breedKey  : 'corgi',
          age       : 1,
          gender    : 'female',
          color     : 'Трёхцветная',
          description: 'Молодая красавица с отличными пропорциями. Перспективная для выставок.',
          available : true,
          photo     : DOG_PHOTOS[8],
        },
        // ШПИЦ (1 собака)
        {
          id        : 9,
          name      : 'Жемчуг',
          breed     : 'Шпиц',
          breedKey  : 'spitz',
          age       : 2,
          gender    : 'female',
          color     : 'Белый',
          description: 'Белоснежная красавица с пышной шубой. Призёр региональных выставок.',
          available : true,
          photo     : DOG_PHOTOS[9],
        },
        // ЖЕК-РАССЕЛ (4 собаки)
        {
          id        : 10,
          name      : 'Терри',
          breed     : 'Джек-рассел',
          breedKey  : 'jack',
          age       : 2,
          gender    : 'male',
          color     : 'Бело-рыжий',
          description: 'Активный охотничий кобель. Неутомимый и бесстрашный партнёр для спорта.',
          available : false,
          photo     : DOG_PHOTOS[10],
        },
        {
          id        : 11,
          name      : 'Молния',
          breed     : 'Джек-рассел',
          breedKey  : 'jack',
          age       : 1,
          gender    : 'female',
          color     : 'Бело-чёрная',
          description: 'Быстрая и сообразительная. Прирождённый агилити-спортсмен.',
          available : true,
          photo     : DOG_PHOTOS[11],
        },
        {
          id        : 12,
          name      : 'Буян',
          breed     : 'Джек-рассел',
          breedKey  : 'jack',
          age       : 3,
          gender    : 'male',
          color     : 'Бело-рыжий',
          description: 'Темпераментный кобель с сильным охотничьим инстинктом. Отличные полевые данные.',
          available : false,
          photo     : DOG_PHOTOS[12],
        },
        {
          id        : 13,
          name      : 'Пеппер',
          breed     : 'Джек-рассел',
          breedKey  : 'jack',
          age       : 2,
          gender    : 'female',
          color     : 'Трёхцветная',
          description: 'Дружелюбная и любопытная сука. Идеальный компаньон для активной семьи.',
          available : true,
          photo     : DOG_PHOTOS[13],
        },
      ], 
    };
  },
  // ГЕТТЕРЫ
  getters: {
    // Текущий активный фильтр
    activeFilter(state) {
      return state.activeFilter;
    },
    // Выбранная собака (для модального окна)
    selectedDog(state) {
      return state.selectedDog;
    },
    // Отфильтрованный список собак
    filteredDogs(state) {
      if (state.activeFilter === 'all') return state.dogs;
      return state.dogs.filter(dog => dog.breedKey === state.activeFilter);
    },
    // Количество собак по каждой породе
    breedCounts(state) {
      return {
        all      : state.dogs.length,
        shepherd : state.dogs.filter(d => d.breedKey === 'shepherd').length,
        corgi    : state.dogs.filter(d => d.breedKey === 'corgi').length,
        spitz    : state.dogs.filter(d => d.breedKey === 'spitz').length,
        jack     : state.dogs.filter(d => d.breedKey === 'jack').length,
      };
    },
  },
  // МУТАЦИИ
  mutations: {
    SET_FILTER(state, filter) {
      state.activeFilter = filter;
    },
    SELECT_DOG(state, dog) {
      state.selectedDog = dog;
    },
    CLOSE_DOG(state) {
      state.selectedDog = null;
    },
  },
  // ДЕЙСТВИЯ
  actions: {
    setFilter({ commit }, filter) {
      commit('SET_FILTER', filter);
    },
    selectDog({ commit }, dog) {
      commit('SELECT_DOG', dog);
    },
    closeDog({ commit }) {
      commit('CLOSE_DOG');
    },
  },
});


