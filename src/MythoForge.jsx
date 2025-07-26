import React, { useState } from 'react';

const MythoForge = () => {
  const [entities, setEntities] = useState([]);
  const [scenes, setScenes] = useState([]);
  const [newScene, setNewScene] = useState({ title: '', text: '' });
  const [vault, setVault] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const addVaultItem = (content, type) => {
    setVault(prev => [...prev, { content, type, linkedTo: null }]);
  };

  const addEntity = (name, type, items = [], tags = []) => {
    setEntities(prev => [...prev, {
      id: Date.now(),
      name,
      type,
      items: new Set(items.map(i => i.toLowerCase())),
      tags,
      history: [],
      mergedFrom: [],
      mergedInto: null,
    }]);
  };

  const mergeEntities = (id1, id2, newName) => {
    const e1 = entities.find(e => e.id === id1);
    const e2 = entities.find(e => e.id === id2);
    const newEntity = {
      id: Date.now(),
      name: newName,
      type: 'merged',
      items: new Set([...e1.items, ...e2.items]),
      tags: [...e1.tags, ...e2.tags],
      history: [...e1.history, ...e2.history],
      mergedFrom: [e1.name, e2.name],
      mergedInto: null
    };
    const updated = entities.map(e => {
      if (e.id === id1 || e.id === id2) return { ...e, mergedInto: newName };
      return e;
    });
    setEntities([...updated, newEntity]);
  };

  const analyzeScene = () => {
    const scene = { ...newScene, notes: [] };
    const used = new Set();

    for (const entity of entities) {
      for (let item of entity.items) {
        const re = new RegExp(`\b${entity.name}\b.*?\b(pulled|used|wielded|fired).*?\b(\w+)`, 'gi');
        let match;
        while ((match = re.exec(scene.text))) {
          const mentioned = match[2].toLowerCase();
          if (!entity.items.has(mentioned)) {
            scene.notes.push(`⚠️ ${entity.name} used untracked item: "${mentioned}"`);
          }
          used.add(mentioned);
        }
      }
    }
    setScenes(prev => [...prev, scene]);
    setFeedback(scene.notes);
    setNewScene({ title: '', text: '' });
  };

  return (
    <div className="p-6 space-y-6 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold">🔥 MythoForge</h1>

      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-xl mb-2">✍️ Write Scene</h2>
        <input type="text" placeholder="Scene Title" className="p-2 w-full mb-2 text-black" value={newScene.title} onChange={e => setNewScene({ ...newScene, title: e.target.value })} />
        <textarea placeholder="Enter scene text here..." className="p-2 w-full h-32 text-black" value={newScene.text} onChange={e => setNewScene({ ...newScene, text: e.target.value })}></textarea>
        <button onClick={analyzeScene} className="mt-2 bg-indigo-600 px-4 py-2 rounded">Analyze</button>
        {feedback.length > 0 && (
          <ul className="mt-3 text-red-400 list-disc pl-6">
            {feedback.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        )}
      </div>

      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-xl mb-2">💬 Vault of Echoes</h2>
        <textarea placeholder="Write your unlinked idea, dialogue or fragment..." className="p-2 w-full h-24 text-black" onBlur={e => addVaultItem(e.target.value, 'fragment')}></textarea>
        <ul className="mt-3 list-disc pl-6">
          {vault.map((v, i) => <li key={i}>🕯️ {v.content}</li>)}
        </ul>
      </div>

      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-xl mb-2">🌌 Entities</h2>
        <ul className="space-y-2">
          {entities.map(e => (
            <li key={e.id} className="border-b border-gray-700 pb-2">
              <strong>{e.name}</strong> ({e.type})
              {e.mergedFrom.length > 0 && <div className="text-sm">🧬 Merged from: {e.mergedFrom.join(" + ")}</div>}
              {e.mergedInto && <div className="text-sm">🔁 Merged into: {e.mergedInto}</div>}
              <div className="text-sm">🧰 Items: {[...e.items].join(", ")}</div>
              <div className="text-sm">🏷️ Tags: {e.tags.join(", ")}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-xl mb-2">📖 Scene Log</h2>
        {scenes.map((s, i) => (
          <div key={i} className="mb-4">
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p>{s.text}</p>
            {s.notes && s.notes.length > 0 && (
              <ul className="text-red-400 list-disc pl-6">
                {s.notes.map((n, j) => <li key={j}>{n}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MythoForge;