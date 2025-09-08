"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { API_URL } from "@/config";
import { Torneo } from "@/app/interfaces/torneos";

interface Noticia {
  _id: string;
  title: string;
  body: string;
  img?: string;
  createdAt: string;
  escenarioId?: string;
}

export default function TorneoDetailPage() {
  const params = useParams();
  const [torneo, setTorneo] = useState<Torneo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTorneo = async () => {
      try {
        const response = await fetch(`${API_URL}/torneos/${params.torneoId}`);
        const data = await response.json();
        setTorneo(data);
      } catch (error) {
        console.error("Error fetching tournament:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTorneo();
  }, [params.torneoId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!torneo) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-gray-100">
        <p className="text-gray-800">No se encontró el torneo</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Banner de imagen */}
      {torneo.image && (
        <div className="w-full h-64 mb-6 relative rounded-lg overflow-hidden">
          <img 
            src={torneo.image} 
            alt={torneo.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white">{torneo.name}</h1>
          <div className="absolute bottom-6 right-6 flex items-center space-x-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {torneo.format}
            </span>
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
              {torneo.status}
            </span>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información del torneo */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg border border-gray-300 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Detalles del Torneo</h2>
          
          <div className="space-y-4">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Creado: {new Date(torneo.createdAt).toLocaleDateString('es-ES')}
            </div>

            {torneo.maxTeams && (
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Máximo de equipos: {torneo.maxTeams}
              </div>
            )}

            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Equipos inscritos: {torneo.teams.length}
            </div>

            {torneo.champion && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
                <p className="font-bold text-yellow-700">Campeón: {torneo.champion.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Equipos */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Equipos Participantes</h2>
          
          {torneo.teams.length > 0 ? (
            <div className="space-y-3">
              {torneo.teams.map((equipo) => (
                <Link 
                  key={equipo._id} 
                  href={`/torneos/${params.id}/equipos/${equipo._id}`}
                  className="block p-3 hover:bg-gray-100 rounded-lg transition"
                >
                  <p className="font-medium text-gray-800">{equipo.name}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No hay equipos inscritos aún</p>
          )}

          <div className="mt-6 pt-4 border-t">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Equipos en espera</h3>
            {torneo.requestTeams.length > 0 ? (
              <div className="space-y-2">
                {torneo.requestTeams.map((equipo) => (
                  <div key={equipo._id} className="p-2 bg-gray-50 rounded">
                    <p className="text-sm text-gray-700">{equipo.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No hay solicitudes pendientes</p>
            )}
          </div>
        </div>

        {/* Noticias */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-lg border border-gray-300 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Noticias del Torneo</h2>
          
          {torneo.noticias && torneo.noticias.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {torneo.noticias.map((noticia: Noticia) => (
                <div key={noticia._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  {noticia.img && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={noticia.img} 
                        alt={noticia.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{noticia.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(noticia.createdAt).toLocaleDateString('es-ES')}
                    </p>
                    <p className="text-gray-600 line-clamp-3">{noticia.body}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No hay noticias disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
}