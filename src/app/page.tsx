"use client";

import { useRef } from "react";

export default function Home() {

  const escenariosRef = useRef<HTMLDivElement>(null);

  const scrollToEscenarios = () => {
    escenariosRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <main className="w-full  h-screen overflow-x-hidden bg-black text-white">
      {/* 1. Hero */}
          <section className="h-screen relative flex flex-col justify-center items-center text-center">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 bg-[url('/calvario.webp')] bg-cover bg-center"></div>
      {/* Overlay negro semitransparente */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Contenido encima */}
      <div className="relative z-10">
        <h1 className="text-6xl font-bold mb-8 text-white">Torneos Medellín</h1>
        <button className="px-6 py-3 border border-white rounded-2xl text-lg hover:bg-white hover:text-black transition">
          Ver más
        </button>
      </div>
    </section>


      {/* 2. Escenarios */}
      <section
        ref={escenariosRef}
        className="h-screen flex flex-col justify-center items-center px-6"
      >
        <h2 className="text-4xl font-bold mb-6">Escenarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {["Coliseo Iván de Bedout", "Estadio Atanasio Girardot", "Unidad Deportiva de Belén"].map(
            (escenario, i) => (
              <div
                key={i}
                className="border border-white rounded-2xl p-6 text-center hover:bg-white hover:text-black transition"
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
      <section className="h-screen flex flex-col justify-center items-center px-6 bg-white text-black">
        <h2 className="text-4xl font-bold mb-6">Torneos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {["Basket Medellín Cup", "Copa Fútbol Antioquia", "Open Voleibol Medellín"].map(
            (torneo, i) => (
              <div
                key={i}
                className="border border-black rounded-2xl p-6 text-center hover:bg-black hover:text-white transition"
              >
                <h3 className="text-2xl font-bold mb-2">{torneo}</h3>
                <p className="text-base">
                  Torneo abierto con categorías juveniles y profesionales.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* 4. Sobre Nosotros */}
      <section className="h-screen flex flex-col justify-center items-center px-6">
        <h2 className="text-4xl font-bold mb-6">Sobre Nosotros</h2>
        <p className="text-lg max-w-3xl text-center leading-relaxed">
          Somos una organización dedicada a promover el deporte en Medellín.
          Organizamos torneos de diferentes disciplinas para fomentar el talento
          local, el trabajo en equipo y el espíritu competitivo.
        </p>
      </section>
    </main>
  );
}
