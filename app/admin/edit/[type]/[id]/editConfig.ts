const editConfig = {
  games: {
    title: "Spil",
    api: "games",
    fields: [
      "title",
      "description",
      "price",
      "genre",
      "platform",
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
};

export default editConfig;
