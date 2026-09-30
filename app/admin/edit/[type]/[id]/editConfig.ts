const editConfig = {
  games: {
    title: "Spil",
    api: "games",
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
    fields: ["name", "price"],
  },

  employees: {
    title: "Ansatte",
    api: "employees",
    fields: ["name", "role", "email", "phone_number", "employee_img"],
  },
};

export default editConfig;
