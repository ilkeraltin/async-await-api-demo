const axios = require('axios');

const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
        const rate = response.data.rates[to]; 
        if (rate) {
            return rate;
        } else {
            throw new Error(`Unable to get exchange rate from ${from} to ${to}`);
        }
    } catch (error) {
        throw new Error(`Unable to get exchange rate from ${from} to ${to}`);
    }
    
}

const getCountries = async (currency) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`);
        return response.data.map((country) => country.name);   
    } catch (error) {
        throw new Error(`Unable to get countries that use ${currency}`);
    }
}

const convertCurrency = async (from, to, amount) => {
    const countries = await getCountries(to);
    const currency = await getExchangeRate(from, to);
    const total = amount * currency;
    const text = `${amount} ${from} is worth ${total} ${to}. You can spend them at following countries: ${countries}`;
    return text;
}

convertCurrency('USD','EUR', 100).then((res) => {
    console.log(res);
}).catch((e) => {
    console.log(e);
});