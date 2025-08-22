````markdown
# Expo + Expo Router + NativeWind + Google Fonts (Geist & Bricolage) — Starter Guide

This README documents the **exact setup** we’re using: Expo (with Expo Router), **NativeWind** (Tailwind for React Native), and **Google Fonts** (Geist + Bricolage Grotesque).  
This template intentionally ships **no UI component system** — just **structure and styling**.

---

## 0) Prereqs & Scripts

Use whatever you like: **npm**, **yarn**, or **bun**. Examples below show all three.

```bash
# install deps
npm i         # or: yarn        # or: bun install

# run dev
npx expo start
```
````

You can open the app in **Expo Go**, **Android emulator**, **iOS simulator**, or a **dev build**.

---

## 1) Project Structure (Next.js-like routing)

We use **file-based routing** with **Expo Router**.

```
app/
  _layout.tsx            # Root Stack wrapper (header, auth gating, global providers)
  (tabs)/                # Bottom tabs group (only top-level pages show as tabs)
    _layout.tsx          # <Tabs /> config (icons, blur background, etc.)
    index.tsx            # Home tab
    explore.tsx          # Explore tab
    profile/             # Profile section under the Profile tab
      index.tsx          # Profile main screen (shows in the tab)
      [id].tsx           # Dynamic details (does NOT show in the tab)
  auth/
    index.tsx            # Auth entry (outside of tabs)
```

**How navigation works (like Next.js):**

- `/profile` → `app/(tabs)/profile/index.tsx`
- `/profile/123` → `app/(tabs)/profile/[id].tsx` (pushes on top of tab via Stack; not in tab bar)

**Root Stack layout (example):**

```tsx
// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="auth" />
    </Stack>
  );
}
```

**Tabs layout (example):**

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "transparent",
            borderTopWidth: 0, // show blur background on iOS
          },
          default: {},
        }),
        tabBarBackground: () => null, // replace with your BlurView component if desired
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      {/* If you need a screen under (tabs) but NOT visible in the tab bar: */}
      {/* <Tabs.Screen name="hidden" options={{ tabBarButton: () => null }} /> */}
    </Tabs>
  );
}
```

> 💡 To push a details page that doesn’t appear in the tab bar, put it in a subfolder (e.g. `profile/[id].tsx`) and navigate with `router.push("/profile/123")`.

---

## 2) NativeWind (Tailwind for React Native)

We follow the NativeWind docs for setup.
**Docs:** [https://www.nativewind.dev/](https://www.nativewind.dev/)

### Install

```bash
npm i nativewind tailwindcss      # or: yarn add ...
npx tailwindcss init              # creates tailwind.config.js
```

### Tailwind config

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Font families are added in Section 3 (Fonts)
    },
  },
  plugins: [],
};
```

### Babel config

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"],
  };
};
```

### Type support (optional, TS projects)

```ts
// nativewind-env.d.ts
/// <reference types="nativewind/types" />
```

> ♻️ Whenever you change `tailwind.config.js`, **restart** Metro (`r`) to pick up new classes.

---

## 3) Google Fonts (Geist & Bricolage) via @expo-google-fonts

We load fonts using `expo-font` and `@expo-google-fonts/*` packages.
This works on **iOS, Android, and Web** with a single setup.

### Install

```bash
# pick the families you need:
npm i expo-font @expo-google-fonts/geist @expo-google-fonts/bricolage-grotesque
# or: yarn add ...
# or: bun add ...
```

### Load fonts in the root (once)

Load your chosen variants in `app/_layout.tsx` (or your root component).

```tsx
// app/_layout.tsx
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

// Geist
import {
  Geist_400Regular,
  Geist_600SemiBold,
  Geist_700Bold,
} from "@expo-google-fonts/geist";

// Bricolage Grotesque
import {
  BricolageGrotesque_400Regular,
  BricolageGrotesque_700Bold,
  BricolageGrotesque_800ExtraBold,
} from "@expo-google-fonts/bricolage-grotesque";

export default function RootLayout() {
  const [loaded] = useFonts({
    // Geist
    Geist_400Regular,
    Geist_600SemiBold,
    Geist_700Bold,
    // Bricolage
    BricolageGrotesque_400Regular,
    BricolageGrotesque_700Bold,
    BricolageGrotesque_800ExtraBold,
  });

  if (!loaded) return null; // or a splash screen

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="auth" />
    </Stack>
  );
}
```

### Map variants to Tailwind font classes

Use the **exact font keys** you loaded above as values in `tailwind.config.js`.
This lets you do `className="font-..."` anywhere.

```js
// tailwind.config.js (add this under theme.extend)
theme: {
  extend: {
    fontFamily: {
      // Geist
      geist: ["Geist_400Regular"],
      "geist-semibold": ["Geist_600SemiBold"],
      "geist-bold": ["Geist_700Bold"],
      // Bricolage Grotesque
      bricolage: ["BricolageGrotesque_400Regular"],
      "bricolage-bold": ["BricolageGrotesque_700Bold"],
      "bricolage-extrabold": ["BricolageGrotesque_800ExtraBold"],
    },
  },
},
```

### Use in components

```tsx
import { Text, View } from "react-native";

export default function Example() {
  return (
    <View className="gap-2 p-6">
      <Text className="font-geist text-xl">Geist Regular</Text>
      <Text className="font-geist-semibold text-xl">Geist SemiBold</Text>
      <Text className="font-bricolage text-xl">Bricolage Regular</Text>
      <Text className="font-bricolage-extrabold text-xl">
        Bricolage ExtraBold
      </Text>
    </View>
  );
}
```

> ✅ On **web**, you can still use NativeWind the same way.
> ✅ On **native**, ensure you **loaded the font** before rendering — otherwise RN will fall back to the system font.

---

## 4) Common Patterns & Gotchas

### A) ScrollView layout classes

`ScrollView` ignores `justify-*`/`items-*` on itself. Use `contentContainerStyle`:

```tsx
<ScrollView
  className="bg-gray-50 p-6"
  contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
>
  {/* content */}
</ScrollView>
```

### B) Remote images

Always provide **width** and **height** (or Tailwind sizes) to render on native:

```tsx
<Image
  className="w-24 h-24 rounded-full"
  source={{ uri: "https://images.unsplash.com/photo-..." }}
/>
```

### C) Blur tab bar on iOS (transparent background)

Make your tab bar transparent and provide a blur background (via a component with `expo-blur`):

```tsx
// app/(tabs)/_layout.tsx (snippet)
tabBarStyle: Platform.select({
  ios: { position: "absolute", backgroundColor: "transparent", borderTopWidth: 0 },
  default: {},
}),
tabBarBackground: () => null, // replace with your BlurView impl if you want blur
```

_(If you add a `BlurView`, render it in `tabBarBackground` so it shows through.)_

### D) Restarting after config changes

- After editing `tailwind.config.js` or `babel.config.js`, **restart** the dev server.
- If fonts don’t show, clear cache: `npx expo start -c`.

---

## 5) “Hidden” pages under Tabs (details pages)

Mimic Next.js by nesting detail pages under a tab folder.
They won’t appear in the tab bar, but you can push them via `router.push`.

```
app/
  (tabs)/
    profile/
      index.tsx     # visible as the Profile tab
      [id].tsx      # NOT in the tab bar, push onto Stack: /profile/123
```

Navigate programmatically:

```tsx
import { useRouter } from "expo-router";
const router = useRouter();
router.push("/profile/123");
```

---

## 6) What this template **does not** include

- No component library (UI kit).
- No state management preselected.
- No form/validation library.
- Only **structure (Router + Tabs/Stack)** and **styling (NativeWind + Fonts)**.

This keeps the starter **lean**. Bring your own UI system if needed.

---

## 7) Useful Docs

- **Expo Router**: [https://docs.expo.dev/router/introduction/](https://docs.expo.dev/router/introduction/)
- **NativeWind**: [https://www.nativewind.dev/](https://www.nativewind.dev/)
- **Expo Fonts**: [https://docs.expo.dev/develop/user-interface/fonts/](https://docs.expo.dev/develop/user-interface/fonts/)
- **@expo-google-fonts**: [https://github.com/expo/google-fonts](https://github.com/expo/google-fonts)

---

## 8) Quick Troubleshooting

- **Font not applying on native**
  - Ensure `useFonts` finished (`if (!loaded) return null`).
  - Tailwind font family **must match** the loaded key (e.g. `"Geist_700Bold"`).
  - Restart Metro after `tailwind.config.js` edits.

- **Classes work on web but not native**
  - Confirm `nativewind/babel` plugin is in `babel.config.js`.
  - Make sure files are included in `content` globs.

- **ScrollView layout warnings**
  - Use `contentContainerStyle` for `justify-*`/`items-*`.

---

## 9) Copy-paste Tailwind config (with fonts)

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        geist: ["Geist_400Regular"],
        "geist-semibold": ["Geist_600SemiBold"],
        "geist-bold": ["Geist_700Bold"],
        bricolage: ["BricolageGrotesque_400Regular"],
        "bricolage-bold": ["BricolageGrotesque_700Bold"],
        "bricolage-extrabold": ["BricolageGrotesque_800ExtraBold"],
      },
    },
  },
  plugins: [],
};
```

---

Happy building! ✨

```
::contentReference[oaicite:0]{index=0}
```
