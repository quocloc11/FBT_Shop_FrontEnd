const ToggleSwitch = ({ label, isOn, onToggle }) => {
	return (
		<div className="flex items-center justify-between py-3">
			<span className="text-gray-300">{label}</span>
			<button
				className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${isOn ? "bg-indigo-600" : "bg-gray-600"
					}`}
				onClick={onToggle}
			>
				<span
					className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${isOn ? "translate-x-5" : "translate-x-1"
						}`}
				/>
			</button>
		</div>
	);
};

export default ToggleSwitch;
