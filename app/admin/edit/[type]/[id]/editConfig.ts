const editConfig = {
  games: {
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
    api: "deliveryMethods",
    fields: ["name", "price"],
  },
};

export default editConfig;
