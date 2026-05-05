export type Vacancy = {
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
    role: VACANCY_ROLES;
    type: VACANCY_TYPES;
    status: string;
    annotations: Annotation[];
    modality: VACANCY_MODALITIES;
    location: string;
    geolocation?: { lat: number, lon: number }
    company: string;
    createdAt: Date | string;
    positiveResponse: boolean
}

export type VacancyListItem = {
    createdAt: Date | string
    title: string;
    id: string;
    role: string;
    company: string;
    status: VACANCY_STATUS;
    salaryRange: {
        min: number,
        max: number
    },
    geolocation?: { lat: number, lon: number },
    positiveResponse: boolean,
    skillsMust: string;
    skillsPlus: string;
    softSkills: string;
}

export type VacancyForm = {
    title: string;
    platform: string;
    skillsMust: string;
    skillsPlus: string;
    softSkills: string;
    recruiters: string;
    originalText: string;
    salaryRange: { min: number | null, max: number | null };
    experienceRange: { min: number | null, max: number | null };
    role: VACANCY_ROLES;
    type: VACANCY_TYPES;
    modality: VACANCY_MODALITIES;
    location: string;
    company: string;
    id: string;
    date: Date | null;
    status: string;
    positiveResponse: boolean
}

export type Response = {
    originalText: string;
    people: string;
    id: string;
    vacancyId: string;
    type: RESPONSE_TYPES,
    interviewId?: string;
    interview?: InterviewCreation | undefined,
    proposalAmount?: number | undefined,
    createdAt: Date;
}

export type ResponseForm = {
    originalText: string;
    people: string;
    id: string;
    vacancyId: string;
    type: RESPONSE_TYPES,
    interviewDate: Date | null,
    proposalAmount: number,
}

export type InterviewCreation = {
    responseId: string,
    scheduledDate: Date,
    // people: Contact[],
    // annotations: Annotation[]
}

export type Interview = {
    id: string;
    responseId: string,
    scheduledDate: Date,
    createdAt: Date | string

}

export enum RESPONSE_TYPES {
    REJECTION = 'REJECTION',
    INFORMATION_REQUEST = 'INFORMATION_REQUEST',
    INTERVIEW_SCHEDULE = 'INTERVIEW_SCHEDULE',
    JOB_PROPOSAL = 'JOB_PROPOSAL'
}

export type Contact = {
    createdAt: Date | string
    id: string,
    name: string,
    company: string,
    position?: string,
    lastContact?: Date,
    mail?: string,
    phone?: string
}

export type ContactForm = {
    name: string,
    company: string,
    position?: string,
    lastContact?: Date,
    mail?: string,
    phone?: string
}

export type Annotation = {
    id: string,
    createdAt: | string,
    message: string,
    relatedId: string,
    relatedType: ANNOTATION_ENTITY_TYPES
}

export type AnnotationForm = {
    message: string,
    relatedId: string,
    relatedType: ANNOTATION_ENTITY_TYPES
}

export enum ANNOTATION_ENTITY_TYPES {
    OFFER = 'OFFER',
    RESPONSE = 'RESPONSE',
    INTERVIEW = 'INTERVIEW'
}

export enum VACANCY_TYPES {
    PROPOSAL = 'PROPOSAL',
    APPLICATION = 'APPLICATION'
}

export enum VACANCY_STATUS {
    APPLIED = 'APPLIED',
    IN_PROCESS = 'IN_PROCESS',
    REJECTED = 'REJECTED',
    RECIPROCATED = 'RECIPROCATED'
}

export enum VACANCY_MODALITIES {
    UNDEFINED = 'UNDEFINED', REMOTE = 'REMOTE', ON_SITE = 'ON_SITE', HYBRID = 'HYBRID'
}

export enum VACANCY_ROLES {
    UNDEFINED = 'UNDEFINED', FRONTEND = 'FRONTEND', BACKEND = 'BACKEND', FULLSTACK = 'FULLSTACK', UX_UI = "UX_UI"
}

export type Tips = {
    before: string[],
    during: string[],
    after: string[],
    other: string[]
}