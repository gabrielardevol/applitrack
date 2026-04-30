import { Offer, OFFER_MODALITIES, OFFER_ROLES, OFFER_TYPES, OfferForm, RESPONSE_TYPES, ResponseForm } from "./types";

export const EMPTY_OFFER_FORM: OfferForm = {
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
    role: OFFER_ROLES.UNDEFINED,
    type: OFFER_TYPES.APPLICATION,
    modality: OFFER_MODALITIES.UNDEFINED,
    location: '',
    company: '',
    id: '',
    date: null,
    status: '' //OFFER_STATUS
}

export const EMPTY_RESPONSE_FORM: ResponseForm = {
    id: '',
    offerId: '',
    type: RESPONSE_TYPES.INFORMATION_REQUEST,
    people: '',
    originalText: '',

}
