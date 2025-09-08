"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/config";
import { Torneo } from "../interfaces/torneos";


export default function TorneosPage() {
  const [torneos, setTorneos] = useState<Torneo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTorneos = async () => {
      try {
        const response = await fetch(`${API_URL}/torneos`);
        const data = await response.json();
        setTorneos(data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTorneos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-gray-100 min-h-screen p-5">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">
          Torneos Medellin
        </h1>
        <p className="text-gray-300">
          Explora y participa en los torneos activos
        </p>
      </div>

      {/* Lista de Torneos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {torneos.map((torneo) => (
          <div key={torneo._id} className="bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
            {/* Imagen del Torneo */}
            <div className="h-48 bg-gradient-to-br from-yellow-400 to-yellow-500 relative">
              {torneo.image && (
                <img
                  src={torneo.image}
                  alt={torneo.name}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-3 right-3">
                <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                  {torneo.teams?.length || 0} equipos
                </span>
              </div>
            </div>

            {/* Información del Torneo */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-800">{torneo.name}</h3>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {torneo.format}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Creado: {new Date(torneo.createdAt).toLocaleDateString('es-ES')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Estado: {torneo.status}
                </div>
              </div>

              {/* Acciones */}
              <div className="flex space-x-2">
                <Link href={`/torneos/${torneo._id}`} className="flex-1">
                  <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                    Ver Detalles
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}