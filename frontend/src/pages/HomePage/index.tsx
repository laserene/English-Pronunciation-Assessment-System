import { JSX, useEffect, useState } from "react";
import Header from "./header.tsx";
import Banner from "./banner.tsx";
import ScenariosPanel from "./ScenariosPanel.tsx";
import DashboardPanel from "./DashboardPanel.tsx";
import Overlay from "../Conversation/Components/Overlay.tsx";
import CreateScenarioForm from "../HomePage/CreateScenarioForm.tsx"
import axiosInstance from "../../utils/axios.ts";
import "./index.css";

export default function HomePage(): JSX.Element {
	const [createScenarioPanel, setCreateScenarioPanel] = useState(false);
	const [user, setUser] = useState(null);
	const closeCreateScenarioPanel = () => {
		setCreateScenarioPanel(false)
	}
	useEffect(() => {
		const getCurrentUser = async () => {
			try {
				const response = await axiosInstance.get("/me/");
				setUser(response.data);
				console.log("User info:", response.data);
			} catch (error) {
				console.error("Error fetching user info:", error);
			}
		};
		getCurrentUser();
	}, [])
	return (
		<div id="homepage">
			<Header user={user} />
			<Banner />
			<ScenariosPanel createScenario={setCreateScenarioPanel} />
			<DashboardPanel />
			<Overlay isOpen={createScenarioPanel} onClose={() => { closeCreateScenarioPanel() }}>
				<CreateScenarioForm />
			</Overlay>
		</div >
	);
}
