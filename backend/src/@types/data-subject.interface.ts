export enum ConsentType {
  MARKETING = "MARKETING",
  SERVICE = "SERVICE",
  LEGAL = "LEGAL",
  CONTRACT = "CONTRACT",
  ANALYTICS = "ANALYTICS"
};

export interface IConsent {
  consent_type: ConsentType,
  is_consent_active: boolean
};

export interface IDataSubject {
  national_id: string;
  name: string;
  email: string;
  phone: string;
  is_restricted?: boolean;
};

export interface IDataSubjectWithConsent extends IDataSubject {
  consents: IConsent[];
};