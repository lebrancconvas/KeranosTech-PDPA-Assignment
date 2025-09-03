# Keranos PDPA Assignment's Assumption

## Overview

- The PDPA Management System was created from the company to manage the privacy for their customers's data as **"Data Subjects"**, and each customer's data have their consent activations for letting the company to use their data for the purpose as they agree (active) on the consent as **Consent Records**.
- Customer can request to the company for managing their data based on PDPA rights, then the Admin or Data Protection Officer (DPO) of the system will manage the request as **"Data Requests"**.
- All activity doing in the system can be logged as **"Audit Logs"**.

## Workflow

### Admin

- **Auth**
  - Manage User data (CREATE, READ, UPDATE, DELETE).
  - Assign User's Role ("Admin", "DPO", "User") for each user.
  - Login as an Admin.
  - Logout
- **Data Subject**
  - Manage Data Subject (Customer) data (CREATE, READ, UPDATE, DELETE) based on Data Request.
  - Update consent activation for each data subject.
- **Data Request**
  - Manage Data Request (from Customer) data (CREATE, READ, UPDATE, DELETE)
  - Update request status (along with "DPO")
- **Dashboard**
  - View the dashboard data.
- **Audit Logs & Report**
  - Generate the report (along with "DPO")
  - View Audit Logs.
  
### DPO (Data Protection Officer)

- **Auth**
  - Login as a DPO.
  - Logout
- **Data Subject**
  - View Data Subject data.
- **Data Request**
  - Manage Data Request (from Customer) data (CREATE, READ, UPDATE, DELETE)
  - Update request status (along with "Admin")
- **Dashboard**
  - View the dashboard data.
- **Audit Logs & Report** 
  - Generate the report (along with "Admin")
  - View Audit Logs.

### User (Normal User)
- **Auth**
  - Login as a User.
  - Logout
- **Data Subject**
  - View Data Subject data.
- **Data Request**
  - View Data Request data.
- **Dashboard**
  - View Dashboard.
- **Audit Logs & Report**
  - View Audit Logs.