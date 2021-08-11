const InitialCategories = {
  categoriesList: [
    {
      id: Number.MAX_SAFE_INTEGER - 1,
      color: '#FFF59D',
      name: 'Общее',
      translation_mark: 'categories_common',
      orderPos: 0,
      isDefault: true,
    },
    {
      id: Number.MAX_SAFE_INTEGER - 2,
      color: '#AED581',
      name: 'Покупки',
      translation_mark: 'categories_buyings',
      orderPos: 1,
      isDefault: false,
    },
    {
      id: Number.MAX_SAFE_INTEGER - 3,
      color: '#FF5722',
      name: 'Важное',
      translation_mark: 'categories_important',
      orderPos: 2,
      isDefault: false,
    },
    {
      id: Number.MAX_SAFE_INTEGER - 4,
      color: '#4FC3F7',
      name: 'Работа',
      translation_mark: 'categories_work',
      orderPos: 3,
      isDefault: false,
    },
    {
      id: Number.MAX_SAFE_INTEGER - 5,
      color: '#AB47BC',
      name: 'Личное',
      translation_mark: 'categories_personal',
      orderPos: 4,
      isDefault: false,
    },
  ],
};

export default Object.freeze(InitialCategories);
