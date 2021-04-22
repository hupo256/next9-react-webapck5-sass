// todo... need refactor
export const matchUrlToBreadCrumb = ({ routes, match, route }) => {
  const segList = [];
  segList.push({
    displayName: '首页',
    src: '/',
  });

  segList.push({
    displayName: route.name,
    src: match.url.replace('/' + match.params.id, ''),
  });

  segList.push({
    displayName: match.params.id,
    src: null,
  });

  return segList;
};

export const calCurrentMenu = (match) => {
  return match.url.replace('/' + match.params.id, '');
};
