// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { 
//     readDataSubjectById, 
//     readDataSubjectConsentsById,
//     updateDataSubjectConsentActiveById 
// } from '../../services/data-subject.service.js';
// import type { IDataSubject, IConsent } from '../../@types/data-subject.interface.js';

// function ConsentManager() {
//     const { data_subject_id } = useParams<{ data_subject_id: string }>();
//     const navigate = useNavigate();

//     const [subject, setSubject] = useState<IDataSubject | null>(null);
//     const [consents, setConsents] = useState<IConsent[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!data_subject_id) return;

//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const subjectData = await readDataSubjectById(parseInt(data_subject_id));
//                 const consentData = await readDataSubjectConsentsById(parseInt(data_subject_id));
//                 setSubject(subjectData);
//                 setConsents(consentData);
//             } catch (error) {
//                 console.error("[ERROR] Failed to fetch data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [data_subject_id]);

//     const handleConsentChange = async (consentType: string, isActive: boolean) => {
//         if (!data_subject_id) return;
        
//         try {
//             await updateDataSubjectConsentActiveById(parseInt(data_subject_id), { consent_type: consentType, is_consent_active: isActive });

//             setConsents(currentConsents =>
//                 currentConsents.map(c => 
//                     c.consent_type === consentType ? { ...c, is_consent_active: isActive } : c
//                 )
//             );
//         } catch (error) {
//             console.error("[ERROR] Failed to update consent:", error);
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (!subject) return <div>Data Subject not found.</div>;

//     return (
//         <div>
//             <h1>Manage Consents for: {subject.name}</h1>
//             <p>National ID: {subject.national_id}</p>
            
//             <div style={{ marginTop: '1rem' }}>
//                 {consents.map(consent => (
//                     <div key={consent.consents_record_id}>
//                         <label>
//                             <input 
//                                 type="checkbox"
//                                 checked={consent.is_consent_active}
//                                 onChange={(e) => handleConsentChange(consent.consent_type, e.target.checked)}
//                             />
//                             {consent.consent_type}
//                         </label>
//                     </div>
//                 ))}
//             </div>

//             <button onClick={() => navigate('/data-subject')} style={{ marginTop: '1rem' }}>Back to List</button>
//         </div>
//     );
// };

// export default ConsentManager;