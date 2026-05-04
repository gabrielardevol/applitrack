import { Vacancy, VACANCY_MODALITIES, VACANCY_ROLES, VACANCY_TYPES, VacancyForm, RESPONSE_TYPES, ResponseForm, VACANCY_STATUS } from "./types";

export const EMPTY_VACANCY_FORM: VacancyForm = {
    title: '',
    platform: '',
    skillsMust: '',
    skillsPlus: '',
    softSkills: '',
    recruiters: '',
    originalText: '',
    salaryRange: {
        min: null, max: null
    },
    experienceRange: {
        min: null, max: null
    },
    role: VACANCY_ROLES.UNDEFINED,
    type: VACANCY_TYPES.APPLICATION,
    modality: VACANCY_MODALITIES.UNDEFINED,
    location: '',
    company: '',
    id: '',
    date: null,
    positiveResponse: false,
    status: VACANCY_STATUS.APPLIED,
}

export const EMPTY_RESPONSE_FORM: ResponseForm = {
    id: '',
    vacancyId: '',
    type: RESPONSE_TYPES.INFORMATION_REQUEST,
    people: '',
    originalText: '',
    proposalAmount: 0,
    interviewDate: null

}
