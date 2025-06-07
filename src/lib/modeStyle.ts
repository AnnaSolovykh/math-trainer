export const getModeStyle = (mode: string) => {
    switch(mode) {
      case 'multiply': 
        return { 
          background: 'linear-gradient(to right, #fbbf24, #f59e0b)',
          progressColor: '#f59e0b'
        };
      case 'divide': 
        return { 
          background: 'linear-gradient(to right, #10b981, #059669)',
          progressColor: '#059669'
        };
      case 'mixed': 
        return { 
          background: 'linear-gradient(to right, #f97316, #dc2626, #fbbf24)',
          progressColor: '#dc2626'
        };
      default: 
        return { 
          background: 'linear-gradient(to right, #8b5cf6, #7c3aed)',
          progressColor: '#7c3aed'
        };
    }
  };
