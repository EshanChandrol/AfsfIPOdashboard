// DashboardScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { Card, Divider } from 'react-native-elements';
import { VictoryPie } from "victory-pie/es";
import {  VictoryChart, VictoryBar } from 'victory-native';

const DashboardScreen = () => {
  const [currencyData, setCurrencyData] = useState([]);
  const [ipoData, setIpoData] = useState([]);

  useEffect(() => {
    // Fetch currency data from the API
    const fetchCurrencyData = async () => {
      try {
        const response = await axios.get(
          'https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=pk_20aa153ae37b4899b74d2c4fc00a8dcd'
        );
        setCurrencyData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    // Fetch IPO data from the API
    const fetchIpoData = async () => {
      try {
        const response = await axios.get(
          'https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=pk_20aa153ae37b4899b74d2c4fc00a8dcd'
        );
        setIpoData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    // Call the fetch functions
    fetchCurrencyData();
    fetchIpoData();
  }, []);

  // Format the currency data for the pie chart
  const formatCurrencyData = () => {
    return currencyData.map((item) => {
      return {
        x: item.symbol,
        y: item.rate,
      };
    });
  };

  // Format the IPO data for the bar chart
  const formatIpoData = () => {
    return ipoData.map((item) => {
      return {
        x: item.symbol,
        y: item.priceRangeHigh,
      };
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard App</Text>
      <Card containerStyle={styles.card}>
        <Card.Title>Currency Exchange Rates</Card.Title>
        <Card.Divider />
        <VictoryPie
          data={formatCurrencyData()}
          colorScale={['tomato', 'orange', 'gold']}
          height={200}
          width={300}
          labels={({ datum }) => `${datum.x}\n${datum.y.toFixed(2)}`}
        />
      </Card>
      <Card containerStyle={styles.card}>
        <Card.Title>Upcoming IPOs</Card.Title>
        <Card.Divider />
        <VictoryChart height={300} width={350}>
          <VictoryBar
            data={formatIpoData()}
            style={{
              data: {
                fill: ({ datum }) => (datum.y > 10 ? 'green' : 'red'),
              },
            }}
          />
        </VictoryChart>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 16,
  },
  card: {
    margin: 8,
    padding: 8,
  },
});

export default DashboardScreen;
