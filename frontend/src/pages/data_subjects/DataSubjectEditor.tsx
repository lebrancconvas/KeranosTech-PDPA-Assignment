import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createDataSubject, readDataSubjectById, updateDataSubjectById } from '../../services/data-subject.service.js';
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
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleConsentChange = (consentType: ConsentType, checked: boolean) => {
    setFormData(prev => ({
        ...prev,
        consents: prev.consents.map(c => 
            c.consent_type === consentType ? { ...c, is_consent_active: checked } : c
        )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <h1>{data_subject_id ? 'Edit' : 'Create'} Data Subject</h1>
      <form onSubmit={handleSubmit}>
        <div><label>National ID</label><input type="text" name="national_id" value={formData.national_id} onChange={handleChange} disabled={Boolean(data_subject_id)} required /></div>
        <div><label>Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required /></div>
        <div><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
        <div><label>Phone</label><input type="text" name="phone" value={formData.phone} onChange={handleChange} required /></div>
        
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
                            {consent.consent_type}
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