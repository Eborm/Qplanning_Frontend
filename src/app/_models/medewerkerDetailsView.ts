export class MedewerkerDetailsView {
  id: number;
  voornaam: string;
  tussenVoegsel: string;
  achternaam: string;
  email: string;
  tarief: number;
  internTarief: number;
  isActief: boolean;
  medewerkerFunctieId: number;
  teamId: number;
  medewerkerFunctieNaam: string;
  teamNaam: string;
  plandbaarDoorTeamNamen: string[];
  planbaarDoorTeamIds: number[];
}
