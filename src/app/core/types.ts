export type Offer = {
    id: string;
    responses: Response[];
    platform: string;
    date: Date;
    skillsMust: string[];
    skillsPlus: string[];
    softSkills: string[];
    recruiters: Contact[];
    originalText: string;
    salaryRange: { min: number, max: number };
    role: string;
    type: OFFER_TYPES;
    status: string;
    annotations: Annotation[];
    modality: OFFER_MODALITIES;
    location: string;
    company: string;
}

export type OfferListItem = {
    id: string;
    role: string;
    company: string;
}

export type OfferForm = {
    platform: string;
    skillsMust: string;
    skillsPlus: string;
    softSkills: string;
    recruiters: string;
    originalText: string;
    salaryRange: { min: number | null, max: number | null };
    role: string;
    type: OFFER_TYPES;
    modality: OFFER_MODALITIES;
    location: string;
    company: string;
    id: string | null;
}

export type Response = {
    offerId: string;
    type: RESPONSE_TYPES,
    interview?: Interview | undefined,
    proposalAmount?: number | undefined,
    annotations: Annotation[]
}

export type Interview = {
    responseId: string,
    scheduledDate: Date,
    people: Contact[],
    annotations: Annotation[]

}

export enum RESPONSE_TYPES {
    REJECTION = 0,
    INFORMATION_REQUEST = 1,
    INTERVIEW_SCHEDULE = 2,
    JOB_PROPOSAL = 3
}

export type Contact = {
    name: string,
    company: string,
    position: string,
    lastContact: Date,
    mail: string,
    phone: string
}

export type Annotation = {
    date: Date,
    message: string,
    relatedId: string,
    relatedType: ANNOTATION_ENTITY_TYPES
}

export enum ANNOTATION_ENTITY_TYPES {
    OFFER = 'OFFER',
    RESPONSE = 'RESPONSE',
    INTERVIEW = 'INTERVIEW'
}

export enum OFFER_TYPES {
    PROPOSAL = 'PROPOSAL',
    APPLICATION = 'APPLICATION'
}

export enum OFFER_MODALITIES {
    REMOTE = 'REMOTE', ON_SITE = 'ON_SITE', HYBRID = 'HYBRID'
}

export type Tips = {
    before: string[],
    during: string[],
    after: string[],
    other: string[]
}