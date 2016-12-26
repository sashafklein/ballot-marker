export const getTitle = (type) => {
  switch (type) {
    case 'general': {
      return 'General Election';
    }
    default: {
      return 'Election';
    }
  }
};
