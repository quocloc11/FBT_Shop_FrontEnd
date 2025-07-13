import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUserAPI, editUserAPI } from "../../redux/user/userSlice";

const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedUser, setSelectedUser] = useState(null);
	const [editForm, setEditForm] = useState({
		username: '',
		email: '',
		role: '',
		isActive: true
	});
	const dispatch = useDispatch();


	const users = useSelector((state) => state.user.users);
	const isLoading = useSelector((state) => state.user.isLoading);

	useEffect(() => {
		dispatch(fetchAllUsers());
	}, [dispatch]);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value.toLowerCase());
	};

	const filteredUsers = users.filter((user) =>
		user.username.toLowerCase().includes(searchTerm) ||
		user.email.toLowerCase().includes(searchTerm)
	);

	// Handle Edit Action
	const handleEdit = (user) => {
		console.log('selectedUser', selectedUser)
		setSelectedUser(user);
		setEditForm({
			username: user.username,
			email: user.email,
			role: user.role,
			isActive: user.isActive
		});
	};

	const handleSaveEdit = async () => {
		if (selectedUser && selectedUser._id) {
			try {
				await dispatch(editUserAPI({ userId: selectedUser._id, data: editForm })).unwrap();
				dispatch(fetchAllUsers());
				setSelectedUser(null);
			} catch (error) {
				console.error("Failed to update user:", error);
			}
		} else {
			console.error("User ID is undefined. Cannot update user.");
		}
	};



	// Handle Delete Action
	const handleDelete = (userId) => {
		dispatch(deleteUserAPI(userId));
	};

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold text-gray-100">Users</h2>
				<div className="relative">
					<input
						type="text"
						placeholder="Search users..."
						className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-700">
					<thead>
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-700">
						{isLoading ? (
							<tr>
								<td colSpan="5" className="text-center py-4 text-gray-400">
									Loading...
								</td>
							</tr>
						) : (
							filteredUsers.map((user) => (

								<motion.tr
									key={user._id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div className="flex-shrink-0 h-10 w-10">
												<div className="h-10 w-10 rounded-full overflow-hidden">
													<img
														src={user.avatar || "/default-avatar.png"}
														alt={user.username}
														className="h-full w-full object-cover"
													/>
												</div>

											</div>
											<div className="ml-4">
												<div className="text-sm font-medium text-gray-100">{user.username}</div>
											</div>
										</div>
									</td>

									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-300">{user.email}</div>
									</td>

									<td className="px-6 py-4 whitespace-nowrap">
										<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
											{user.role}
										</span>
									</td>

									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive
												? "bg-green-800 text-green-100"
												: "bg-red-800 text-red-100"
												}`}
										>
											{user.isActive ? "Active" : "Inactive"}
										</span>
									</td>

									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
										<button
											className="text-indigo-400 hover:text-indigo-300 mr-2"
											onClick={() => handleEdit(user)}
										>
											Edit
										</button>
										<button
											className="text-red-400 hover:text-red-300"
											onClick={() => handleDelete(user._id)}
										>
											Delete
										</button>
									</td>
								</motion.tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Edit Form */}
			{selectedUser && (
				<div className="mt-6 p-4 bg-gray-700 rounded-lg">
					<h3 className="text-xl font-semibold text-gray-100 mb-4">Edit User</h3>
					<div className="mb-4">
						<label htmlFor="username" className="text-sm text-gray-400">Name</label>
						<input
							id="username"
							type="text"
							value={editForm.username}
							onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
							className="w-full bg-gray-600 text-white rounded-md p-2 mt-2"
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="email" className="text-sm text-gray-400">Email</label>
						<input
							id="email"
							type="email"
							value={editForm.email}
							onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
							className="w-full bg-gray-600 text-white rounded-md p-2 mt-2"
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="role" className="text-sm text-gray-400">Role</label>
						<input
							id="role"
							type="text"
							value={editForm.role}
							onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
							className="w-full bg-gray-600 text-white rounded-md p-2 mt-2"
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="status" className="text-sm text-gray-400">Status</label>
						<select
							id="status"
							value={editForm.isActive ? "Active" : "Inactive"}
							onChange={(e) => setEditForm({ ...editForm, isActive: e.target.value === "Active" })}
							className="w-full bg-gray-600 text-white rounded-md p-2 mt-2"
						>
							<option value="Active">Active</option>
							<option value="Inactive">Inactive</option>
						</select>
					</div>

					<div className="flex justify-end">
						<button
							className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
							onClick={handleSaveEdit}
						>
							Save
						</button>
						<button
							className="bg-gray-600 text-white px-4 py-2 rounded-lg"
							onClick={() => setSelectedUser(null)}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default UsersTable;
