import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Spin, Modal, Table, Typography } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Home = () => {
  const isLoggedIn = localStorage.getItem('username') !== null;
  const [loading, setLoading] = useState(true);
  const [ipos, setIPOs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredIPOs, setFilteredIPOs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.iex.cloud/v1/data/core/upcoming_ipos/market?token=pk_20aa153ae37b4899b74d2c4fc00a8dcd'
        );
        setIPOs(response.data);
      } catch (error) {
        console.error('Error fetching IPO data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getFormattedDate = (date) => moment(date).format('YYYY-MM-DD');

  const dateCellRender = (value) => {
    const formattedDate = getFormattedDate(value.toDate());
    const iposOnDate = ipos.filter((ipo) => ipo.offeringDate === formattedDate);

    return (
      <div>
        {iposOnDate.length > 0 && (
          <Badge
            status="processing"
            text={`Upcoming IPOs: ${iposOnDate.length}`}
            onClick={() => handleViewDetails(formattedDate)}
          />
        )}
      </div>
    );
  };

  const monthCellRender = (value) => {
    const formattedMonth = getFormattedDate(value.startOf('month').toDate());
    const iposInMonth = ipos.filter((ipo) => ipo.offeringDate.startsWith(formattedMonth));

    return (
      <div>
        {iposInMonth.length > 0 && (
          <Badge
            status="processing"
            text={`Upcoming IPOs: ${iposInMonth.length}`}
            onClick={() => handleViewDetails(formattedMonth)}
          />
        )}
      </div>
    );
  };

  const yearCellRender = (value) => {
    const formattedYear = getFormattedDate(value.startOf('year').toDate());
    const iposInYear = ipos.filter((ipo) => ipo.offeringDate.startsWith(formattedYear));

    return (
      <div>
        {iposInYear.length > 0 && (
          <Badge
            status="processing"
            text={`Upcoming IPOs: ${iposInYear.length}`}
            onClick={() => handleViewDetails(formattedYear)}
          />
        )}
      </div>
    );
  };

  const handleViewDetails = (date) => {
    setSelectedDate(date);
    const iposForSelectedDate = ipos.filter((ipo) => ipo.offeringDate === date);
    setFilteredIPOs(iposForSelectedDate);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedDate(null);
    setFilteredIPOs([]);
    setModalVisible(false);
  };

  const columns = [
    { title: 'Company Name', dataIndex: 'companyName', key: 'companyName' },
    { title: 'Symbol', dataIndex: 'symbol', key: 'symbol' },
    { title: 'Offering Date', dataIndex: 'offeringDate', key: 'offeringDate' },
    { title: 'Price Range', dataIndex: 'priceRange', key: 'priceRange' },
    { title: 'Managers', dataIndex: 'managers', key: 'managers' },
    { title: 'Volume', dataIndex: 'volume', key: 'volume' },
    // Add more columns as needed
  ];

  if (!isLoggedIn) {
    return <div>Please login first.
            <Link to="/login">Click Here To Login</Link>
            </div>;
            }

  return (
    <div>
      <Spin spinning={loading}>
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} yearCellRender={yearCellRender} />


        {/* Modal for displaying IPO details on the selected date */}
        <Modal
          title={`Upcoming IPOs on ${selectedDate}`}
          visible={modalVisible}
          onCancel={closeModal}
          footer={null}
        >
          {filteredIPOs.length > 0 ? (
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <Table dataSource={filteredIPOs} columns={columns} pagination={false} />
            </div>
          ) : (
            <Title level={4}>No upcoming IPOs on the selected date.</Title>
          )}
        </Modal>
      </Spin>
    </div>
  );
};

export default Home;
