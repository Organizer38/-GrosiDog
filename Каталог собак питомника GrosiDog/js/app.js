const { mapGetters, mapActions } = Vuex;
// Хелпер: форматирование возраста на русском
function formatAge(years) {
  if (years === 1) return '1 год';
  if (years >= 2 && years <= 4) return `${years} года`;
  return `${years} лет`;
}
// Хелпер: эмодзи по породе
function breedEmoji(breedKey) {
  const map = { shepherd: '🦮', corgi: '🐕', spitz: '🐩', jack: '⚡' };
  return map[breedKey] || '🐶';
}
// КОМПОНЕНТ: Шапка сайта
const AppHeader = {
  template: `
    <header class="header">
      <div class="header__inner">
        <div class="header__logo">Grosi<span>Dog</span></div>
        <p class="header__tagline">
          Питомник породистых собак · г. Москва
        </p>
      </div>
      <div class="header__paws" aria-hidden="true">🐾🐾🐾</div>
    </header>
  `,
};
// КОМПОНЕНТ: Статистика по породам
const BreedStats = {
  computed: {
    ...mapGetters(['breedCounts']),
  },
  template: `
    <div class="stats">
      <div class="stat-badge stat-badge--all">
        🐾 Всего <span class="stat-badge__count">{{ breedCounts.all }}</span>
      </div>
      <div class="stat-badge stat-badge--shepherd">
        🦮 Нем. овчарка <span class="stat-badge__count">{{ breedCounts.shepherd }}</span>
      </div>
      <div class="stat-badge stat-badge--corgi">
        🐕 Корги <span class="stat-badge__count">{{ breedCounts.corgi }}</span>
      </div>
      <div class="stat-badge stat-badge--spitz">
        🐩 Шпиц <span class="stat-badge__count">{{ breedCounts.spitz }}</span>
      </div>
      <div class="stat-badge stat-badge--jack">
        ⚡ Джек-рассел <span class="stat-badge__count">{{ breedCounts.jack }}</span>
      </div>
    </div>
  `,
};
// КОМПОНЕНТ: Фильтр по породе
const BreedFilter = {
  data() {
    return {
      filters: [
        { key: 'all',      label: '🐾 Все породы' },
        { key: 'shepherd', label: '🦮 Немецкая овчарка' },
        { key: 'corgi',    label: '🐕 Корги' },
        { key: 'spitz',    label: '🐩 Шпиц' },
        { key: 'jack',     label: '⚡ Джек-рассел' },
      ],
    };
  },
  computed: {
    ...mapGetters(['activeFilter', 'filteredDogs']),
  },
  methods: {
    ...mapActions(['setFilter']),
  },
  template: `
    <div class="filter-wrap">
      <nav class="filter" role="tablist" aria-label="Фильтр по породам">
        <button
          v-for="f in filters"
          :key="f.key"
          class="filter__btn"
          :class="{ 'filter__btn--active': activeFilter === f.key }"
          role="tab"
          :aria-selected="activeFilter === f.key"
          @click="setFilter(f.key)"
        >
          {{ f.label }}
        </button>
      </nav>
      <p class="filter__count">Показано: {{ filteredDogs.length }}</p>
    </div>
  `,
};
// КОМПОНЕНТ: Карточка собаки
const DogCard = {
  props: {
    dog: { type: Object, required: true },
  },
  data() {
    return { photoError: false };
  },
  computed: {
    ageLabel()   { return formatAge(this.dog.age); },
    emoji()      { return breedEmoji(this.dog.breedKey); },
    genderIcon() { return this.dog.gender === 'male' ? '♂' : '♀'; },
    genderLabel(){ return this.dog.gender === 'male' ? 'Кобель' : 'Сука'; },
    hasPhoto()   { return this.dog.photo && !this.photoError; },
  },
  methods: {
    ...mapActions(['selectDog']),
    onPhotoError() { this.photoError = true; },
  },
  template: `
    <article
      class="dog-card"
      :class="'dog-card--' + dog.breedKey"
      @click="selectDog(dog)"
      tabindex="0"
      :aria-label="'Открыть карточку ' + dog.name"
      @keyup.enter="selectDog(dog)"
    >
      <!-- ── Изображение ── -->
      <div class="dog-card__image-wrap">
        <!-- Заглушка (видна, если фото нет или не загружается) -->
        <div class="dog-card__placeholder">
          <span class="dog-card__placeholder-icon">{{ emoji }}</span>
          <span class="dog-card__placeholder-hint">Добавьте фото</span>
        </div>

        <!-- Фото (перекрывает заглушку, если файл найден) -->
        <img
          v-if="hasPhoto"
          :src="dog.photo"
          :alt="dog.name + ' — ' + dog.breed"
          class="dog-card__photo"
          @error="onPhotoError"
        >

        <!-- Бейдж «Продаётся» -->
        <span v-if="dog.available" class="dog-card__badge">Продаётся</span>
      </div>

      <!-- ── Информация ── -->
      <div class="dog-card__body">
        <div class="dog-card__header">
          <h3 class="dog-card__name">{{ dog.name }}</h3>
          <span
            class="dog-card__gender"
            :class="'dog-card__gender--' + dog.gender"
            :title="genderLabel"
          >{{ genderIcon }}</span>
        </div>

        <p class="dog-card__breed">{{ dog.breed }}</p>

        <div class="dog-card__meta">
          <span>🎂 {{ ageLabel }}</span>
          <span>🎨 {{ dog.color }}</span>
        </div>

        <p class="dog-card__desc">{{ dog.description }}</p>

        <button class="dog-card__btn">Подробнее →</button>
      </div>
    </article>
  `,
};
// КОМПОНЕНТ: Модальное окно с деталями
const DogModal = {
  data() {
    return { photoError: false };
  },
  computed: {
    ...mapGetters(['selectedDog']),
    dog()        { return this.selectedDog; },
    ageLabel()   { return this.dog ? formatAge(this.dog.age) : ''; },
    emoji()      { return this.dog ? breedEmoji(this.dog.breedKey) : ''; },
    genderIcon() { return this.dog?.gender === 'male' ? '♂' : '♀'; },
    genderLabel(){ return this.dog?.gender === 'male' ? 'Кобель' : 'Сука'; },
    hasPhoto()   { return this.dog?.photo && !this.photoError; },
  },
  watch: {
    // Сброс ошибки фото при открытии новой карточки
    selectedDog(newDog) {
      if (newDog) this.photoError = false;
    },
  },
  methods: {
    ...mapActions(['closeDog']),
    onPhotoError() { this.photoError = true; },
    // Закрытие по клавише Escape
    onKeyup(e) {
      if (e.key === 'Escape') this.closeDog();
    },
  },
  mounted()   { document.addEventListener('keyup', this.onKeyup); },
  unmounted() { document.removeEventListener('keyup', this.onKeyup); },

  template: `
    <transition name="modal-fade">
      <div
        v-if="dog"
        class="modal-overlay"
        @click.self="closeDog"
        role="dialog"
        aria-modal="true"
        :aria-label="'Карточка: ' + dog.name"
      >
        <div class="modal" :class="'modal--' + dog.breedKey">

          <!-- Крестик закрытия -->
          <button class="modal__close" @click="closeDog" aria-label="Закрыть">✕</button>

          <!-- Фото -->
          <div class="modal__image-wrap">
            <div class="modal__placeholder">
              <span class="modal__placeholder-icon">{{ emoji }}</span>
            </div>
            <img
              v-if="hasPhoto"
              :src="dog.photo"
              :alt="dog.name"
              class="modal__photo"
              @error="onPhotoError"
            >
            <span v-if="dog.available" class="modal__badge">Продаётся 🐾</span>
          </div>

          <!-- Контент -->
          <div class="modal__body">
            <div class="modal__header">
              <h2 class="modal__name">{{ dog.name }}</h2>
              <span
                class="modal__gender"
                :class="'dog-card__gender--' + dog.gender"
                :title="genderLabel"
              >{{ genderIcon }}</span>
            </div>

            <p class="modal__breed">{{ dog.breed }}</p>

            <ul class="modal__meta">
              <li class="modal__meta-item">
                <span class="modal__meta-label">Возраст</span>
                <span class="modal__meta-value">{{ ageLabel }}</span>
              </li>
              <li class="modal__meta-item">
                <span class="modal__meta-label">Пол</span>
                <span class="modal__meta-value">{{ genderLabel }}</span>
              </li>
              <li class="modal__meta-item">
                <span class="modal__meta-label">Окрас</span>
                <span class="modal__meta-value">{{ dog.color }}</span>
              </li>
              <li class="modal__meta-item">
                <span class="modal__meta-label">Статус</span>
                <span
                  class="modal__meta-value"
                  :class="{ 'modal__status--yes': dog.available, 'modal__status--no': !dog.available }"
                >
                  {{ dog.available ? '✅ Доступен' : '🔒 Оставлен в питомнике' }}
                </span>
              </li>
            </ul>

            <p class="modal__desc">{{ dog.description }}</p>

            <a
              v-if="dog.available"
              href="mailto:info@grosidog.ru"
              class="modal__contact-btn"
            >
              ✉️ Написать нам
            </a>
          </div>
        </div>
      </div>
    </transition>
  `,
};
// КОРНЕВОЙ КОМПОНЕНТ
const App = {
  components: {
    AppHeader,
    BreedStats,
    BreedFilter,
    DogCard,
    DogModal,
  },
  computed: {
    ...mapGetters(['filteredDogs']),
  },
  template: `
    <app-header></app-header>

    <main class="main">
      <breed-stats></breed-stats>
      <breed-filter></breed-filter>

      <!-- Сетка карточек -->
      <transition-group name="card-list" tag="div" class="grid">
        <dog-card
          v-for="dog in filteredDogs"
          :key="dog.id"
          :dog="dog"
        ></dog-card>
      </transition-group>

      <!-- Пустой список -->
      <div v-if="filteredDogs.length === 0" class="empty">
        <span class="empty__icon">🔍</span>
        <p>Собаки не найдены</p>
      </div>
    </main>

    <footer class="footer">
      🐾 Питомник <strong>GrosiDog</strong> · г. Москва · info@grosidog.ru
    </footer>

    <!-- Модальное окно -->
    <dog-modal></dog-modal>
  `,
};
// ЗАПУСК ПРИЛОЖЕНИЯ
const app = Vue.createApp(App);
app.use(store);
app.mount('#app');



