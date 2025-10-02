export class BookingDetailsView {
  id: number;
  medewerkerId: number;
  klantId: number;
  opdrachttId: number;
  indirecteUrenId: number;
  jaar: number;
  boekjaar: number;
  weeknummer: number;
  uren: number;
  plannedDate: Date;
  medewerkerNaam: string;
  medewerkerFunctie: string;
  klantNaam: string;
  opdrachtNaam: string;
  indirecterUrenNaam: string;
  geboektOp: string;
  canBeEdited: boolean;
}
