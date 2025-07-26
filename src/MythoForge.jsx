import React, { useState } from 'react';

const initialData = {
  name: 'Book 1',
  children: [
    {
      name: 'Section 1',
      children: [
        {
          name: 'Chapter 1',
          children: [
            { name: 'Scene 1', content: '' },
            { name: 'Scene 2', content: '' }
          ]
        },
        {
          name: 'Chapter 2',
          children: [
            { name: 'Scene 1', content: '' },
            { name: 'Scene 2', content: '' }
          ]
        }
      ]
    },
    {
      name: 'Section 2',
      children: []
    }
  ]
};

function TreeNode({ node, onSelect }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{ marginLeft: 16 }}>
      <div onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
        ▶️ {node.name}
      </div>
      {expanded && node.children && node.children.map((child, index) => (
        <TreeNode key={index} node={child} onSelect={onSelect} />
      ))}
      {!node.children && (
        <div
          onClick={() => onSelect(node)}
          style={{ marginLeft: 16, cursor: 'pointer', color: 'dodgerblue' }}
        >
          📝 {node.name}
        </div>
      )}
    </div>
  );
}

export default function OutlineTree() {
  const [selectedScene, setSelectedScene] = useState(null);

  return (
    <div style={{ display: 'flex', height: '90vh' }}>
      <div style={{ width: '40%', borderRight: '1px solid #ccc', padding: '1rem', overflowY: 'scroll' }}>
        <h2>📚 Outline</h2>
        <TreeNode node={initialData} onSelect={setSelectedScene} />
      </div>
      <div style={{ width: '60%', padding: '1rem' }}>
        {selectedScene ? (
          <div>
            <h3>{selectedScene.name}</h3>
            <textarea
              rows={20}
              style={{ width: '100%' }}
              placeholder="Write your scene here..."
              value={selectedScene.content || ''}
              onChange={(e) => {
                selectedScene.content = e.target.value;
                setSelectedScene({ ...selectedScene });
              }}
            />
          </div>
        ) : (
          <p>Select a scene from the left to begin writing.</p>
        )}
      </div>
    </div>
  );
}
