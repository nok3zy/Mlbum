const HOME = "/";
const JOIN = "/join";

const USER = "/:id";
const USER_DETAIL = "/:id/detail";

const GROUP = "/:group";
const GROUP_DETAIL = "/:group/detail";
// const SEARCH = "/:group/search";

const routes = {
  home: HOME,
  join: JOIN,
//   search: SEARCH,
  user: id => {
    if (id) {
      return `/${id}`;
    } else {
      return USER;
    }
  },
  userDetail: id => {
    if (id) {
      return `/${id}/detail`;
    } else {
      return USER_DETAIL;
    }
  },
  group: groupId => {
    if (groupId) {
      return `/${groupId}`;
    } else {
      return GROUP;
    }
  },
  groupDetail: groupId => {
    if (groupId) {
      return `/${groupId}/detail`;
    } else {
      return GROUP_DETAIL;
    }
  }

};
export default routes;