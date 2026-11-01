import { useState } from "react";
function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg font-medium mb-2 text-white">
        Order quantity: {count}
      </p>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setCount((c) => c + 1)}
        >
          Increment
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => setCount((c) => c - 1)}
        >
          Decrement
        </button>
      </div>
      <div className="mt-4">
        <button className="px-4 py-2 w-32 bg-green-500 text-white rounded">
          Order Now
        </button>
      </div>
    </div>
  );
}

export default Counter;
