CREATE TYPE user_role_enum AS ENUM (
  'ADMIN',
  'DPO',
  'USER'
);

CREATE TYPE consent_type_enum AS ENUM (
  'MARKETING',
  'SERVICE',
  'LEGAL',
  'CONTRACT',
  'ANALYTICS'
);

CREATE TYPE request_type_enum AS ENUM (
  'ACCESS',
  'RECTIFICATION',
  'ERASURE',
  'RESTRICT',
  'PORTABILITY',
  'INFORMED',
  'WITHDRAW'
);

CREATE TYPE request_status_enum AS ENUM (
  'PENDING',
  'PROGRESS',
  'COMPLETED',
  'REJECTED'
);

CREATE TYPE action_type_enum AS ENUM (
  'USER_REGISTRATION',
  'USER_LOGIN',
  'USER_LOGOUT',
  'DATA_SUBJECT_CREATE',
  'DATA_SUBJECT_READ',
  'DATA_SUBJECT_UPDATE',
  'DATA_SUBJECT_DELETE',
  'CONSENT_UPDATE',
  'REQUEST_CREATE',
  'REQUEST_READ',
  'REQUEST_UPDATE',
  'REQUEST_DELETE'
);

CREATE TYPE target_type_enum AS ENUM (
  'USER',
  'SUBJECT',
  'CONSENT',
  'REQUEST'
);

CREATE TABLE IF NOT EXISTS users (
  "user_id" serial4 UNIQUE PRIMARY KEY NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "password" VARCHAR(18) NOT NULL,
  "user_role" user_role_enum,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS data_subjects (
  "data_subject_id" serial4 UNIQUE PRIMARY KEY NOT NULL,
  "national_id" VARCHAR(13) UNIQUE NOT NULL,
  "name" VARCHAR(300) NOT NULL,
  "email" VARCHAR(100) NOT NULL,
  "phone" VARCHAR(10) NOT NULL,
  "is_restricted" bool DEFAULT false,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS consent_records (
  "consent_record_id" serial4 UNIQUE PRIMARY KEY NOT NULL,
  "fk_data_subject_id" int4,
  "consent_type" consent_type_enum,
  "is_consent_active" bool DEFAULT false,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS data_requests (
  "data_request_id" serial4 UNIQUE PRIMARY KEY NOT NULL,
  "fk_data_subject_id" int4,
  "request_type" request_type_enum,
  "request_status" request_status_enum DEFAULT 'PENDING',
  "details" text,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  "request_due_date" timestamp
);

CREATE TABLE IF NOT EXISTS audit_logs (
  "audit_log_id" serial4 UNIQUE PRIMARY KEY NOT NULL,
  "fk_user_id" int4,
  "action_type" action_type_enum,
  "target_type" target_type_enum,
  "target_id" int4,
  "details" text,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE consent_records ADD FOREIGN KEY (fk_data_subject_id) REFERENCES data_subjects(data_subject_id);

ALTER TABLE audit_logs ADD FOREIGN KEY (fk_user_id) REFERENCES users(user_id);

ALTER TABLE data_requests ADD FOREIGN KEY (fk_data_subject_id) REFERENCES data_subjects(data_subject_id);
