interface Equipo {
  _id: string;
  name: string;
  image?: string;
  description?: string;
  createdAt: string;
  organizerId?: string;
  champion?: any;
}
interface Torneo {
  _id: string;
  name: string;
  format: string;
  status: string;
  image?: string;
  maxTeams?: number;
  teams: Equipo[];
  requestTeams: Equipo[];
  createdAt: string;
  organizerId?: string;
  champion?: any;
  noticias: Noticia[];
}

interface Noticia {
  _id: string;
  title: string;
  body: string;
  image?: string;
  createdAt: string;
  tournamentId?: string;
}

export type { Equipo, Torneo, Noticia };


