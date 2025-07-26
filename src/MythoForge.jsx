import React, { useState } from 'react';

const SceneAnalyzer = ({ onTagsExtracted }) => {
  const [sceneText, setSceneText] = useState('');
  const [tags, setTags] = useState([]);
  const [logicMessage, setLogicMessage] = useState('');

  const logicKeywords = ['sword', 'gun'];
  const entities = [
    { type: "Character", name: "Kalqui" },
    { type: "Object", name: "Kṣaṇbindu" },
    { type: "Location", name: "Hiraṇyagarbha" }
  ];

  const extractTags = () => {
    const tagTypes = ['Character', 'Object'];
    const detectedTags = tagTypes.filter(type =>
      entities.some(e => e.type === type && sceneText.includes(e.name))
    );
    setTags(detectedTags);
    onTagsExtracted?.(detectedTags);

    const hasSword = sceneText.includes('sword');
    const hasGun = sceneText.includes('gun');
    setLogicMessage(
      hasSword && hasGun
        ? '⚠️ Logic Issue: Both sword and gun mentioned.'
        : '✅ No logic issues found.'
    );
  };

  const EntityTracker = ({ entities }) => {
    const [filter, setFilter] = useState('');

    const grouped = entities.reduce((acc, ent) => {
      if (!acc[ent.type]) acc[ent.type] = [];
      acc[ent.type].push(ent.name);
      return acc;
    }, {});

    const filteredKeys = Object.keys(grouped).filter(key =>
      key.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h3>🔍 Entities</h3>
        <input
          type="text"
          placeholder="Filter by type..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        {filteredKeys.map(type => (
          <div key={type}>
            <strong>{type}</strong>
            <ul>
              {grouped[type].map(name => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'serif' }}>
      <h1>🔥 MythoForge</h1>
      <section>
        <h2>✍️ Write Scene</h2>
        <textarea
          rows="4"
          style={{ width: '100%' }}
          placeholder="Enter scene text here..."
          value={sceneText}
          onChange={e => setSceneText(e.target.value)}
        />
        <button onClick={extractTags}>Analyze</button>
      </section>
      <section>
        <h3>🏷️ Tags:</h3>
        <p>{tags.join(', ') || 'None detected'}</p>
        <p>{logicMessage}</p>
      </section>
      <section>
        <h2>📜 Vault of Echoes</h2>
        <textarea placeholder="Write your unlinked idea, dialogue or scene..." style={{ width: '100%' }} />
      </section>
      <EntityTracker entities={entities} />
      <section>
        <h3>📓 Scene Log</h3>
        <p>[Placeholder for past scenes]</p>
      </section>
    </div>
  );
};

export default SceneAnalyzer;
