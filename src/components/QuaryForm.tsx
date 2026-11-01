import { useState, type ChangeEvent, type SubmitEvent } from "react";

interface QuaryDetails {
  name: string;
  email: string;
  content: string;
}

interface QuaryFormProps {
  onSubmit(quary: QuaryDetails): void;
}

function UserForm(props: QuaryFormProps) {
  const { onSubmit } = props;
  const [Quary, setQuary] = useState<QuaryDetails>({
    name: "",
    email: "",
    content: "",
  });

  // Handle form submission
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(Quary);
    setQuary({ name: "", email: "", content: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full max-w-3xl mt-20 bg- bg-slate-400 p-5 border-black border rounded-2xl px-10"
    >
      <h2 className="text-4xl font-bold  mb-5">Tell us your quary</h2>
      <div className="flex justify-between w-full gap-5">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={Quary.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuary((prev) => ({ ...prev, name: e.target.value }))
          }
          className="outline-none mb-4 border-black border p-2 bg-white rounded w-2/4"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={Quary.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuary((prev) => ({ ...prev, email: e.target.value }))
          }
          className="outline-none mb-4 border-black border p-2 bg-white rounded w-2/4"
          required
        />
      </div>

      <div className="w-full flex-1">
        <textarea
          name="content"
          placeholder="Enter your query   "
          value={Quary.content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setQuary((prev) => ({ ...prev, content: e.target.value }))
          }
          className="outline-none mb-4 border-black border p-2 bg-white rounded w-full"
          required
          minLength={1}
          rows={5}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-2/5"
      >
        Submit
      </button>
    </form>
  );
}

export default UserForm;

//working mechanism of QuaryForm component:
// 1. The component maintains a local state 'Quary' to store the form input values.
// 2. The 'handleSubmit' function is called when the form is submitted.
// 3. 'handleSubmit' prevents the default form submission behavior and calls the 'onSubmit' prop with the current 'Quary' state.
// 4. The input fields and textarea are controlled components, updating the 'Quary' state on change.
// 5. The parent component can handle the submitted query through the 'onSubmit' prop.
