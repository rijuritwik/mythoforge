import React, { useState } from 'react';

export default function MythoForge() {
  const [sceneTitle, setSceneTitle] = useState('');
  const [sceneText, setSceneText] = useState('');
  const [untagged, setUntagged] = useState('');
  const [log, setLog] = useState([]);

  const logicChecker = (text) => {
    const contradictions = [];
    if (text.includes('pulled his gun') && text.includes('only had a sword')) {
      contradictions.push('❗ Contradiction: Character pulled a gun but was earlier described with only a sword.');
    }
    return contradictions;
  };

  const autoTags = (text) => {
    const tags = [];
    if (text.match(/Kalqui|Shilpragyā|Exspiravit/)) tags.push('Character');
    if (text.match(/sword|gun|orb|Kalsyū|Hiraṇyagarbha/)) tags.push('Object');
    if (text.match(/Janitra|Kṣaṇbindu|Echo/)) tags.push('Concept');
    return [...new Set(tags)];
  };

  const analyzeScene = () => {
    const contradictions = logicChecker(sceneText);
    const tags = autoTags(sceneText);

    const entry = {
      title: sceneTitle,
      summary: `Tags: ${tags.join(', ') || 'None'} | ${contradictions.length ? contradictions.join(' ') : 'No logic issues found.'}`
    };

    setLog([entry, ...log]);
    setSceneTitle('');
    setSceneText('');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'serif' }}>
      <h1>🔥 MythoForge</h1>

      <h3>📝 Write Scene</h3>
      <input
        placeholder="Scene Title"
        value={sceneTitle}
        onChange={(e) => setSceneTitle(e.target.value)}
        style={{ width: '40%', marginBottom: '0.5rem' }}
      />
      <br />
      <textarea
        placeholder="Enter scene text here..."
        value={sceneText}
        onChange={(e) => setSceneText(e.target.value)}
        rows={6}
        cols={60}
      />
      <br />
      <button onClick={analyzeScene}>Analyze</button>

      <h3>💬 Vault of Echoes</h3>
      <textarea
        placeholder="Write your unlinked idea, dialogue or fragment here..."
        value={untagged}
        onChange={(e) => setUntagged(e.target.value)}
        rows={3}
        cols={60}
      />

      <h3>📘 Entities</h3>
      <p>Entity tags will be detected automatically in the next update (coming soon).</p>

      <h3>📜 Scene Log</h3>
      <ul>
        {log.map((entry, index) => (
          <li key={index}>
            <strong>{entry.title}:</strong> {entry.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}
