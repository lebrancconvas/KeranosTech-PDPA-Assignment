import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  readDataSubjectConsentsById,
  updateDataSubjectConsentActiveById
} from "../../services/data-subject.service.js";
import { getConsentDisplayName } from "../../utils/consentHelper.js";
import type { IDataSubject, IConsent, ConsentType } from "../../@types/data-subject.interface.js";

function ConsentManager() {
  const { data_subject_id } = useParams<{ data_subject_id?: string }>();
  const navigate = useNavigate();

  const [subjectWithConsents, setSubjectWithConsents] = useState<{ subject: Pick<IDataSubject, "data_subject_id" | "name" | "national_id">; consents: IConsent[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!data_subject_id) {
        setLoading(false);
        return;
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        const responseData = await readDataSubjectConsentsById(parseInt(data_subject_id));

        console.log("Response Data: ", responseData);
        
        if (responseData && responseData.length > 0) {
          const subjectInfo: Pick<IDataSubject, "data_subject_id" | "national_id" | "name"> = {
            data_subject_id: responseData[0].data_subject_id,
            national_id: responseData[0].national_id,
            name: responseData[0].name
          };

          const consentInfo: IConsent[] = responseData.map((item: IConsent) => ({
            consents_record_id: item.consent_record_id,
            consent_type: item.consent_type,
            is_consent_active: item.is_consent_active,
          }));

          consentInfo.sort((a: IConsent, b: IConsent) => {
            if(a.consent_record_id && b.consent_record_id) {
              return a.consent_record_id - b.consent_record_id;
            }

            return 0;
          });

          setSubjectWithConsents({ subject: subjectInfo, consents: consentInfo });
        } else {
          return;
        }
      } catch (err) {
        console.error("[ERROR] Cannot fetch data.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data_subject_id]);

  const handleConsentChange = async (consentType: ConsentType, isActive: boolean) => {
    if (!data_subject_id || !subjectWithConsents) return;
    
    try {
      await updateDataSubjectConsentActiveById(parseInt(data_subject_id), { 
        consent_type: consentType, 
        is_consent_active: isActive 
      });

      setSubjectWithConsents(dataSubject => {
          if (!dataSubject) return null;
          return {
              ...dataSubject,
              consents: dataSubject.consents.map(consent => 
                  consent.consent_type === consentType ? { ...consent, is_consent_active: isActive } : consent
              )
          };
      });
    } catch (err) {
      console.error("[ERROR] Failed to update consent:", err);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (!subjectWithConsents) return <h1>Data Subject Not Found.</h1>; 

  return (
    <div>
      <h1>Manage Consents for: {subjectWithConsents.subject.name}</h1>
      <p>National ID: {subjectWithConsents.subject.national_id}</p>
      
      <div style={{ marginTop: '1rem' }}>
        {subjectWithConsents.consents.map((consent: IConsent) => (
          <div key={consent.consent_record_id}>
            <label>
              <input 
                type="checkbox"
                checked={consent.is_consent_active}
                onChange={(e) => handleConsentChange(consent.consent_type, e.target.checked)}
              />
              { getConsentDisplayName(consent.consent_type) }
            </label>
          </div>
        ))}
      </div>

      <button onClick={() => navigate('/data-subject')} style={{ marginTop: '1rem' }}>Back to List</button>
    </div>
  );
};

export default ConsentManager;