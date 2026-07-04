const createConfig = {
  games: {
    title: "Spil",
    api: "games",
    createTitle: "Opret spil",
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
    createTitle: "Opret leveringsmetode",
    fields: ["name", "price"],
  },
};

export default createConfig;
