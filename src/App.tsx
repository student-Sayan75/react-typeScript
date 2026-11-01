import Counter from "./components/Counter.tsx";
import MyCard from "./components/MyCard.tsx";
import BuyersCard from "./components/BuyersCard.tsx";
import type { userType } from "./types.ts";
import QuaryForm from "./components/QuaryForm.tsx";
import EndingCard from "./components/EndingCard.tsx";
import useFetch from "./hooks/useFetch.ts";
import CommentCard from "./components/CommentCard.tsx";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const users: userType[] = [
    {
      id: 1,
      photo: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
    },
    {
      id: 2,
      photo: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Priya Das",
      email: "priya.das@example.com",
    },
    {
      id: 3,
      photo: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Arjun Patel",
      email: "arjun.patel@example.com",
    },
    {
      id: 4,
      photo: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Sneha Roy",
      email: "sneha.roy@example.com",
    },
    {
      id: 5,
      photo: "https://randomuser.me/api/portraits/men/5.jpg",
      name: "Amit Verma",
      email: "amit.verma@example.com",
    },
    {
      id: 6,
      photo: "https://randomuser.me/api/portraits/women/6.jpg",
      name: "Ananya Sen",
      email: "ananya.sen@example.com",
    },
    {
      id: 7,
      photo: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "Karan Singh",
      email: "karan.singh@example.com",
    },
    {
      id: 8,
      photo: "https://randomuser.me/api/portraits/women/8.jpg",
      name: "Riya Mukherjee",
      email: "riya.mukherjee@example.com",
    },
    {
      id: 9,
      photo: "https://randomuser.me/api/portraits/men/9.jpg",
      name: "Vikram Gupta",
      email: "vikram.gupta@example.com",
    },
    {
      id: 10,
      photo: "https://randomuser.me/api/portraits/women/10.jpg",
      name: "Pooja Banerjee",
      email: "pooja.banerjee@example.com",
    },
  ];
  let fetchedData:
    | { data: Post[] | null; loading: boolean; error: string | null }
    | undefined;

  fetchedData = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 my-20">
      <h2 className="text-4xl font-bold text-white mb-5">Product</h2>
      <MyCard
        title="Apple 17 pro max"
        content="mobile phone"
        price="80,000"
        link="https://static.digit.in/iPhone-17-Series-1.jpg"
      />

      <Counter />

      <div className="grid grid-cols-4 gap-4 mt-10">
        <h1 className="col-span-4 text-center text-4xl font-bold text-white mb-10">
          Buyers
        </h1>
        {users.map((user) => (
          <BuyersCard
            key={user.id}
            id={user.id}
            photo={user.photo}
            name={user.name}
            email={user.email}
          />
        ))}
      </div>

      <QuaryForm onSubmit={(quary) => console.log(quary)} />

      <EndingCard
        title="Thank You"
        footer={<p className="text-white">We appreciate your business!</p>}
      >
        <p className="text-white">We hope you enjoy your purchase.</p>
      </EndingCard>

      <div className="mt-10">
        <h2 className="text-4xl font-bold text-white mb-5 text-center mb-10">
          Buyers Commnents
        </h2>
        {fetchedData && fetchedData.data ? (
          <div className="grid grid-cols-1 gap-4 w-full max-w-5xl">
            {fetchedData.data.map((post) => (
              <CommentCard key={post.id} title={post.title} body={post.body} />
            ))}
          </div>
        ) : (
          <p className="text-white">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;

//writing a brief details of evarything what happend to this
// This App component renders a product card, a counter, a list of buyers, a query form, an ending card, and fetched comments.
// It uses the useFetch hook to fetch posts from an API and displays them as comment cards.
// The users array contains sample buyer data which is displayed using the BuyersCard component.
// The MyCard component displays product information.
// The Counter component is a simple counter.
// The QuaryForm component handles user queries.
// The EndingCard component displays a thank you message with an optional footer.
// The CommentCard component displays individual comments fetched from the API.
