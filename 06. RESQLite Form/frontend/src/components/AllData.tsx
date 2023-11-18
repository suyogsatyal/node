import { useState, useEffect } from "react";
import edit from './img/edit.svg' 

interface Format {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  email: string;
  dateTime: string;
}

function AllData() {
  const [fullData, setFullData] = useState<Format[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const route: string = 'http://127.0.0.1:5000/all';

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch(route);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFullData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!fullData || fullData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <>
      <h2>You have {fullData.length} entries in your database.</h2>
      <br />
      <ul className="nameList">
      {fullData.map((item) => (
        <li key={item.id}>
          {/* Render whatever you need for each item */}
          {item.firstName} {item.middleName} {item.lastName} ({item.age})
          <br />
          {item.email}
          <a href={`edit/${item.id}`}>
            <img src={edit} alt="" className="edit" />
          </a>
        </li>
      ))}
      </ul>
    </>
  );
}

export default AllData;
