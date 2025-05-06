import React, { useState } from 'react';
import {
  TextField,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { calculateEMI } from '../hooks/calculateEMI';
import { useCurrency } from '../context/CurrencyContext';
import { useExchangeRates } from '../hooks/useExchangeRates';

const Home = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [calculatedEMI, setCalculatedEMI] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const [errors, setErrors] = useState({
    amount: false,
    rate: false,
    years: false,
  });

  const { currency, setCurrency } = useCurrency();
  const { rates } = useExchangeRates('USD');

  const handleCalculate = () => {
    const newErrors = {
      amount: !amount,
      rate: !rate,
      years: !years,
    };
    setErrors(newErrors);

    if (newErrors.amount || newErrors.rate || newErrors.years) {
      return;
    }

    const principal = parseFloat(amount);
    const interest = parseFloat(rate);
    const tenure = parseInt(years) * 12;
    const emi = calculateEMI(principal, interest, tenure);
    setCalculatedEMI(emi);
    setShowResult(true);

    const monthlyRate = interest / 12 / 100;
    let balance = principal;
    const newSchedule = [];

    for (let i = 1; i <= tenure; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;
      newSchedule.push({
        month: i,
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: balance.toFixed(2),
      });
    }
    setSchedule(newSchedule);
  };

  const handleReset = () => {
    setCalculatedEMI(null);
    setSchedule([]);
    setShowResult(false);
    setAmount('');
    setRate('');
    setYears('');
    setErrors({ amount: false, rate: false, years: false });
  };

  const convertedEMI =
    calculatedEMI && rates[currency]
      ? (calculatedEMI * rates[currency]).toFixed(2)
      : null;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Loan Calculator Dashboard
      </Typography>

      {/* Input fields side-by-side */}
      <Box display="flex" gap={2} flexWrap="wrap" my={2}>
        <TextField
          label="Amount"
          type="number"
          required
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setErrors((prev) => ({ ...prev, amount: !e.target.value }));
          }}
          onBlur={() => setErrors((prev) => ({ ...prev, amount: !amount }))}
          error={errors.amount}
          helperText={errors.amount ? 'Amount is required' : ''}
          sx={{ flex: 1, minWidth: 200 }}
        />

        <TextField
          label="Interest Rate (%)"
          type="number"
          required
          value={rate}
          onChange={(e) => {
            setRate(e.target.value);
            setErrors((prev) => ({ ...prev, rate: !e.target.value }));
          }}
          onBlur={() => setErrors((prev) => ({ ...prev, rate: !rate }))}
          error={errors.rate}
          helperText={errors.rate ? 'Interest rate is required' : ''}
          sx={{ flex: 1, minWidth: 200 }}
        />

        <TextField
          label="Tenure (years)"
          type="number"
          required
          value={years}
          onChange={(e) => {
            setYears(e.target.value);
            setErrors((prev) => ({ ...prev, years: !e.target.value }));
          }}
          onBlur={() => setErrors((prev) => ({ ...prev, years: !years }))}
          error={errors.years}
          helperText={errors.years ? 'Tenure is required' : ''}
          sx={{ flex: 1, minWidth: 200 }}
        />
      </Box>

      <Button variant="contained" onClick={handleCalculate} sx={{ mt: 2 }}>
        Calculate
      </Button>

      {showResult && (
        <Box mt={3}>
          <Typography variant="h6">
            Monthly EMI: {(convertedEMI || calculatedEMI?.toFixed(2))} {currency}
          </Typography>
        </Box>
      )}

      {showResult && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={2}
          flexWrap="wrap"
          gap={2}
        >
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel>Currency</InputLabel>
            <Select
              value={currency}
              label="Currency"
              onChange={(e) => setCurrency(e.target.value)}
            >
              {Object.keys(rates).map((cur) => (
                <MenuItem key={cur} value={cur}>
                  {cur}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{
              borderColor: 'purple',
              color: 'purple',
              '&:hover': {
                borderColor: 'darkviolet',
                color: 'darkviolet',
              },
            }}
          >
            Reset Table
          </Button>
        </Box>
      )}

      {schedule.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Amortization Schedule ({currency})
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Principal</TableCell>
                  <TableCell>Interest</TableCell>
                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>
                      {(parseFloat(row.principal) * (rates[currency] || 1)).toFixed(2)} {currency}
                    </TableCell>
                    <TableCell>
                      {(parseFloat(row.interest) * (rates[currency] || 1)).toFixed(2)} {currency}
                    </TableCell>
                    <TableCell>
                      {(parseFloat(row.balance) * (rates[currency] || 1)).toFixed(2)} {currency}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default Home;
