import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createDataSubject, readDataSubjectById, updateDataSubjectById } from '../../services/data-subject.service.js';
import { getConsentDisplayName } from '../../utils/consentHelper.js';
import { validateEmail, validateNationalID, validatePhoneNumber } from '../../utils/validate.js';
import type { ConsentType } from '../../@types/data-subject.interface.js';

const consentTypes: ConsentType[] = ["MARKETING", "SERVICE", "LEGAL", "CONTRACT", "ANALYTICS"];

function DataSubjectEditor() {
  const { data_subject_id } = useParams<{ data_subject_id?: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    national_id: '',
    name: '',
    email: '',
    phone: '',
    is_restricted: false,
    consents: consentTypes.map((type: ConsentType) => ({ consent_type: type, is_consent_active: false }))
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (data_subject_id) {
      const fetchSubject = async () => {
        try {
          const data = await readDataSubjectById(parseInt(data_subject_id));
          setFormData({ ...formData, ...data });
        } catch (error) {
          console.error("Failed to fetch subject data:", error);
        }
      };
      fetchSubject();
    }
  }, [data_subject_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(dataSubject => ({
      ...dataSubject,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleConsentChange = (consentType: ConsentType, checked: boolean) => {
    setFormData(dataSubject => ({
        ...dataSubject,
        consents: dataSubject.consents.map(consent => 
            consent.consent_type === consentType ? { ...consent, is_consent_active: checked } : consent
        )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validationErrors: { [key: string]: string } = {};
    
    if(!data_subject_id && !validateNationalID(formData.national_id)) {
      validationErrors.national_id = "National ID must have 13 digits and passes the check sum.";
    }

    if(!validateEmail(formData.email)) {
      validationErrors.email = "E-Mail must end with '@email.com'.";
    }

    if(!validatePhoneNumber(formData.phone)) {
      validationErrors.phone = "Phone Number must have 10 digits and begins with '08' or '09'";
    }

    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const alertMessage = Object.values(validationErrors).join('\n');
      alert(`Cannot create data:\n${alertMessage}`);
      return;
    }

    try {
      if (data_subject_id) {
        const { name, email, phone, is_restricted } = formData;
        await updateDataSubjectById(parseInt(data_subject_id), { name, email, phone, is_restricted });
      } else {
        await createDataSubject(formData);
      }
      navigate('/data-subject');
    } catch (error) {
      console.error('[ERROR] Failed to save data subject:', error);
    }
  };

  return (
    <div>
      <header>
        <h1>Data Subject Form</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div><label>National ID</label><input type="number" name="national_id" value={formData.national_id} onChange={handleChange} maxLength={13} disabled={Boolean(data_subject_id)} required />{errors.national_id && <p style={{ color: 'red', margin: '4px 0 0' }}>{errors.national_id}</p>}</div>
        <div><label>Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required /></div>
        <div><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} required />{errors.email && <p style={{ color: 'red', margin: '4px 0 0' }}>{errors.email}</p>}</div>
        <div><label>Phone</label><input type="number" name="phone" value={formData.phone} onChange={handleChange} maxLength={10} required />{errors.phone && <p style={{ color: 'red', margin: '4px 0 0' }}>{errors.phone}</p>}</div>
        
        {data_subject_id && (
            <div><label><input type="checkbox" name="is_restricted" checked={formData.is_restricted} onChange={handleChange} /> Restrict Processing</label></div>
        )}

        {!data_subject_id && (
            <fieldset>
                <legend>Consents</legend>
                {formData.consents.map(consent => (
                    <div key={consent.consent_type}>
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
            </fieldset>
        )}
        
        <button type="submit">{data_subject_id ? 'Update' : 'Create'}</button>
        <button type="button" onClick={() => navigate('/data-subject')}>Cancel</button>
      </form>
    </div>
  );
};

export default DataSubjectEditor;