import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { readDataSubjects, type IDataSubject } from "../../services/data-subject.service";

function DataSubjectView() {
  const [dataSubjects, setDataSubjects] = useState<IDataSubject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDataSubjects = async () => {
    try {
      setLoading(true);
      const data = await readDataSubjects();
      console.log("Data: ", data);
      setDataSubjects(data);
    } catch(err) {
      console.error(`[ERROR] Failed to fetch the subject data.`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSubjects();
  }, []);

  if(loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Data Subject List</h1>
      <Link to="/data-subject/new">
        <button>New Data Subject</button>
      </Link>
      <table style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>National ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataSubjects.map((dataSubject: IDataSubject) => (
            <tr key={dataSubject.data_subject_id}>
              <td>{dataSubject.name}</td>
              <td>{dataSubject.email}</td>
              <td>{dataSubject.phone}</td>
              <td>{dataSubject.national_id}</td>
              <td>
                <Link to={`/data-subject/edit/${dataSubject.data_subject_id}`}>
                  <button>Edit</button>
                </Link>
                {/* <button onClick={() => handleDelete(subject.data_subject_id)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataSubjectView;