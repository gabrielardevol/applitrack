import { Component, effect, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { VacanciesService } from '../vacancy-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { VACANCY_MODALITIES, VACANCY_ROLES, VACANCY_TYPES, VacancyForm } from '@app/shared/types';
import { LlmService } from '@app/shared/services/llm/llm-service';
import { EMPTY_VACANCY_FORM } from '@app/shared/constants';

@Component({
    selector: 'app-vacancy-form',
    imports: [FormField, ReactiveFormsModule],
    // providers: [LlmService],
    templateUrl: './vacancy-form.component.html',
    styleUrl: './vacancy-form.component.scss',
})
export class VacancyFormComponent {

    public readonly VACANCY_TYPES = VACANCY_TYPES;
    public readonly VACANCY_ROLES = VACANCY_ROLES;

    public readonly VACANCY_MODALITIES = VACANCY_MODALITIES;
    private vacanciesService = inject(VacanciesService);
    private llmService = new LlmService<VacancyForm>;

    modalityFormControl = new FormControl()
    roleFormControl = new FormControl()
    typeFormControl = new FormControl()
    private vacancy = signal<VacancyForm>(EMPTY_VACANCY_FORM)

    public vacancyForm = form(this.vacancy, (schemaPath) => {
        required(schemaPath.role, { message: 'Required field' });
        required(schemaPath.type, { message: 'Required field' });
        required(schemaPath.company, { message: 'Required field' });
    })

    type = `
        export type VacancyForm = {
            platform: string;
            skillsMust: string;
            skillsPlus: string;
            softSkills: string;
            recruiters: string; //HAS TO BE NAME + SURNAMES. IF MULTIPLE, SEPARATE WITH COMMA
            salaryRange: { 
            min: number | null, //MINIMUM GROSS SALARY PER YEAR
            max: number | null //MAXIMUM GROSS SALARY PER YEAR
            };
                 experienceRange: { 
            min: number | null, //MINIMUM EXPERIENCE IN YEARS
            max: number | null //MAXIMUM EXPERIENCE IN YEARS
            };
            role: 'UNDEFINED' | 'FRONTEND' | 'BACKEND' | 'FULLSTACK' | 'UX_UI';
            modality: 'UNDEFINED' | 'REMOTE' | 'ON_SITE' | 'HYBRID';
            location: string;
            company: string;
            id: string;
            date: Date | null;
            status: string;
        };`


    updateForm() {
        let message = `
        Return a json object of VACANCY based on the data on JOB_BOARD_MESSAGE. Do not add any extra words; it has to be a json object to be parsed. Your response has to start with '{' and end with '}'.
        OFFER_TYPE: ${this.type}
        JOB_BOARD_MESSAGE: ${this.vacancyForm().value().originalText}
        `

        this.llmService.callLlmApi(message).then(
            r => {
                r.originalText = this.vacancyForm().value().originalText
                r.modality = r.modality as VACANCY_MODALITIES
                r.role = r.role as VACANCY_ROLES
                this.vacancyForm().value.set(r)
                this.roleFormControl.setValue(r.role)
                this.modalityFormControl.setValue(r.modality)
                this.typeFormControl.setValue(r.type || VACANCY_TYPES.APPLICATION)
            }
        )
    }


    public submitButtonClicked: boolean = false;

    public submitForm() {
        this.submitButtonClicked = true;
        if (this.vacancyForm().valid()) {
            this.vacanciesService.create(this.vacancyForm().value());
            this.vacancyForm().value.set(EMPTY_VACANCY_FORM)
            this.vacancyForm().reset()
            this.submitButtonClicked = false;
        }
    }
}