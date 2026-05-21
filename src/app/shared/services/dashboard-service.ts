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

  public conversionFunnel = computed(() => {
    let allVccIds = this.responsesService.$listValue().map(i => i.vacancyId)
    let allVccUniqueIds = new Set(allVccIds);
    let positiveVccIds = this.responsesService.$listValue().filter(i => i.type !== RESPONSE_TYPES.REJECTION).map(i => i.vacancyId)
    let positiveVccUniqueIds = new Set(positiveVccIds);
    let funnel: { key: string, value: number }[] = [];

    let index = 0;
    while (positiveVccIds.length > 0) {

      let counter = 0;
      for (const id of positiveVccUniqueIds) {
        if (positiveVccIds.includes(id)) {
          let i = positiveVccIds.indexOf(id)
          positiveVccIds.splice(i, 1);
          counter++;
        }
      }

      funnel.push({
        key: (index + 1).toString(), value: counter
      })
      index++;
      counter = 0;
    }
    return [

      {
        key: 'responded'
        , value: allVccUniqueIds.size
      },
      ...funnel,
      {
        key: 'reciprocated',
        value: this.reciprocatedVacancies().length
      }
    ]
  });

  public vacanciesByWeekDay = computed(() => {
    let distribution: {
      count: { 0: number, 1: number, 2: number, 3: number, 4: number, 5: number, 6: number },
      average: { 0: number, 1: number, 2: number, 3: number, 4: number, 5: number, 6: number }
    } = {
      count: {
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
      },
      average: {
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
      }
    }
    this.vacanciesService.$listValue().forEach(i => {
      let date = new Date(i.createdAt);
      (distribution.count as any)[date.getDay()]++
    })

    let dateDistribution = this.vacanciesService.$listDateDistribution()

    function getAverage(array: number[]) {
      if (!array) return 0;
      let sum = 0;
      for (let i = 0; i < array.length; i++) {
        sum += array[i];
      }
      return sum / array.length;
    }

    let distributionPerWeekDay = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

    console.log('dateDistribution', dateDistribution)
    Object.keys(dateDistribution).map(i => {
      let date = new Date(i);
      console.log(i, '----', date)

      let weekDay: number = date.getDay();
      (distributionPerWeekDay as any)[weekDay].push((dateDistribution as any)[i])
    });

    Object.keys(distributionPerWeekDay).forEach(
      key => (distribution.average as any)[key] = getAverage((distributionPerWeekDay as any)[key])
    )
    return distribution;
  })

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
        if (min && max) { return (min + max) / 2 };
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
      let allSkills: string[] = []
      this.vacanciesService.$listValue().forEach(v => {
        allSkills = [...allSkills, ...v.skillsMust.split(',').map(skill => skill.trim().toLowerCase())];
        allSkills = [...allSkills, ...v.skillsPlus.split(',').map(skill => skill.trim().toLowerCase())];
        allSkills = [...allSkills, ...v.softSkills.split(',').map(skill => skill.trim().toLowerCase())];
      }
      )

      return this.getSkillCountObjectFromStringArray(allSkills)
    }
  )

  public skillsFreqByFilteredVcc(filteringFn: Function) {
    let filteredVacancies = this.vacanciesService.$listValue().filter(i => filteringFn(i))
    let filteredSkills = filteredVacancies.map(i => [...i.skillsMust.split(',').map(skill => skill.trim().toLowerCase()), ...i.skillsPlus.split(',').map(skill => skill.trim().toLowerCase()), ...i.softSkills.split(',').map(skill => skill.trim().toLowerCase())]).reduce((acc, curr) => { return [...acc, ...curr] }, [])
    return this.getSkillCountObjectFromStringArray(filteredSkills)
  }

  private getSkillCountObjectFromStringArray(skills: string[]): { skill: string, count: number }[] {
    let newObj: {
      [key: string]: number
    } = skills.reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: (acc as any)[curr] + 1 || 1
      }
    }, {})

    let newArray: { skill: string, count: number }[] = []
    Object.entries(newObj).forEach(key => {
      newArray.push({
        skill: key[0],
        count: key[1]
      })
    })

    newArray.sort(
      (a, b) =>
        b.count - a.count
    )

    return newArray.filter(i => i.skill !== '')
  }

  public vacanciesCountTimeline = computed(
    () => {
      return [this.vacanciesService.sortedList('createdAt')].map(
        (vacancies) => {
          if (vacancies.length == 0) return {};
          let firstDate = new Date(vacancies[0].createdAt)
          let lastDate = new Date(vacancies[vacancies.length - 1].createdAt)
          var iterableDate = new Date(firstDate)
          let allDates: Date[] = [firstDate]
          while (iterableDate.getDate() != lastDate.getDate()) {
            iterableDate.setDate(iterableDate.getDate() + 1)
            allDates.push(new Date(iterableDate.getTime()))
          }
          let datesObj = allDates.reduce((acc, curr) => {
            return {
              ...acc,
              [`${curr.getDate()}-${curr.getMonth() + 1}-${curr.getFullYear()}`]: 0
            }
          }, {});

          vacancies.map(v => {
            let date = new Date(v.createdAt);
            let key = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            (datesObj as any)[key] = (datesObj as any)[key] + 1
          }
          )
          return datesObj;
        }
      )[0]
    }
  )

  public responsesCountTimeline = computed(
    () => {
      return [this.responsesService.sortedList('createdAt')].map(
        (responses) => {
          if (responses.length == 0) return {};
          let firstDate = new Date(responses[0]?.createdAt)
          let lastDate = new Date(responses[responses.length - 1]?.createdAt)
          var iterableDate = new Date(firstDate)
          let allDates: Date[] = [firstDate]
          while (iterableDate.getDate() != lastDate.getDate()) {
            iterableDate.setDate(iterableDate.getDate() + 1)
            allDates.push(new Date(iterableDate.getTime()))
          }
          let objectWithKeys = allDates.reduce((acc, curr) => {
            return {
              ...acc,
              [`${curr.getDate()}-${curr.getMonth() + 1}-${curr.getFullYear()}`]: 0
            }
          }, {});

          responses.map(v => {
            let date = new Date(v.createdAt);
            let key = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            (objectWithKeys as any)[key] = (objectWithKeys as any)[key] + 1
          }
          )
          return objectWithKeys;
        }
      )[0]
    }
  )

  public vacanciesAndResponsesCountTimeline = computed(
    () => {
      let vks = Object.keys(this.vacanciesCountTimeline())
      let rks = Object.keys(this.responsesCountTimeline())
      let mergedDates = new Set(
        [...vks,
        ...rks
        ],
      )
      let newObject = Array.from(mergedDates).reduce((acc, curr) => {
        return {
          ...acc,
          [curr]: {
            vacancies: (this.vacanciesCountTimeline() as any)[curr] || 0,
            responses: (this.responsesCountTimeline() as any)[curr] || 0
          }

        }
      }
        , {})

      return newObject

    }
  )
}
