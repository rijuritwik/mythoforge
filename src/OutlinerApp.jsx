import React, { useState } from 'react';
import './Outliner.css';

const generateId = (() => {
  let count = 0;
  return () => ++count;
})();

const initialStructure = {
  id: generateId(),
  name: 'Book 1',
  children: [
    {
      id: generateId(),
      name: 'Section 1',
      children: [
        {
          id: generateId(),
          name: 'Chapter 1',
          children: [
            { id: generateId(), name: 'Scene 1', content: '', wordCount: 113, goal: 500 },
            { id: generateId(), name: 'Scene 2', content: '', wordCount: 0, goal: 500 },
          ],
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

function Tree({ node, onSelect, onAdd }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="tree-node">
      <div className="tree-label" onClick={() => setExpanded(!expanded)}>📁 {node.name}</div>
      <button className="add-button" onClick={() => onAdd(node)}>➕</button>
      {expanded && node.children && (
        <div className="tree-children">
          {node.children.map((child, idx) =>
            child.children ? (
              <Tree key={child.id} node={child} onSelect={onSelect} onAdd={onAdd} />
            ) : (
              <SceneRow key={child.id} scene={child} onSelect={onSelect} />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function OutlinerApp() {
  const [structure, setStructure] = useState(initialStructure);
  const [selected, setSelected] = useState(null);

  const addSceneOrChild = (parentNode) => {
    const newName = prompt('Name of new scene or group?');
    if (!newName) return;
    const newNode = {
      id: generateId(),
      name: newName,
      content: '',
      wordCount: 0,
      goal: 500,
    };

    const addToTree = (node) => {
      if (node.id === parentNode.id) {
        const updatedChildren = node.children ? [...node.children, newNode] : [newNode];
        return { ...node, children: updatedChildren };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(addToTree),
        };
      }
      return node;
    };

    setStructure((prev) => addToTree(prev));
  };

  return (
    <div className="container">
      <div className="tree-panel">
        <Tree node={structure} onSelect={setSelected} onAdd={addSceneOrChild} />
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
