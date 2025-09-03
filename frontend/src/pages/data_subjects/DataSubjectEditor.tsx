import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createDataSubject, readDataSubjectById, updateDataSubjectById } from '../../services/data-subject.service.js';
import type { ConsentType } from '../../@types/data-subject.interface.js';

// ค่า Consent เริ่มต้นทั้งหมด
const allConsentTypes: ConsentType[] = ["MARKETING", "SERVICE", "LEGAL", "CONTRACT", "ANALYTICS"];

const DataSubjectEditor: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    national_id: '',
    name: '',
    email: '',
    phone: '',
    is_restricted: false,
    consents: allConsentTypes.map(type => ({ consent_type: type, is_consent_active: false }))
  });

  useEffect(() => {
    if (isEditMode && id) {
      const fetchSubject = async () => {
        try {
          const data = await readDataSubjectById(parseInt(id));
          setFormData({ ...formData, ...data });
        } catch (error) {
          console.error("Failed to fetch subject data:", error);
        }
      };
      fetchSubject();
    }
  }, [id, isEditMode]);

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
      if (isEditMode && id) {
        const { name, email, phone, is_restricted } = formData;
        await updateDataSubjectById(parseInt(id), { name, email, phone, is_restricted });
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
      <h1>{isEditMode ? 'Edit' : 'Create'} Data Subject</h1>
      <form onSubmit={handleSubmit}>
        <div><label>National ID</label><input type="text" name="national_id" value={formData.national_id} onChange={handleChange} disabled={isEditMode} required /></div>
        <div><label>Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required /></div>
        <div><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
        <div><label>Phone</label><input type="text" name="phone" value={formData.phone} onChange={handleChange} required /></div>
        
        {isEditMode && (
            <div><label><input type="checkbox" name="is_restricted" checked={formData.is_restricted} onChange={handleChange} /> Restrict Processing</label></div>
        )}

        {!isEditMode && (
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
        
        <button type="submit">{isEditMode ? 'Update' : 'Create'}</button>
        <button type="button" onClick={() => navigate('/data-subject')}>Cancel</button>
      </form>
    </div>
  );
};

export default DataSubjectEditor;