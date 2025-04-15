// src/models/FpoModel.ts
export interface FpoModel {
    id: string; // or 'number' based on your data type
    _id: string;
    entity_name: string;
    no_of_farmers: number;
    district: string;
    state: string;
    contact_person_phone: string;
  }
  