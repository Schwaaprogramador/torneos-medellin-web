"use client";

export default function EscenariosPage() {
  const escenarios = [
    {
      id: 1,
      nombre: "Coliseo Iván de Bedout",
      direccion: "Calle 10 # 42-35, Medellín",
      capacidad: "5,000 personas",
      deportes: ["Baloncesto", "Voleibol", "Fútbol Sala"]
    },
    {
      id: 2,
      nombre: "Estadio Atanasio Girardot",
      direccion: "Carrera 74 # 48-10, Medellín",
      capacidad: "45,000 personas",
      deportes: ["Fútbol", "Atletismo"]
    },
    {
      id: 3,
      nombre: "Unidad Deportiva de Belén",
      direccion: "Calle 30A # 77-64, Medellín",
      capacidad: "3,000 personas",
      deportes: ["Baloncesto", "Tenis", "Natación"]
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-6 text-white mb-6">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">Escenarios Deportivos</h1>
        <p className="text-gray-300">
          Conoce los principales escenarios para torneos en Medellín
        </p>
      </div>

      {/* Lista de Escenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {escenarios.map((escenario) => (
          <div key={escenario.id} className="bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
            {/* Imagen del escenario */}
            <div className="h-48 bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-800">{escenario.nombre.charAt(0)}</span>
            </div>

            {/* Información del escenario */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{escenario.nombre}</h2>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600">{escenario.direccion}</p>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-gray-600">Capacidad: {escenario.capacidad}</p>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <div>
                    <p className="text-gray-600 mb-1">Deportes:</p>
                    <div className="flex flex-wrap gap-1">
                      {escenario.deportes.map((deporte, index) => (
                        <span key={index} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          {deporte}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}