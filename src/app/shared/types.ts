export type Offer = {
    id: string;
    title: string;
    responseIds: string[];
    responses: Response[];
    platform: string;
    date: Date;
    skillsMust: string;
    skillsPlus: string;
    softSkills: string;
    recruiters: string;
    originalText: string;
    salaryRange: { min: number | null, max: number | null };
    experienceRange: { min: number | null, max: number | null }
    role: OFFER_ROLES;
    type: OFFER_TYPES;
    status: string;
    annotations: Annotation[];
    modality: OFFER_MODALITIES;
    location: string;
    company: string;
    createdAt?: Date;
}

export type OfferListItem = {
    id: string;
    role: string;
    company: string;
}

export type OfferForm = {
    title: string;
    platform: string;
    skillsMust: string;
    skillsPlus: string;
    softSkills: string;
    recruiters: string;
    originalText: string;
    salaryRange: { min: number | null, max: number | null };
    experienceRange: { min: number | null, max: number | null };
    role: OFFER_ROLES;
    type: OFFER_TYPES;
    modality: OFFER_MODALITIES;
    location: string;
    company: string;
    id: string;
    date: Date | null;
    status: string;
}

export type Response = {
    originalText: string;
    people: string;
    id: string;
    offerId: string;
    type: RESPONSE_TYPES,
    interviewId?: string;
    interview?: Interview | undefined,
    proposalAmount?: number | undefined,
    createdAt: Date;
}

export type ResponseForm = {
    originalText: string;
    people: string;
    id: string;
    offerId: string;
    type: RESPONSE_TYPES,
    interviewDate?: Date | undefined,

    proposalAmount?: number | undefined,
}

export type Interview = {
    responseId: string,
    scheduledDate: Date,
    people: Contact[],
    annotations: Annotation[]

}

export enum RESPONSE_TYPES {
    REJECTION = 'REJECTION',
    INFORMATION_REQUEST = 'INFORMATION_REQUEST',
    INTERVIEW_SCHEDULE = 'INTERVIEW_SCHEDULE',
    JOB_PROPOSAL = 'JOB_PROPOSAL'
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
    UNDEFINED = 'UNDEFINED', REMOTE = 'REMOTE', ON_SITE = 'ON_SITE', HYBRID = 'HYBRID'
}

export enum OFFER_ROLES {
    UNDEFINED = 'UNDEFINED', FRONTEND = 'FRONTEND', BACKEND = 'BACKEND', FULLSTACK = 'FULLSTACK', UX_UI = "UX_UI"
}

export enum OFFER_STATUS {
    ACTIVE_PROCESS = 'ACTIVE_PROCESS', REJECTED = 'REJECTED', INTERVIEWING = 'INTERVIEWING', SUCCESS = 'SUCCESS'
}

export type Tips = {
    before: string[],
    during: string[],
    after: string[],
    other: string[]
}