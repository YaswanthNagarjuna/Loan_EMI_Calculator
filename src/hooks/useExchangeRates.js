import { useState, useEffect } from 'react';
export const useExchangeRates = (base = 'USD') => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/25d8984be3d925357edca521/latest/${base}`);
        const data = await res.json();
        setRates(data.conversion_rates);
      } catch (err) {
        console.error('Failed to fetch exchange rates:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, [base]);

  return { rates, loading };
};