db.voos
  .find(
    {
      $and: [
        { litrosCombustivel: { $exists: true } },
        { litrosCombustivel: { $ne: null } },
      ],
    },
    { vooId: 1, _id: 0 }
  )
  .limit(1);
