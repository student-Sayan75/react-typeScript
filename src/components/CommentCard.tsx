const CommentCard = ({ title, body }: { title: string; body: string }) => {
  return (
    <div>
      <div className="bg-gray-800 p-4 rounded-lg ">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-white">{body}</p>
      </div>
    </div>
  );
};

export default CommentCard;
