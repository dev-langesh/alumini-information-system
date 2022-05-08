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
    title: "Chat",
    href: "/chat",
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
  {
    key: 2,
    title: "Chat",
    href: "/chat",
  },
];
