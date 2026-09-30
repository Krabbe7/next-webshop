const createConfig = {
  games: {
    title: "Spil",
    api: "games",
    createTitle: "Opret nyt spil",
    fields: [
      "title",
      "description",
      "price",
      "genreIds",
      "platformIds",
      "image_url",
      "release_year",
      "stock",
    ],
  },

  shipping: {
    title: "Leveringsmetoder",
    api: "shipping",
    createTitle: "Opret ny leveringsmetode",
    fields: ["name", "price"],
  },

  employees: {
    title: "Ansatte",
    api: "employees",
    createTitle: "Opret ny ansat",
    fields: ["name", "role", "email", "phone_number", "employee_img"],
  },
};

export default createConfig;
