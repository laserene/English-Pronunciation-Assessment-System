import { JSX, useState } from "react";
import Header from "./header.tsx";
import Banner from "./banner.tsx";
import ScenariosPanel from "./ScenariosPanel.tsx";
// import RolePlayPanel from "./RolePlayPanel.tsx"
import DashboardPanel from "./DashboardPanel.tsx";
import Overlay from "../Conversation/Components/Overlay.tsx";
import CreateScenarioForm from "../HomePage/CreateScenarioForm.tsx"
// import CreateRolePlayForm from "../HomePage/CreateRolePlayForm.tsx"
import "./index.css";

export default function HomePage(): JSX.Element {
	const [createScenarioPanel, setCreateScenarioPanel] = useState(false);
	// const [createRolePlayPanel, setCreateRolePlayPanel] = useState(false);

	const closeCreateScenarioPanel = () => {
		setCreateScenarioPanel(false)
	}

	// const closeCreateRolePlayPanel = () => {
	// 	setCreateRolePlayPanel(false)
	// }

	return (
		<div id="homepage">
			<Header />
			<Banner />
			{/* <OpenConversationPanel /> */}
			<ScenariosPanel createScenario={setCreateScenarioPanel} />
			{/* <RolePlayPanel createRolePlay={setCreateRolePlayPanel} /> */}
			<DashboardPanel />
			<Overlay isOpen={createScenarioPanel} onClose={() => { closeCreateScenarioPanel() }}>
				<CreateScenarioForm />
			</Overlay>
			{/* <Overlay isOpen={createRolePlayPanel} onClose={() => { closeCreateRolePlayPanel() }}>
				<CreateRolePlayForm />
			</Overlay> */}
		</div >
	);
}
