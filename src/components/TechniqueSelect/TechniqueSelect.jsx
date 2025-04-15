import React from 'react';
import Select from 'react-select';

const TechniqueSelect = ({ techniques, onSelectTechnique }) => {
  if (!techniques) return null;

  const options = [
    {
      label: "Favorites",
      options: techniques.favorites || []
    },
    {
      label: "All Techniques",
      options: techniques.all || []
    }
  ].filter(group => group.options.length > 0);

  const customStyles = {
    control: (base) => ({
      ...base,
      minWidth: '250px',
      background: 'white',
      borderColor: '#e2e8f0',
      '&:hover': {
        borderColor: '#cbd5e1'
      }
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#84cc16' : state.isFocused ? '#ecfccb' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      '&:active': {
        backgroundColor: '#84cc16'
      }
    }),
    groupHeading: (base) => ({
      ...base,
      color: '#64748b',
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'none'
    })
  };

  return (
    <Select
      options={options}
      onChange={(option) => onSelectTechnique(option?.value)}
      placeholder="Select a technique..."
      isClearable
      styles={customStyles}
      className="w-full max-w-xs mx-auto"
    />
  );
};

export default TechniqueSelect;