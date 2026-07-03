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

  deliveryMethods: {
    title: "Leveringsmetoder",
    api: "deliveryMethods",
    fields: ["name", "price"],
  },
};

export default editConfig;
