import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { readDataSubjects, deleteDataSubjectById, type IDataSubject } from "../../services/data-subject.service";

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

  const handleDelete = async(dataSubjectID: number) => {
    if(window.confirm("Are you sure want to delete this data subject.")) {
      try {
        await deleteDataSubjectById(dataSubjectID);
        fetchDataSubjects();
      } catch(err) {
        console.error(`[ERROR] Failed to delete this data subject.`, err);
      }
    }
  };

  return (
    <div>
      <h1>Data Subject Management</h1>
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
                <Link to={`/data-subject/${dataSubject.data_subject_id}/consent`}>
                  <button>Manage Consent</button>
                </Link>
                <Link to={`/data-subject/edit/${dataSubject.data_subject_id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(dataSubject.data_subject_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataSubjectView;