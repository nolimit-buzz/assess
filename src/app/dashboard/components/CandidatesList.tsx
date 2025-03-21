import React, { useState } from 'react';
import CandidateListSection from './CandidateListSection';

export default function CandidatesList() {
  const [selectedEntries, setSelectedEntries] = useState<number[]>([]);

  const handleSelectCandidate = (id: number) => {
    setSelectedEntries(prev => {
      if (prev.includes(id)) {
        return prev.filter(entryId => entryId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleUpdateStages = async (stage: string, entries: number[]) => {
    // You can move the updateApplicationStage logic here if you want
    // to handle all API calls from the parent
  };

  return (
    <div>
      {candidates.map(candidate => (
        <CandidateListSection
          key={candidate.id}
          candidate={candidate}
          isSelected={selectedEntries.includes(candidate.id)}
          onSelectCandidate={handleSelectCandidate}
          onUpdateStages={handleUpdateStages}
          selectedEntries={selectedEntries}
        />
      ))}
    </div>
  );
} 