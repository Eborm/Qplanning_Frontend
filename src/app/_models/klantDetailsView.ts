export class KlantDetailsView {
  id: number;
  medewerkerId: number;
  verantwoordelijkTeamId: number;
  naam: string;
  planbaarDoorTeamIds: number[];
  // List<DomainModelBoekjaar> Boekjaren { get; set; }
  startdatum: Date;
  einddatum: Date;
  medewerkerNaam: string;
  verantwoordelijkTeamNaam: string;
  plandbaarDoorTeamNamen: string[];
}

