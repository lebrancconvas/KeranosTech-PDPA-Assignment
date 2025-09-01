-- DATA SUBJECTS: CREATE
INSERT INTO data_subjects(national_id, name, email, phone)
VALUES ('1234567890123', 'สมชาย ใจดี', 'somchai@email.com', '0812345678');

INSERT INTO data_subjects(national_id, name, email, phone)
VALUES ('9876543210987', 'สมหญิง รักงาน', 'somying@email.com', '0823456789');

INSERT INTO data_subjects(national_id, name, email, phone)
VALUES ('1111111111118', 'มานี มีสุข', 'manee@email.com', '0834567890');

-- CONSENT RECORDS: CREATE
INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
VALUES (1, 'MARKETING', true);
INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
VALUES (1, 'SERVICE', true);
INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
VALUES (1, 'LEGAL', true);
INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
VALUES (1, 'CONTRACT', true);
INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
VALUES (1, 'ANALYTICS', true);

INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
VALUES (2, 'MARKETING', false);
INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
VALUES (2, 'SERVICE', false);
INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
VALUES (2, 'LEGAL', false);
INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
VALUES (2, 'CONTRACT', false);
INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
VALUES (2, 'ANALYTICS', false);

INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
VALUES (3, 'MARKETING', true);
INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
VALUES (3, 'SERVICE', true);
INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
VALUES (3, 'LEGAL', true);
INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
VALUES (3, 'CONTRACT', false);
INSERT INTO consent_records(fk_data_subject_id, consent_type, is_consent_active)
VALUES (3, 'ANALYTICS', false);



