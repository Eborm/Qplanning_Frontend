export class PersonalPlanningViewModel {
  totalAmountOfWeeks: number;
  years: {
    year: number;
    weeks: [{
      weeknumber: number;
      startOfWeekDay: string;
    }]
  };
  topRows: {
    expanded: boolean;
    naam: string;
    opdrachtleider: string;
    functie: string;
    total: string;
    planning: [{
      uren: number;
    }]
    detailRows: {
      naam: string;
      planning: [{
        uren: number;
      }]
    }
  };
}
