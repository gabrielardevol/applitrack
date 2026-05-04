import { computed, inject, Injectable } from '@angular/core';
import { VacanciesService } from '@app/shared/services/vacancies/vacancy-service';
import { ResponsesService } from '@app/shared/services/responses/responses-service';
import { InterviewService } from '@app/shared/services/interviews/interview.service';
import { RESPONSE_TYPES, VACANCY_STATUS } from '@app/shared/types';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly responsesService = inject(ResponsesService);
  private readonly vacanciesService = inject(VacanciesService);
  public readonly interviewsService = inject(InterviewService);

  public responsesCount = computed(() => this.responsesService.$listValue().length)

  public vacanciesCount = computed(() => this.vacanciesService.$listValue().length)

  public interviewsCount = computed(() => this.interviewsService.$listValue().length)

  // public vacanciesWithOneInterview
  // public vacanciesWithTwoInterviews
  // public vacanciesWithThreeInterviews
  // public vacanciesWithFourInterviews

  public positivelyRespondedVacancies = computed(() => {
    let vacancyIds = this.vacanciesService.$listValue().filter(v => v.status != VACANCY_STATUS.REJECTED && v.status != VACANCY_STATUS.APPLIED).map(v => v.id)
    let responseVacancyIds = this.responsesService.$listValue().filter(r => r.type != RESPONSE_TYPES.REJECTION).map(r => r.vacancyId)
    let allVacancyIds = [...new Set([...vacancyIds, ...responseVacancyIds])];
    return allVacancyIds
  })

  public positiveResponseRatio = computed(() => {
    return this.positivelyRespondedVacancies().length / this.vacanciesCount()
  })

  private readonly reciprocatedVacancies = computed(() => this.vacanciesService.$listValue().filter(v => v.status == VACANCY_STATUS.RECIPROCATED))

  public reciprocatedVacanciesCount = this.reciprocatedVacancies().length

  public averageReciprocatedSalary = computed(() => {
    let averageSalariesOfEachReciprocatedOffer: (number | undefined)[] = this.reciprocatedVacancies().map(
      v => {
        let max = v.salaryRange.max || null;
        let min = v.salaryRange.min || null;
        if (min && max) { return min + max / 2 };
        if (min) return min;
        if (max) return max;
        return undefined;
      })
    let totalAverage = averageSalariesOfEachReciprocatedOffer.reduce(
      (acc, curr) => {
        let acc2 = acc ? acc : 0;
        let curr2 = curr ? curr : 0;
        return acc2 + curr2
      }, 0)
    return totalAverage
  })

  public geolocations = computed(() =>
    this.vacanciesService.$listValue().filter(v => v.geolocation).map(v => {
      lat: v.geolocation?.lat;
      lon: v.geolocation?.lon;
      id: v.id;
    })
  )

  public reciprocatedSalaryDistribution = computed(() => {
    this.vacanciesService.$listValue().map(
      v => {
        if (v.salaryRange.min || v.salaryRange.max) { return v.salaryRange };
        return undefined;
      })
  })

  public skillsFrequency = computed(
    () => {
      let skillsMust: string[] = []
      let skillsPlus: string[] = []
      let skillsSoft: string[] = []
      this.vacanciesService.$listValue().forEach(v => {
        skillsMust = [...skillsMust, ...v.skillsMust.split(',')];
        skillsPlus = [...skillsPlus, ...v.skillsPlus.split(',')];
        skillsSoft = [...skillsSoft, ...v.softSkills.split(',')];
      }
      )
      let skillsCount = {}
      skillsMust.forEach(
        el => { (skillsCount as any)[el] ? (skillsCount as any)[el]++ : (skillsCount as any)[el] = 1 }
      )
    }
  )
}
