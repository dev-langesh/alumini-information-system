type navObjType = {
  key: number;
  title: string;
  href: string;
}[];

export const navWithAuthObj: navObjType = [
  {
    key: 0,
    title: "Profile",
    href: "/profile",
  },
  {
    key: 1,
    title: "Notifications",
    href: "/notifications",
  },
];
export const navWithoutAuthObj: navObjType = [
  {
    key: 0,
    title: "Register",
    href: "/register",
  },
  {
    key: 1,
    title: "Login",
    href: "/login",
  },
];
