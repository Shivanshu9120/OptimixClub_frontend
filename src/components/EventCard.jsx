import { Link } from "react-router-dom";

const EventCard = ({ _id, name, date, description, picture, onRegisterClick, isRegistered }) => {
  console.log(_id, name, date, description, picture);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 w-80 h-[400px] flex flex-col">
      <img src={picture} alt={name} className="w-full h-48 object-cover" />
      
      <div className="p-4 flex-grow flex flex-col">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{name}</h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mt-1">📅 {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>

        {/* Scrollable Description with Hidden Scrollbar */}
        <div className="text-slate-600 dark:text-slate-300 mt-2 overflow-y-auto max-h-24 pr-2 text-sm leading-relaxed no-scrollbar flex-grow">
          {description}
        </div>

        {/* Register Button - Always at Bottom */}
        <div className="mt-auto pt-4">
          {isRegistered ? (
            <button
              disabled
              className="w-full px-6 py-2 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm font-bold rounded-lg cursor-not-allowed border border-slate-300 dark:border-slate-700"
            >
              ✓ Registered
            </button>
          ) : (
            <button
              onClick={onRegisterClick}
              className="w-full px-6 py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white text-sm font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.03] hover:shadow-md"
            >
              Register Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;

