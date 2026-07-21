import { useState } from 'react';
import { Select } from '../select/select';
import './app.css';

const planets = ['Марс', 'Европа', 'Титан', 'Плутон'];

interface CrewMember {
  id: string;
  name: string;
  role: string;
}

const crew: CrewMember[] = [
  { id: 'root', name: 'Рут', role: 'капитан' },
  { id: 'hooks', name: 'Хукс', role: 'старший инженер' },
  { id: 'reactiva', name: 'Реактива', role: 'на связи с Vue Nebula' },
];

export function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [selectedCrewMember, setSelectedCrewMember] = useState<CrewMember | null>(null);

  return (
    <main className="app">
      <h1>Один компонент — разные типы данных</h1>

      <section>
        <h2>Курс на планету</h2>
        {/* TItem выводится как string — getLabel получает string, а не unknown */}
        <Select items={planets} getKey={(planet) => planet} getLabel={(planet) => planet} onSelect={setSelectedPlanet} />
        {selectedPlanet && <p>Курс проложен на {selectedPlanet}.</p>}
      </section>

      <section>
        <h2>Дежурный по смене</h2>
        {/* TItem выводится как CrewMember — getLabel получает объект с полями name/role */}
        <Select
          items={crew}
          getKey={(member) => member.id}
          getLabel={(member) => `${member.name} (${member.role})`}
          onSelect={setSelectedCrewMember}
        />
        {selectedCrewMember && <p>Дежурит: {selectedCrewMember.name}.</p>}
      </section>
    </main>
  );
}
