interface Torneo {
  _id: string;
  name: string;
  format: string;
  status: string;
  image?: string;
  maxTeams?: number;
  acceptedTeams: any[];
  requestTeams: any[];
  createdAt: string;
  organizerId?: string;
  champion?: any;
}