import { useEffect, useState } from 'react';

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCurrencyData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://v6.exchangerate-api.com/v6/9357ed27a3b1da6c3ab5a5fa/latest/${currency}`
                );
                const result = await response.json();

                if (result && result.conversion_rates) {
                    setData(result.conversion_rates);
                } else {
                    setData({});
                }
            } catch (error) {
                console.error("Error fetching currency data:", error);
                setData({});
            } finally {
                setLoading(false);
            }
        };

        fetchCurrencyData();
    }, [currency]);

    return { data, loading };
}

export default useCurrencyInfo;
