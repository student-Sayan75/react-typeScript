# 🛍️ React + TypeScript Learning Project — Product & Buyers App

> A hands-on project built **while learning TypeScript with React**. Every component, hook, and type in this repo exists because it taught me something. This README documents the journey: what I built, which TypeScript concepts I implemented, and how it all came together into this project.

---

## 📖 About This Project

This is a small single-page application built with **React 19 + TypeScript + Vite**, styled with **Tailwind CSS v4**. It started as a blank Vite template and grew, component by component, into a mini "product page" app as I progressed through learning TypeScript in a React context.

The app renders:

- 🍎 A **product card** (`MyCard`) — typed props with an interface
- 🔢 An **order quantity counter** (`Counter`) — typed `useState`
- 👥 A **buyers grid** (`BuyersCard`) — typed arrays + inline prop typing + list rendering
- 📝 A **query form** (`QuaryForm`) — typed form state, typed events, callback props
- 🙏 An **ending/thank-you card** (`EndingCard`) — `PropsWithChildren`, `ReactNode`, optional props
- 💬 A **buyers comments section** (`CommentCard` + `useFetch`) — generics, custom hooks, typed API data, union types

None of it is random — each piece was deliberately written to practice a specific TypeScript concept in React.

---

## 🎯 Why This Project Exists

While learning TypeScript with React, I didn't want to just read theory — I wanted to **feel the types working** in real code. So I built this project as a sandbox where every new concept I learned got implemented immediately:

| Concept I was learning             | Where I implemented it                                      |
| ---------------------------------- | ----------------------------------------------------------- |
| Interfaces & custom types          | [src/types.ts](src/types.ts), prop interfaces in components |
| Typing component props             | `MyCard`, `BuyersCard`, `CommentCard`                       |
| Typing `useState`                  | `Counter`, `QuaryForm`, `useFetch`                          |
| Typing events (form/change/submit) | `QuaryForm`                                                 |
| Children & optional props          | `EndingCard`                                                |
| Generics                           | `useFetch<T>` custom hook                                   |
| Union types & type narrowing       | `App.tsx` fetched-data handling                             |
| Callback / function props          | `QuaryForm`'s `onSubmit`                                    |
| Non-null assertion                 | `main.tsx` root element                                     |

The result is this project — a working app that is also a living notebook of TypeScript-for-React concepts.

---

## 🛠️ Tech Stack

- **React 19** — UI library
- **TypeScript ~6.0** — static typing
- **Vite 8** — dev server & build tool
- **Tailwind CSS 4** (via `@tailwindcss/vite`) — styling
- **ESLint + typescript-eslint** — linting
- **JSONPlaceholder** (`jsonplaceholder.typicode.com`) — fake REST API for the comments section

---

## 📁 Project Structure

```
react-typeScript/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── eslint.config.js
├── public/
└── src/
    ├── main.tsx               # App entry — non-null assertion on #root
    ├── App.tsx                # Composition of all components + useFetch usage
    ├── types.ts               # Shared interfaces (userType)
    ├── index.css              # Tailwind styles
    ├── components/
    │   ├── MyCard.tsx         # Product card — interface-based props
    │   ├── Counter.tsx        # Typed useState<number>
    │   ├── BuyersCard.tsx     # Inline-typed props, rendered in a mapped grid
    │   ├── QuaryForm.tsx      # Typed form state + typed events + callback prop
    │   ├── EndingCard.tsx     # PropsWithChildren + optional ReactNode prop
    │   └── CommentCard.tsx    # Presentational typed props for API data
    └── hooks/
        └── useFetch.ts        # Generic custom data-fetching hook
```

---

## 🧠 TypeScript Concepts Implemented

### 1. Interfaces & shared types — [src/types.ts](src/types.ts)

```ts
export interface userType {
  id: number;
  photo: string;
  name: string;
  email: string;
}
```

The `userType` interface is reused across `App.tsx` (to type the `users` array) and flows into `BuyersCard`. One source of truth for the shape of a buyer.

### 2. Typing component props with an interface — [MyCard.tsx](src/components/MyCard.tsx)

```ts
interface MyCardProps {
  title: string;
  content: string;
  price: string;
  link: string;
}

function MyCard({ title, content, price, link }: MyCardProps) { ... }
```

Passing the wrong type (or missing a prop) is now a **compile-time error**, not a runtime surprise.

### 3. Inline prop typing — [BuyersCard.tsx](src/components/BuyersCard.tsx) & [CommentCard.tsx](src/components/CommentCard.tsx)

```ts
function BuyersCard({ id, photo, name, email }: {
  id: number;
  name: string;
  photo: string;
  email: string;
}) { ... }
```

For small components, typing props inline keeps everything in one place.

### 4. Typed `useState` — [Counter.tsx](src/components/Counter.tsx)

```ts
const [count, setCount] = useState<number>(0);
setCount((c) => c + 1); // c is inferred as number
```

Explicit generic on `useState` + functional updates — TypeScript infers `c` correctly.

### 5. Typed form state, events & callback props — [QuaryForm.tsx](src/components/QuaryForm.tsx)

```ts
interface QuaryDetails {
  name: string;
  email: string;
  content: string;
}

interface QuaryFormProps {
  onSubmit(quary: QuaryDetails): void;   // function-type prop
}

const [Quary, setQuary] = useState<QuaryDetails>({ name: "", email: "", content: "" });

const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => { ... };

onChange={(e: ChangeEvent<HTMLInputElement>) =>
  setQuary((prev) => ({ ...prev, name: e.target.value }))
}
```

Concepts packed into one component:

- `useState` typed with a custom interface (controlled form)
- `ChangeEvent<HTMLInputElement>` / `ChangeEvent<HTMLTextAreaElement>` — precisely typed events per element
- `SubmitEvent<HTMLFormElement>` for the submit handler
- A **callback prop** with a defined signature — the parent in [App.tsx](src/App.tsx) does `onSubmit={(quary) => console.log(quary)}` and `quary` is fully typed
- Immutable state updates with the spread operator inside a functional `setState`

### 6. Children, optional props & `ReactNode` — [EndingCard.tsx](src/components/EndingCard.tsx)

```ts
import type { PropsWithChildren, ReactNode } from "react";

interface EndingCardProps extends PropsWithChildren {
  title: string;
  footer?: ReactNode; // optional prop
}
```

- `PropsWithChildren` gives a typed `children` prop for free
- `footer?: ReactNode` shows optional props + the correct type for "any renderable React content"
- Conditional rendering with `{footer && <div>...</div>}`

### 7. Generics in a custom hook — [useFetch.ts](src/hooks/useFetch.ts)

```ts
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export default function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  // ...fetch logic...
  return state;
}
```

The crown jewel of the project: a **generic** fetch hook. `T` is decided by the caller, so the same hook works for any API response shape. Also demonstrates union types (`T | null`, `string | null`) and error handling with a typed error message.

### 8. Union types, generics in action & narrowing — [App.tsx](src/App.tsx)

```ts
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

let fetchedData:
  | { data: Post[] | null; loading: boolean; error: string | null }
  | undefined;

fetchedData = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts");

{fetchedData && fetchedData.data ? (
  fetchedData.data.map((post) => <CommentCard key={post.id} ... />)
) : (
  <p>Loading...</p>
)}
```

- `useFetch<Post[]>` — the generic instantiated with an array of `Post`
- An explicit **union type** (`| undefined`) on the variable
- **Type narrowing** via the ternary/`&&` guard before mapping over data
- Rendering typed lists with `key={post.id}`

### 9. Non-null assertion at the entry point — [main.tsx](src/main.tsx)

```ts
createRoot(document.getElementById("root")!).render(<App />);
```

The `!` tells TypeScript "trust me, `#root` exists in `index.html`".

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation & Run

```bash
# install dependencies
npm install

# start the dev server (HMR)
npm run dev

# type-check + production build
npm run build

# preview the production build
npm run preview

# lint the codebase
npm run lint
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

---

## 🔄 How the App Flows

```mermaid
flowchart TD
    A[main.tsx] --> B[App.tsx]
    B --> C[MyCard — product]
    B --> D[Counter — order quantity]
    B --> E[BuyersCard grid — users array]
    B --> F[QuaryForm — onSubmit callback]
    B --> G[EndingCard — children + footer]
    B --> H[useFetch&#60;Post[]&#62; hook]
    H --> I[JSONPlaceholder API]
    I --> H
    H --> J[CommentCard list]
```

---

## 💡 Key Takeaways From Building This

1. **Types are documentation that can't go stale** — every component's props describe exactly what it needs.
2. **Generics make hooks reusable** — `useFetch<T>` works for any endpoint shape without `any`.
3. **Event typing matters** — `ChangeEvent<HTMLInputElement>` vs `ChangeEvent<HTMLTextAreaElement>` keeps `e.target.value` safe.
4. **Union types + narrowing** model real async states (`data | null`, `error | null`, `undefined`) instead of pretending data is always there.
5. **Small, typed components compose** into a full page without a single runtime type error.

---

## 🔮 Future Improvements

- Handle the `loading` and `error` states of `useFetch` in the UI explicitly
- Add unit tests with Vitest + React Testing Library
- Extract the `Post` interface into [src/types.ts](src/types.ts) alongside `userType`
- Add routing and more pages as learning continues

---

## 📝 License

This is a personal learning project — free to explore, fork, and learn from.
