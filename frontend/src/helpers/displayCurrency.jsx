const displayINRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en', {
    });

    return `Rs. ${formatter.format(num)}`;  // Adding "Rs" 
};

export default displayINRCurrency;
