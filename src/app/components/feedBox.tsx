interface FeedBoxProps {
  userName: string;
  timeAgo: string;
  content: string;
}

export default function FeedBox({
  userName,
  timeAgo,
  content
}: FeedBoxProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <div>
          <h3 className="font-medium">{userName}</h3>
          <p className="text-sm text-gray-500">{timeAgo}</p>
        </div>
      </div>
      <p className="text-gray-800 mb-4">
        {content}
      </p>
    </div>
  );
}
