module.exports = [
  {
    path: "/error",
    method: "GET",
    handler: () => {
      throw new Error("Example Error");
    }
  }
];
