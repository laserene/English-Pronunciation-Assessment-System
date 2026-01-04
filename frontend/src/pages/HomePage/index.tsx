import { JSX, useState } from "react";
import Header from "./header.tsx";
import Banner from "./banner.tsx";
import ScenariosPanel from "./ScenariosPanel.tsx";
import RolePlayPanel from "./RolePlayPanel.tsx"
import Overlay from "../Conversation/Components/Overlay.tsx";
import "./index.css";

export default function HomePage(): JSX.Element {
	const [createScenarioPanel, setCreateScenarioPanel] = useState(false);
	const [createRolePlayPanel, setCreateRolePlayPanel] = useState(false);

	const closeCreateScenarioPanel = () => {
		setCreateScenarioPanel(false)
	}

	const closeCreateRolePlayPanel = () => {
		setCreateRolePlayPanel(false)
	}

	return (
		<div id="homepage">
			<Header />
			<Banner />
			{/* <OpenConversationPanel /> */}
			<ScenariosPanel createScenario={setCreateRolePlayPanel} />
			<RolePlayPanel createRolePlay={setCreateRolePlayPanel} />
			<Overlay isOpen={createScenarioPanel} onClose={() => { closeCreateScenarioPanel() }}>
				<h2>Create Scenario</h2>
			</Overlay>
			<Overlay isOpen={createRolePlayPanel} onClose={() => { closeCreateRolePlayPanel() }}>
				<h2>Create RolePlay</h2>
			</Overlay>
		</div >
	);
}
