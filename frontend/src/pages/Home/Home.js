import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'; // Import LineChart and Line components

const Home = () => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/stats", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setStatistics(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const renderGradientline = (statistic) => { // Rename the function
    const stats = statistics[statistic];
    const data = Object.keys(stats).map((attribute) => ({
      name: attribute,
      value: stats[attribute],
    }));

    const customColorRGB = ' rgb(217, 217, 217)';

    return (
      <div className="box" key={statistic}>
        <h3>{statistic}</h3>
        <div className="chart">
          <LineChart width={185.56} height={200} data={data}> {/* Change to LineChart */}
            <XAxis dataKey="name" tick={{ fill: 'white' }} />
            <YAxis tick={{ fill: 'white' }} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={customColorRGB} /> {/* Change to Line */}
          </LineChart>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="layout-container">
        <div className="left-half">
          {Object.keys(statistics).map((statistic) =>
            renderGradientline(statistic)
          )}
        </div>
        <div className="right-half">
          <div className="card">
            <div className="card-content">
              <FontAwesomeIcon className="card-icon" icon={faDatabase} />
              <h2 className="card-text">About the Data</h2>
            </div>
            <div className="card-scrollable">
            <p className="card-paragraph">
            Step into the captivating realm of statistical visualization within the vibrant context of Dukes University. This esteemed institution is nestled amidst the picturesque landscapes of Northern California, USA, and our carefully curated dataset unveils the fascinating tapestry of student life, academic paths, and their multifaceted capabilities.</p>


            <p className="card-paragraph">At its core, this dataset delves into key attributes: GPA, study hours per week, nightly sleep patterns, social outings, and gender. The inclusion of gender as a variable adds a nuanced layer of analysis, allowing us to explore potential variations in academic achievements.</p>

            <p className="card-paragraph">Through compelling charts and graphs, we not only gain valuable insights into the lives of these students but also highlight the university's commitment to creating an environment where a diverse range of attributes converge to shape unique educational experiences.

As this data comes to life through visual representations, we gain a comprehensive understanding of the students' educational journey, enriching our perception of the myriad factors that influence their academic odyssey at Dukes University. So, as this data comes to life through charts and graphs, we gain a comprehensive understanding of the students' educational journey, enriching our perception of the myriad factors that influence their academic odyssey at Dukes University. It's not just data; it's a story waiting to be told, and we're here to unravel it.
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
