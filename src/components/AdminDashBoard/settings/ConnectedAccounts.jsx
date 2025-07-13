import { useState } from "react";
import SettingSection from "./SettingSection";
import { HelpCircle, Plus } from "lucide-react";

const ConnectedAccounts = () => {
	const [connectedAccounts, setConnectedAccounts] = useState([
		{
			id: 1,
			name: "Google",
			connected: true,
			icon: "/google.png",
		},
		{
			id: 2,
			name: "Facebook",
			connected: false,
			icon: "/facebook.svg",
		},
		{
			id: 3,
			name: "Twitter",
			connected: true,
			icon: "/x.png",
		},
	]);

	const handleToggleConnection = (accountId) => {
		setConnectedAccounts(
			connectedAccounts.map((acc) =>
				acc.id === accountId
					? { ...acc, connected: !acc.connected }
					: acc
			)
		);
	};

	return (
		<SettingSection icon={HelpCircle} title={"Connected Accounts"}>
			{connectedAccounts.map((account) => (
				<div key={account.id} className="flex items-center justify-between py-3">
					<div className="flex gap-2 items-center">
						<img
							src={account.icon}
							alt={`${account.name} logo`}
							className="w-8 h-8 object-cover rounded-full mr-2"
						/>
						<span className="text-gray-300">{account.name}</span>
					</div>
					<button
						className={`px-4 py-2 rounded ${account.connected
							? "bg-green-600 hover:bg-green-700"
							: "bg-gray-600 hover:bg-gray-700"
							} transition duration-200`}
						onClick={() => handleToggleConnection(account.id)}
					>
						{account.connected ? "Connected" : "Connect"}
					</button>
				</div>
			))}
			<button className="mt-4 flex items-center text-indigo-400 hover:text-indigo-300 transition duration-200">
				<Plus size={18} className="mr-2" />
				Add Account
			</button>
		</SettingSection>
	);
};

export default ConnectedAccounts;
