import { Link } from "react-router-dom";

const EventCard = ({ _id, name, date, description, picture }) => {
  console.log(_id, name, date, description, picture);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 w-80 h-[400px] flex flex-col">
      <img src={picture} alt={name} className="w-full h-48 object-cover" />
      
      <div className="p-4 flex-grow flex flex-col">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-gray-500 text-sm mt-1">Date: {new Date(date).toLocaleDateString()}</p>

        {/* Scrollable Description with Hidden Scrollbar */}
        <div className="text-gray-700 mt-2 overflow-y-auto max-h-24 pr-2 no-scrollbar">
          {description}
        </div>

        {/* Register Button - Always at Bottom */}
        <div className="mt-auto pt-4">
          <Link to={`/register/${_id}`} className="inline-block">
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:from-indigo-500 hover:via-purple-600 hover:to-pink-500">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
