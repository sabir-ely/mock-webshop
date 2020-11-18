export const formatPrice = price => {
    const euros = _.round(price / 100);
    let cents = price % 100;

    if (cents < 10) {
        cents = `0${cents}`;
    }

    return `€${euros},${cents}`;
};
