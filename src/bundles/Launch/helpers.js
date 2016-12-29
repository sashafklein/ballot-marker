export const getTitle = type => {
  return {
    general: 'General Election'
  }[type] || 'Election';
};
