import React, { useState } from 'react';
import './Outliner.css';

const initialStructure = {
  name: 'Book 1',
  children: [
    {
      name: 'Section 1',
      children: [
        {
          name: 'Chapter 1',
          children: [
            { name: 'Scene 1', content: '', wordCount: 113, goal: 500 },
            { name: 'Scene 2', content: '', wordCount: 0, goal: 500 },
            { name: 'Scene 3', content: '', wordCount: 70, goal: 500 },
          ],
        },
        {
          name: 'Chapter 2',
          children: [{ name: 'Scene 1', content: '', wordCount: 0, goal: 500 }],
        },
      ],
    },
  ],
};

const SceneRow = ({ scene, onSelect }) => (
  <div className="scene-row" onClick={() => onSelect(scene)}>
    <span className="scene-name">{scene.name}</span>
    <span className="word-count">{scene.wordCount}</span>
    <span className="goal">{scene.goal}</span>
    <div className="bar-wrap">
      <div className="bar" style={{ width: `${(scene.wordCount / scene.goal) * 100}%` }}></div>
    </div>
  </div>
);

function Tree({ node, onSelect }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="tree-node">
      <div className="tree-label" onClick={() => setExpanded(!expanded)}>📁 {node.name}</div>
      {expanded && node.children && (
        <div className="tree-children">
          {node.children.map((child, idx) =>
            child.children ? (
              <Tree key={idx} node={child} onSelect={onSelect} />
            ) : (
              <SceneRow key={idx} scene={child} onSelect={onSelect} />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function OutlinerApp() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="container">
      <div className="tree-panel">
        <Tree node={initialStructure} onSelect={setSelected} />
      </div>
      <div className="scene-panel">
        {selected ? (
          <>
            <h3>{selected.name}</h3>
            <textarea
              value={selected.content}
              rows={20}
              onChange={(e) => setSelected({ ...selected, content: e.target.value })}
            />
          </>
        ) : (
          <p>Select a scene to start writing.</p>
        )}
      </div>
      <div className="side-panel">
        {selected && (
          <>
            <p><strong>Status:</strong> Draft</p>
            <p><strong>POV:</strong> None</p>
            <p><strong>Goal:</strong> {selected.goal}</p>
            <p><strong>Progress:</strong> {selected.wordCount}/{selected.goal}</p>
          </>
        )}
      </div>
    </div>
  );
}