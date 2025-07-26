import React, { useState } from 'react';

const mockData = [
  {
    title: 'Book 1',
    children: [],
  },
  {
    title: 'Book 2',
    children: [
      {
        title: 'Section 1',
        children: [],
      },
      {
        title: 'Section 2',
        children: [
          {
            title: 'Chapter 2',
            children: [
              { title: 'Scene 1' },
              { title: 'Scene 2' },
              { title: 'Scene 3' },
              { title: 'Scene 4' },
            ],
          },
          {
            title: 'Chapter 3',
            children: [
              { title: 'Scene 1' },
              { title: 'Scene 2' },
              { title: 'Scene 3' },
              { title: 'Scene 4' },
              { title: 'Scene 5' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Book 3',
    children: [],
  },
];

function TreeNode({ node }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{ marginLeft: '1em' }}>
      {node.children?.length > 0 ? (
        <div>
          <span
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '▼ ' : '▶ '}
            {node.title}
          </span>
          {expanded &&
            node.children.map((child, i) => (
              <TreeNode key={i} node={child} />
            ))}
        </div>
      ) : (
        <div style={{ marginLeft: '1em' }}>📄 {node.title}</div>
      )}
    </div>
  );
}

export default function OutlineTree() {
  return (
    <div>
      <h2>📚 Outline View</h2>
      {mockData.map((node, index) => (
        <TreeNode key={index} node={node} />
      ))}
    </div>
  );
}
