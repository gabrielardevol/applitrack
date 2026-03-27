export type Offer = {
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
    type: OFFER_TYPES
    status: string;
    annotations: Annotation[];
    modality: OFFER_MODALITIES,
    location: string
}

export type OfferForm = {
    platform: string;
    date: Date;
    skillsMust: string[];
    skillsPlus: string[];
    softSkills: string[];
    recruiters: Contact[];
    originalText: string;
    salaryRange: { min: number, max: number };
    role: string;
    type: OFFER_TYPES
    status: string;
    annotations: Annotation[];
    modality: OFFER_MODALITIES,
    location: string
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
    OFFER = 0,
    RESPONSE = 1,
    INTERVIEW = 2
}

export enum OFFER_TYPES {
    PROPOSAL = 0,
    APPLICATION = 1
}

export enum OFFER_MODALITIES {
    REMOTE = 0, ON_SITE = 1, HYBRID = 2
}

export type Tips = {
    before: string[],
    during: string[],
    after: string[],
    other: string[]
}