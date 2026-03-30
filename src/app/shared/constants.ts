import { Offer, OFFER_MODALITIES, OFFER_TYPES, OfferForm, RESPONSE_TYPES, ResponseForm } from "./types";

export const EMPTY_OFFER_FORM: OfferForm = {
    platform: '',
    skillsMust: '',
    skillsPlus: '',
    softSkills: '',
    recruiters: '',
    originalText: '',
    salaryRange: {
        min: null, max: null
    },
    role: '',
    type: OFFER_TYPES.APPLICATION,
    modality: OFFER_MODALITIES.HYBRID,
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
