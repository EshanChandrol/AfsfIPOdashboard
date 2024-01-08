import React, { useEffect, useState } from 'react';
import { Card, Spin, Typography, Table, Modal, Button, Input } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, Link } from 'react-router-dom';

const { Title } = Typography;
const { Search } = Input;

const CurrencyExchangeRates = () => {
  const isLoggedIn = localStorage.getItem('username') !== null;
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredExchangeRates, setFilteredExchangeRates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [upcomingIPOs, setUpcomingIPOs] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [selectedIPO, setSelectedIPO] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  // Add getCurrencyName function
  const getCurrencyName = (symbol) => {
    switch (symbol) {
      case 'USDCAD':
        return 'US Dollar to Canadian Dollar';
      case 'GBPUSD':
        return 'British Pound to US Dollar';
      case 'USDJPY':
        return 'US Dollar to Japanese Yen';
      case 'USDINR':
        return 'US Dollar to Indian Rupee';
      default:
        return symbol;
    }
  };

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          'https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY,USDINR&token=pk_20aa153ae37b4899b74d2c4fc00a8dcd'
        );
        setExchangeRates(response.data);
        setFilteredExchangeRates(response.data); // Initially set filtered rates to all rates
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  useEffect(() => {
    const fetchUpcomingIPOs = async () => {
      try {
        const response = await axios.get(
          'https://api.iex.cloud/v1/data/core/upcoming_ipos/market?token=pk_20aa153ae37b4899b74d2c4fc00a8dcd'
        );
        setUpcomingIPOs(response.data);
      } catch (error) {
        console.error('Error fetching upcoming IPOs:', error);
      } finally {
        setLoading1(false);
      }
    };

    fetchUpcomingIPOs();
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filteredRates = exchangeRates.filter((rate) => rate.symbol.toLowerCase().includes(query));
    setFilteredExchangeRates(filteredRates);
  };

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Offering Date',
      dataIndex: 'offeringDate',
      key: 'offeringDate',
      render: (date) => moment(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Price Range',
      dataIndex: 'priceRange',
      key: 'priceRange',
      render: (text, record) => `${record.priceRangeLow} - ${record.priceRangeHigh}`,
    },
    {
      title: 'Shares',
      dataIndex: 'shares',
      key: 'shares',
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleViewDetails(record)}>
          View
        </Button>
      ),
    },
  ];

  const handleViewDetails = (ipo) => {
    setSelectedIPO(ipo);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedIPO(null);
    setModalVisible(false);
  };

  if (!isLoggedIn) {
    return (
      <div>
        Please login first.
        <Link to="/login">Click Here To Login</Link>
      </div>
    );
  }

  return (
    <>
      <Spin spinning={loading}>
        <div>
          <Title level={2}>Currency Exchange Rates</Title>
          <Search
            placeholder="Enter currency symbol"
            onSearch={handleSearch}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {filteredExchangeRates.map((rate) => (
              <Card key={rate.symbol} title={getCurrencyName(rate.symbol)} style={{ width: '30%' }}>
                <Title level={4}>{rate.symbol}</Title>
                <p>Rate: {rate.rate}</p>
                <p>Timestamp: {moment(rate.timestamp).format('LLL')}</p>
                {/* <p>Derived: {rate.isDerived ? 'Yes' : 'No'}</p> */}
              </Card>
            ))}
          </div>
        </div>
      </Spin>
      <Spin spinning={loading1}>
        <div>
          <Title level={2}>Upcoming IPOs</Title>
          <Table dataSource={upcomingIPOs} columns={columns} pagination={{ pageSize: 5 }} />

          <Modal
            title="IPO Details"
            visible={modalVisible}
            onCancel={closeModal}
            footer={[
              <Button key="close" onClick={closeModal}>
                Close
              </Button>,
            ]}
          >
            {selectedIPO && (
              <>
                <p>
                  <strong>Company Name:</strong> {selectedIPO.companyName}
                </p>
                <p>
                  <strong>Symbol:</strong> {selectedIPO.symbol}
                </p>
                <p>
                  <strong>Offering Date:</strong>{' '}
                  {moment(selectedIPO.offeringDate).format('YYYY-MM-DD')}
                </p>
                <p>
                  <strong>Price Range:</strong>{' '}
                  {`${selectedIPO.priceRangeLow} - ${selectedIPO.priceRangeHigh}`}
                </p>
                <p>
                  <strong>Shares:</strong> {selectedIPO.shares}
                </p>
                <p>
                  <strong>Volume:</strong> {selectedIPO.volume}
                </p>
                {/* Add more details as needed */}
              </>
            )}
          </Modal>
        </div>
      </Spin>
    </>
  );
};

export default CurrencyExchangeRates;
