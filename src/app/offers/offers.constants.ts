import { OFFER_MODALITIES, OFFER_TYPES, OfferForm } from "../core/types";

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
    company: ''
}