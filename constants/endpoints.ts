export const endpoint = {
  auth: {
    signin: '/account/Signin',
    signup: '/account/signup',
    ping: '/account/ping',
  },
  calendar: {
    get: '/calendar',
    post: '/calendar',
    put: '/calendar/',
    delete: '/calendar/',
    selected: '/calendar/selected',
  },
  phase: {
    get: '/phase',
    post: '/phase',
    put: '/phase/',
    delete: '/phase/',
    selected: '/phase/selected',
  },
  group: {
    get: '/group',
    post: '/group',
    put: '/group/',
    delete: '/group/',
    getGroupList: '/group/GroupList',
    SelectedById: '/group/SelectedById/',
  },
  team: {
    get: '/team',
    post: '/team',
    put: '/team/',
    delete: '/team/',
    selected: '/phase/selected',
  },
  groupTeam: {
    get: '/groupTeam',
    post: '/groupTeam',
    put: '/groupTeam/',
    delete: '/groupTeam/',
    getGroupTeamList: '/groupTeam/GroupTeamList',
    SelectedById: '/groupTeam/SelectedById/',
  },
  game: {
    get: '/game',
    post: '/game',
    put: '/game/',
    delete: '/game/',
    getGameList: '/game/GameList',
    uploadFile: '/game/UploadFile',
  },
  quiniela: {
    get: '/quiniela',
    post: '/quiniela',
    put: '/quiniela/',
    delete: '/quiniela/',
    getList: '/quiniela/QuinielaList',
  },
  quinielaPunter: {
    get: '/quinielapunter',
    post: '/quinielapunter',
    put: '/quinielapunter/',
    delete: '/quinielapunter/',
    getQuinielaPunterList: '/quinielapunter/QuinielaPunterList/',
  },
};
