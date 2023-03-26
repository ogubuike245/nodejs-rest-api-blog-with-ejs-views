const navLinks = [
  {
    id: "1",
    title: "All Blogs",
    path: "/posts",
  },
].map((link) => ({
  ...link,
  path: `/api/v1/blog${link.path}`,
}));

const isAuthenticated = [
  {
    id: "1",
    title: "Profile",
    path: "/profile",
  },

  {
    id: "2",
    title: "Create Blog",
    path: "/create",
  },
  {
    id: "3",
    title: "Logout",
    path: "/logout",
  },
].map((link) => ({
  ...link,
  path: `/api/v1/user${link.path}`,
}));
const notAuthenticated = [
  {
    id: "1",
    title: "Signup",
    path: "/signup",
  },
  {
    id: "2",
    title: "Login",
    path: "/login",
  },
].map((link) => ({
  ...link,
  path: `/api/v1/auth${link.path}`,
}));

module.exports = { navLinks, isAuthenticated, notAuthenticated };
