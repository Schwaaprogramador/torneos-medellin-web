"use client";

import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import { API_URL } from "@/config";

export default function Home() {
  const escenariosRef = useRef<HTMLDivElement>(null);
  
  const [torneos, setTorneos] = useState<Torneo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTorneos = async () => {
      try {
        const res = await fetch(`${API_URL}/torneos?`);
        const data = await res.json();
        setTorneos(data);
      } catch (error) {
        console.error('Error fetching torneos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTorneos();
  }, []);

  return (
    <main className="w-full h-screen overflow-x-hidden bg-gray-100 text-gray-800">
      {/* 1. Hero */}
      <section className="h-screen relative flex flex-col justify-center items-center text-center">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 bg-[url('/calvario.webp')] bg-cover bg-center"></div>
        {/* Overlay semitransparente */}
        <div className="absolute inset-0 bg-gray-900/60"></div>

        {/* Contenido encima */}
        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-8 text-yellow-400">Torneos Medellín</h1>
          <Link href="/torneos">
            <button className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-2xl text-lg font-medium hover:bg-yellow-400 transition">
              Ver más
            </button>
          </Link>
        </div>
      </section>

      {/* 2. Escenarios */}
      <section
        ref={escenariosRef}
        className="h-screen flex flex-col justify-center items-center px-6 bg-gray-800 text-white"
      >
        <h2 className="text-4xl font-bold mb-6 text-yellow-400">Escenarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {["Coliseo Iván de Bedout", "Estadio Atanasio Girardot", "Unidad Deportiva de Belén"].map(
            (escenario, i) => (
              <div
                key={i}
                className="border border-yellow-400 rounded-2xl p-6 text-center hover:bg-yellow-400 hover:text-gray-900 transition"
              >
                <h3 className="text-2xl font-bold mb-2">{escenario}</h3>
                <p className="text-base">
                  Un espacio deportivo de primer nivel para grandes eventos.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* 3. Torneos */}
      <section className="h-screen flex flex-col justify-center items-center px-6 bg-gray-100 text-gray-800">
        <h2 className="text-4xl font-bold mb-6 text-yellow-500">Torneos</h2>
        
        {loading ? (
          <p>Cargando torneos...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
              {torneos.map((torneo) => (
                <div
                  key={torneo._id}
                  className="border border-yellow-500 rounded-2xl p-6 text-center hover:bg-yellow-500 hover:text-gray-900 transition"
                >
                  <h3 className="text-2xl font-bold mb-2">{torneo.name}</h3>
                  <p className="text-base mb-2">Formato: {torneo.format}</p>
                  <p className="text-base mb-2">Status: {torneo.status}</p>
                </div>
              ))}
            </div>
            <Link href="/torneos" className="mt-8">
              <button className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-2xl text-lg font-medium hover:bg-yellow-400 transition">
                Ver todos los torneos
              </button>
            </Link>
          </>
        )}
      </section>

      {/* 4. Sobre Nosotros */}
      <section className="h-screen flex flex-col justify-center items-center px-6 bg-gray-800 text-white">
        <h2 className="text-4xl font-bold mb-6 text-yellow-400">Sobre Nosotros</h2>
        <p className="text-lg max-w-3xl text-center leading-relaxed">
          Somos una organización dedicada a promover el deporte en Medellín.
          Organizamos torneos de diferentes disciplinas para fomentar el talento
          local, el trabajo en equipo y el espíritu competitivo.
        </p>
      </section>
    </main>
  );
}