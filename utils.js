function getCardsWithUsers(cards, users) {
  const cardswithusers = cards.map((card) => {
    const findUser = users.find((user) => {
      return user.id === card.author;
    });
    return {
      ...card,
      authorData: findUser,
    };
  });

  return cardswithusers;
}

module.exports = getCardsWithUsers;