import { atom } from "recoil";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const isAuthenticatedPersistEffect = () => {
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem("token");
    if (savedValue != null) {
      setSelf(true);
    } else {
      setSelf(false);
    }

    onSet((newValue, _, isReset) => {
      //
    });
  };
};

// atoms
const themeAtom = atom({
  key: "theme",
  default: false,
  effects: [localStorageEffect("theme")],
});

const tokenAtom = atom({
  key: "token",
  default: "",
  effects: [localStorageEffect("token")],
});

const userAtom = atom({
  key: "user",
  default: null,
  effects: [localStorageEffect("user")],
});

const isAuthenticatedAtom = atom({
  key: "isAuthenticated",
  default: false,
  effects: [localStorageEffect("isAuthenticated")],
});

export { themeAtom, tokenAtom, userAtom, isAuthenticatedAtom };
